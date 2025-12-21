
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import fs from 'fs';
import crypto from 'crypto';

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

// Serve static uploads with caching (1 year)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    maxAge: '1y',
    etag: true,
    immutable: true
}));

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

// --- Auth Helper ---
const getSecret = () => process.env.JWT_SECRET || 'default-secret-key-change-this';

const createToken = (payload: any) => {
    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto.createHmac('sha256', getSecret()).update(data).digest('hex');
    return `${data}.${signature}`;
};

const verifyToken = (token: string) => {
    try {
        const [data, signature] = token.split('.');
        if (!data || !signature) return null;

        const expectedSignature = crypto.createHmac('sha256', getSecret()).update(data).digest('hex');
        if (signature !== expectedSignature) return null;

        return JSON.parse(Buffer.from(data, 'base64').toString());
    } catch (e) {
        return null;
    }
};

// --- Auth Middleware ---
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.admin_token;
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = verifyToken(token);
    if (payload && payload.role === 'admin' && payload.exp > Date.now()) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// --- API Routes ---

app.post('/api/contact', async (req, res) => {
    const { name, contact, message, carTitle, carId, link, carPrice, source, carImage } = req.body;
    
    // Validate required fields
    if (!name || !contact) {
        return res.status(400).json({ error: 'Name and contact are required' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatIds = process.env.TELEGRAM_CHAT_ID?.split(',').map(id => id.trim()).filter(Boolean);

    if (!token || !chatIds || chatIds.length === 0) {
        console.error('Telegram credentials not set');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const isManagerRequest = source === 'Кнопка менеджера (модальное окно)';

    const title = isManagerRequest 
        ? '👨‍💼 *Вопрос Менеджеру!*' 
        : '📩 *Новая заявка с сайта!*';

    const text = `
${title}

👤 *Имя:* ${name}
📞 *Контакты:* ${contact}
${carTitle ? `🚗 *Автомобиль:* ${carTitle}` : ''}
${carPrice ? `💰 *Цена:* ${carPrice}` : ''}
${(link && isManagerRequest) ? `🔗 [Ссылка на страницу](${link})` : ''}

💬 *Сообщение:*
${message || 'Без сообщения'}
    `.trim();

    try {
        const bot = new Telegraf(token);
        
        // Resolve photo source once
        let photoSource: string | { source: string } | undefined;
        if (carImage && isManagerRequest) {
             console.log('Processing carImage:', carImage);

             if (carImage.startsWith('/uploads/')) {
                 // uploads folder is in root
                 const localPath = path.join(__dirname, '..', carImage);
                 if (fs.existsSync(localPath)) {
                     photoSource = { source: localPath };
                 } else {
                     console.log('Uploads file not found:', localPath);
                 }
             } else if (carImage.startsWith('/images/')) {
                 // Public assets folder
                 const localPath = path.join(__dirname, '..', 'public', carImage);
                 console.log('Trying public path:', localPath);
                 if (fs.existsSync(localPath)) {
                     photoSource = { source: localPath };
                 } else {
                     console.log('Public file not found:', localPath);
                 }
             } else if (carImage.startsWith('http')) {
                 photoSource = carImage;
             } else {
                 // Try relative path or filename in uploads
                 const uploadPath = path.join(__dirname, '..', 'uploads', carImage);
                 if (fs.existsSync(uploadPath)) {
                     photoSource = { source: uploadPath };
                 }
             }
        }

        // Send to all chat IDs
        const sendPromises = chatIds.map(async (chatId) => {
            let sent = false;
            if (photoSource) {
                try {
                    await bot.telegram.sendPhoto(chatId, photoSource, { caption: text, parse_mode: 'Markdown' });
                    sent = true;
                } catch (err) {
                    console.error(`Error sending photo to ${chatId}:`, err);
                }
            }
            
            if (!sent) {
                 await bot.telegram.sendMessage(chatId, text, { parse_mode: 'Markdown' });
            }
        });

        await Promise.all(sendPromises);

        res.json({ success: true });
    } catch (error) {
        console.error('Telegram send error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Auth
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
        const token = createToken({
            role: 'admin',
            exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        res.cookie('admin_token', token, {
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
    const token = req.cookies.admin_token;
    const payload = verifyToken(token || '');
    
    if (payload && payload.role === 'admin' && payload.exp > Date.now()) {
        res.json({ user: 'admin' });
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
});

// Env Management
app.get('/api/admin/env', requireAuth, (req, res) => {
    try {
        const envPath = path.join(__dirname, '..', '.env');
        if (!fs.existsSync(envPath)) {
             return res.json({});
        }
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const envVars: Record<string, string> = {};
        
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                if (['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID', 'ADMIN_USERNAME', 'MANAGER_WHATSAPP', 'MANAGER_TELEGRAM'].includes(key)) {
                    envVars[key] = value;
                }
            }
        });
        
        res.json(envVars);
    } catch (error) {
        console.error('Error reading .env:', error);
        res.status(500).json({ error: 'Failed to read settings' });
    }
});

app.post('/api/admin/env', requireAuth, (req, res) => {
    try {
        const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, ADMIN_USERNAME, ADMIN_PASSWORD, MANAGER_WHATSAPP, MANAGER_TELEGRAM } = req.body;
        const envPath = path.join(__dirname, '..', '.env');
        
        let envContent = '';
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf-8');
        }

        const newVars = { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, ADMIN_USERNAME, ADMIN_PASSWORD, MANAGER_WHATSAPP, MANAGER_TELEGRAM };
        let newContent = envContent;

        Object.entries(newVars).forEach(([key, value]) => {
            if (value === undefined) return;
            
            // Update process.env
            process.env[key] = value as string;

            const regex = new RegExp(`^${key}=.*`, 'm');
            if (regex.test(newContent)) {
                newContent = newContent.replace(regex, `${key}=${value}`);
            } else {
                newContent += `\n${key}=${value}`;
            }
        });

        fs.writeFileSync(envPath, newContent.trim() + '\n');
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error writing .env:', error);
        res.status(500).json({ error: 'Failed to save settings' });
    }
});

// Public Config
app.get('/api/contact-info', (req, res) => {
    res.json({
        whatsapp: process.env.MANAGER_WHATSAPP || '',
        telegram: process.env.MANAGER_TELEGRAM || ''
    });
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

// YouTube Videos Proxy
app.get('/api/youtube-videos', async (req, res) => {
    try {
        const CHANNEL_ID = 'UCoMu2BkIcQHKkUy9dr3gNdQ';
        const url = `https://www.youtube.com/channel/${CHANNEL_ID}/videos`;
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        });

        if (!response.ok) {
            throw new Error(`YouTube responded with ${response.status}`);
        }

        const html = await response.text();
        
        // Extract ytInitialData
        const match = html.match(/var ytInitialData = ({.*?});/s);
        if (!match || !match[1]) {
            throw new Error('Could not find ytInitialData');
        }

        const data = JSON.parse(match[1]);
        
        // Traverse JSON to find video items
        // Path: contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.richGridRenderer.contents
        const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs;
        const videosTab = tabs?.find((t: any) => t.tabRenderer?.title === 'Videos' || t.tabRenderer?.content?.richGridRenderer);
        
        if (!videosTab) {
            throw new Error('Could not find Videos tab');
        }

        const contents = videosTab.tabRenderer.content.richGridRenderer.contents;
        
        const videos = contents
            .filter((item: any) => item.richItemRenderer?.content?.videoRenderer)
            .map((item: any) => {
                const video = item.richItemRenderer.content.videoRenderer;
                return {
                    id: video.videoId,
                    title: video.title?.runs?.[0]?.text,
                    thumbnail: video.thumbnail?.thumbnails?.[video.thumbnail.thumbnails.length - 1]?.url, // High res
                    date: video.publishedTimeText?.simpleText || 'Recently',
                    viewCount: video.viewCountText?.simpleText,
                    length: video.lengthText?.simpleText
                };
            })
            // Extra filter for Shorts just in case (though /videos tab usually excludes them)
            .filter((v: any) => v.id && v.title); 

        // Return top 20 videos
        res.json(videos.slice(0, 20));

    } catch (error) {
        console.error('YouTube fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Translations
const localesPath = path.join(__dirname, '../src/locales');

app.get('/api/translations/:lang', requireAuth, (req, res) => {
    const { lang } = req.params;
    if (!['en', 'ru'].includes(lang)) {
        return res.status(400).json({ error: 'Invalid language' });
    }
    const filePath = path.join(localesPath, `${lang}.json`);
    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Translation file not found' });
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        res.json(JSON.parse(content));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read translation file' });
    }
});

app.post('/api/translations/:lang', requireAuth, (req, res) => {
    const { lang } = req.params;
    const content = req.body;
    
    if (!['en', 'ru'].includes(lang)) {
        return res.status(400).json({ error: 'Invalid language' });
    }
    
    const filePath = path.join(localesPath, `${lang}.json`);
    try {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save translation file' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
