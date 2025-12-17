
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

const app = express();
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || "file:./dev.db"
        }
    }
});
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Image Upload Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- Auth Middleware ---
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Simple cookie-based auth
    const token = req.cookies.admin_token;
    // Ideally, use a proper session/JWT. For MVP with single password, this is minimal.
    // We'll set a simple random token on login and check existence, or just check a signed cookie.
    // Given requirements: "Simple secure cookie session (recommended) or JWT"

    if (token && token === process.env.ADMIN_SESSION_TOKEN) {
        next();
    } else {
        // Also allow if header Authorization is present (for easier testing if needed, but cookie is preferred)
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// --- API Routes ---

// Auth
app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
        // Store in memory or DB? For single user MVP, verify against env or generated token if we persist it.
        // Better: just verify password and set a simpler "authorized" cookie if specific token management isn't needed. 
        // But to be slightly more secure/stateless-ish without DB sessions:
        // We can use a shared secret in env to sign a JWT.

        // Simpler for this MVP:
        // Just Use a hardcoded session token for now or a simple expected value.
        // Let's use a simple strategy:
        // Check if password matches env. If so, set a cookie.

        // We need to persist the token to Verify it middleware?
        // Let's Just use a JWT approach for simplicity without session storage.
        // Assuming simple requirement. I'll mock a session token.
        process.env.ADMIN_SESSION_TOKEN = 'valid-session-' + Date.now();

        res.cookie('admin_token', process.env.ADMIN_SESSION_TOKEN, {
            httpOnly: true,
            secure: false, // Localhost
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

app.get('/api/auth/me', (req, res) => {
    if (req.cookies.admin_token && req.cookies.admin_token === process.env.ADMIN_SESSION_TOKEN) {
        res.json({ user: 'admin' });
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
});

// Cars
app.get('/api/cars', async (req, res) => {
    const { admin } = req.query;
    const where = admin === 'true'
        ? {} // Admin sees all
        : { status: 'active' }; // Public sees active

    try {
        const cars = await prisma.car.findMany({
            where,
            include: { images: { orderBy: { sortOrder: 'asc' } } },
            orderBy: { createdAt: 'desc' }
        });

        // Transform for frontend if needed, currently returning raw Prisma objects
        // Frontend expects specific shape, we might need to map it or update Frontend types.
        // For now, return DB shape.
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});

app.get('/api/cars/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const car = await prisma.car.findUnique({
            where: { id },
            include: { images: { orderBy: { sortOrder: 'asc' } } },
        });
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.json(car);
    } catch (error) {
        // Try finding by slug if ID fails? ID is UUID, slug isn't in DB yet.
        // We haven't implemented slug. We can assume ID usage.
        res.status(500).json({ error: 'Error fetching car' });
    }
});

// Admin Routes
app.post('/api/cars', requireAuth, async (req, res) => {
    try {
        const { id, createdAt, updatedAt, images, ...data } = req.body;

        const imageCreateData = images && Array.isArray(images)
            ? images.map((img: any) => ({
                pathOrUrl: img.pathOrUrl,
                isMain: img.isMain || false,
                sortOrder: img.sortOrder || 0
            }))
            : [];

        const car = await prisma.car.create({
            data: {
                ...data,
                images: {
                    create: imageCreateData
                }
            },
            include: { images: true }
        });
        res.json(car);
    } catch (error) {
        console.error("Create error:", error);
        res.status(500).json({ error: 'Failed to create car', details: error });
    }
});

app.put('/api/cars/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { id: _bodyId, createdAt, updatedAt, images, ...data } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            const updatedCar = await tx.car.update({
                where: { id },
                data: data
            });

            if (images && Array.isArray(images)) {
                await tx.image.deleteMany({
                    where: { carId: id }
                });

                if (images.length > 0) {
                    await tx.image.createMany({
                        data: images.map((img: any) => ({
                            carId: id,
                            pathOrUrl: img.pathOrUrl,
                            isMain: img.isMain || false,
                            sortOrder: img.sortOrder || 0
                        }))
                    });
                }
            }

            return tx.car.findUnique({
                where: { id },
                include: { images: { orderBy: { sortOrder: 'asc' } } }
            });
        });

        res.json(result);
    } catch (e) {
        console.error("Update error:", e);
        res.status(500).json({ error: "Update failed", details: e });
    }
});

app.delete('/api/cars/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.car.delete({ where: { id } });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Delete failed" });
    }
});

app.post('/api/upload/images', requireAuth, upload.array('images'), (req, res) => {
    const files = req.files as Express.Multer.File[];
    if (!files) return res.status(400).json({ error: 'No files uploaded' });

    const uploadPaths = files.map(f => `/uploads/${f.filename}`);
    res.json({ paths: uploadPaths });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
