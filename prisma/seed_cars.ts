
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Image Copying Logic
const SOURCE_DIR = '/Users/timhunt/.gemini/antigravity/brain/2197bd8c-acb9-4247-95e1-706e3d762f43';
const DEST_DIR = path.join(process.cwd(), 'public', 'images', 'cars');

function copyImages() {
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    const imageMap: Record<string, string> = {
        'ferrari_sf90_ext': 'ferrari_sf90_ext.jpg',
        'lambo_revuelto_ext': 'lambo_revuelto_ext.jpg',
        'porsche_gt3rs_ext': 'porsche_gt3rs_ext.jpg',
        'rr_spectre_ext': 'rr_spectre_ext.jpg',
        'mclaren_765lt_ext': 'mclaren_765lt_ext.jpg',
        'aston_valhalla_ext': 'aston_valhalla_ext.jpg',
        'bugatti_chiron_ext': 'bugatti_chiron_ext.jpg',
        'amg_gt_black_ext': 'amg_gt_black_ext.jpg',
        'bentley_cont_gt_ext': 'bentley_cont_gt_ext.jpg',
        'maserati_mc20_ext': 'maserati_mc20_ext.jpg',
        'rimac_nevera_ext': 'rimac_nevera_ext.jpg',
        'koenigsegg_jesko_ext': 'koenigsegg_jesko_ext.jpg',
        'pagani_huayra_ext': 'pagani_huayra_ext.jpg',
        'lotus_evija_ext': 'lotus_evija_ext.jpg',
        'car_interior_detail': 'car_interior_detail.jpg',
        'car_wheel_detail': 'car_wheel_detail.jpg',
        'car_engine_detail': 'car_engine_detail.jpg',
        'car_rear_detail': 'car_rear_detail.jpg'
    };

    console.log('Starting image copy...');
    console.log(`Source: ${SOURCE_DIR}`);
    console.log(`Dest: ${DEST_DIR}`);

    try {
        const files = fs.readdirSync(SOURCE_DIR);

        for (const [key, destName] of Object.entries(imageMap)) {
            // Find file starting with key (ignoring timestamp suffix)
            const match = files.find(f => f.startsWith(key) && f.endsWith('.png'));
            if (match) {
                const srcPath = path.join(SOURCE_DIR, match);
                const destPath = path.join(DEST_DIR, destName);
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied ${match} -> ${destName}`);
            } else {
                console.warn(`Warning: Image for ${key} not found in artifacts dir.`);
            }
        }
    } catch (error) {
        console.error('Error copying images:', error);
    }
}

const cars = [
    {
        title: 'Ferrari SF90 Stradale',
        priceUsd: 625000,
        year: 2023,
        mileage: 1200,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        condition: 'Used',
        status: 'active',
        horsepower: 986,
        topSpeed: 340,
        descriptionMd: "The **Ferrari SF90 Stradale** is a mid-engine PHEV (Plug-in Hybrid Electric Vehicle) sports car produced by the Italian automobile manufacturer Ferrari. The car shares its name with the SF90 Formula One car with which Scuderia Ferrari celebrated its 90th anniversary.\n\n### Key Features:\n- 4.0L twin-turbocharged V8 engine\n- Three electric motors\n- 0-100 km/h in 2.5 seconds\n- Assetto Fiorano package available",
        tags: JSON.stringify(['Supercar', 'Hybrid', 'Ferrari', 'Performance']),
        labels: JSON.stringify(['Hot', 'New Arrival']),
        images: ['ferrari_sf90_ext.jpg']
    },
    {
        title: 'Lamborghini Revuelto',
        priceUsd: 890000,
        year: 2024,
        mileage: 50,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        condition: 'New',
        status: 'active',
        horsepower: 1001,
        topSpeed: 350,
        descriptionMd: "The **Lamborghini Revuelto** is a mid-engine plug-in hybrid sports car produced by the Italian automobile manufacturer Lamborghini. It is the successor to the Aventador.\n\n### Highlights:\n- 6.5L V12 engine\n- 3 electric motors\n- Carbon fiber monocoque\n- Y-shaped light signature",
        tags: JSON.stringify(['Supercar', 'Hybrid', 'Lamborghini', 'V12']),
        labels: JSON.stringify(['Premium', 'Exclusive']),
        images: ['lambo_revuelto_ext.jpg']
    },
    {
        title: 'Porsche 911 GT3 RS',
        priceUsd: 350000,
        year: 2023,
        mileage: 3500,
        transmission: 'PDK',
        fuelType: 'Petrol',
        condition: 'Used',
        status: 'active',
        horsepower: 518,
        topSpeed: 296,
        descriptionMd: "The **Porsche 911 GT3 RS** is a high-performance variant of the Porsche 911 sports car. It is a track-focused car that is street legal.\n\n### Specifications:\n- 4.0L naturally aspirated flat-six\n- DRS (Drag Reduction System)\n- Lightweight construction\n- Extreme aerodynamics",
        tags: JSON.stringify(['Sports Car', 'Porsche', 'Track', 'GT3']),
        labels: JSON.stringify(['Best Seller']),
        images: ['porsche_gt3rs_ext.jpg']
    },
    {
        title: 'Rolls-Royce Spectre',
        priceUsd: 420000,
        year: 2024,
        mileage: 100,
        transmission: 'Automatic',
        fuelType: 'Electric',
        condition: 'New',
        status: 'active',
        horsepower: 577,
        topSpeed: 250,
        descriptionMd: "The **Rolls-Royce Spectre** is a full-sized luxury electric coupé manufactured by Rolls-Royce Motor Cars. It is the brand's first electric vehicle.\n\n### Luxury Redefined:\n- All-electric powertrain\n- Starlight doors\n- Bespoke interior\n- Magic Carpet Ride",
        tags: JSON.stringify(['Luxury', 'Electric', 'Rolls-Royce', 'Coupe']),
        labels: JSON.stringify(['Electric', 'Luxury']),
        images: ['rr_spectre_ext.jpg']
    },
    {
        title: 'McLaren 765LT',
        priceUsd: 480000,
        year: 2022,
        mileage: 2100,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        condition: 'Used',
        status: 'active',
        horsepower: 755,
        topSpeed: 330,
        descriptionMd: "The **McLaren 765LT** is a limited-production track-focused variant of the 720S. 'LT' stands for Longtail, signifying its extended rear capabilities and aerodynamics.\n\n### Performance:\n- 4.0L twin-turbo V8\n- Titanium exhaust system\n- Increased downforce\n- Limited to 765 units",
        tags: JSON.stringify(['Supercar', 'McLaren', 'Limited', 'Track']),
        labels: JSON.stringify(['Rare']),
        images: ['mclaren_765lt_ext.jpg']
    },
    {
        title: 'Aston Martin Valhalla',
        priceUsd: 800000,
        year: 2024,
        mileage: 0,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        condition: 'New',
        status: 'reserved',
        horsepower: 937,
        topSpeed: 350,
        descriptionMd: "The **Aston Martin Valhalla** is an upcoming mid-engine plug-in hybrid sports car manufactured by Aston Martin.\n\n### British Engineering:\n- 4.0L twin-turbo V8\n- F1-inspired technology\n- Active aerodynamics\n- Carbon fibre structure",
        tags: JSON.stringify(['Hypercar', 'Hybrid', 'Aston Martin', 'Concept']),
        labels: JSON.stringify(['Pre-order']),
        images: ['aston_valhalla_ext.jpg']
    },
    {
        title: 'Bugatti Chiron Super Sport',
        priceUsd: 3800000,
        year: 2022,
        mileage: 1500,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        condition: 'Used',
        status: 'active',
        horsepower: 1578,
        topSpeed: 440,
        descriptionMd: "The **Bugatti Chiron Super Sport** is a high-performance variant of the Chiron. It is designed for top speed and longitudinal dynamics.\n\n### The Apex:\n- 8.0L quad-turbo W16\n- Longtail design\n- Unmatched luxury\n- Engineering marvel",
        tags: JSON.stringify(['Hypercar', 'Bugatti', 'W16', 'Speed']),
        labels: JSON.stringify(['Exclusive', 'Top Tier']),
        images: ['bugatti_chiron_ext.jpg']
    },
    {
        title: 'Mercedes-AMG GT Black Series',
        priceUsd: 450000,
        year: 2021,
        mileage: 4200,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        condition: 'Used',
        status: 'active',
        horsepower: 720,
        topSpeed: 325,
        descriptionMd: "The **Mercedes-AMG GT Black Series** is the high-performance variant of the Mercedes-AMG GT. It holds natural Nürburgring records.\n\n### German Muscle:\n- Flat-plane crank V8\n- Adjustable coilover suspension\n- Carbon fiber hood and roof\n- Active aero",
        tags: JSON.stringify(['Sports Car', 'Mercedes', 'AMG', 'Track']),
        labels: JSON.stringify(['Performance']),
        images: ['amg_gt_black_ext.jpg']
    },
    {
        title: 'Bentley Continental GT Speed',
        priceUsd: 320000,
        year: 2024,
        mileage: 500,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        condition: 'New',
        status: 'active',
        horsepower: 650,
        topSpeed: 335,
        descriptionMd: "The **Bentley Continental GT Speed** is the most dynamic road car in Bentley's 101-year history.\n\n### Grand Touring:\n- 6.0L W12 TSI engine\n- All-wheel steering\n- Electronic Limited Slip Differential\n- Handcrafted interior",
        tags: JSON.stringify(['Luxury', 'Bentley', 'GT', 'W12']),
        labels: JSON.stringify(['Comfort']),
        images: ['bentley_cont_gt_ext.jpg']
    },
    {
        title: 'Maserati MC20 Cielo',
        priceUsd: 260000,
        year: 2024,
        mileage: 200,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        condition: 'New',
        status: 'active',
        horsepower: 621,
        topSpeed: 320,
        descriptionMd: "The **Maserati MC20 Cielo** is a mid-engine sports car produced by Maserati. 'Cielo' means sky, referring to its convertible nature.\n\n### Italian Style:\n- Nettuno V6 engine\n- Glass roof\n- Butterfly doors\n- Carbon fiber chassis",
        tags: JSON.stringify(['Sports Car', 'Maserati', 'Convertible', 'V6']),
        labels: JSON.stringify(['Stylish']),
        images: ['maserati_mc20_ext.jpg']
    },
    {
        title: 'Rimac Nevera',
        priceUsd: 2200000,
        year: 2023,
        mileage: 800,
        transmission: 'Automatic',
        fuelType: 'Electric',
        condition: 'Used',
        status: 'active',
        horsepower: 1914,
        topSpeed: 412,
        descriptionMd: "The **Rimac Nevera** is an all-electric sports car designed and manufactured by the Croatian automotive manufacturer Rimac Automobili.\n\n### Electric Power:\n- Four liquid-cooled electric motors\n- 0-60 mph in 1.85 seconds\n- 120 kWh battery pack\n- Advanced torque vectoring",
        tags: JSON.stringify(['Hypercar', 'Electric', 'Rimac', 'Record Breaker']),
        labels: JSON.stringify(['Future']),
        images: ['rimac_nevera_ext.jpg']
    },
    {
        title: 'Koenigsegg Jesko',
        priceUsd: 3000000,
        year: 2024,
        mileage: 0,
        transmission: 'LST',
        fuelType: 'Petrol',
        condition: 'New',
        status: 'active',
        horsepower: 1600,
        topSpeed: 480,
        descriptionMd: "The **Koenigsegg Jesko** is a limited production mid-engine sports car produced by Swedish automobile manufacturer Koenigsegg.\n\n### Swedish Engineering:\n- 5.0L twin-turbo V8\n- Light Speed Transmission (9-speed multi-clutch)\n- Active rear steering\n- Triplex suspension",
        tags: JSON.stringify(['Hypercar', 'Koenigsegg', 'Jesko', 'Speed']),
        labels: JSON.stringify(['Mega Car']),
        images: ['koenigsegg_jesko_ext.jpg']
    },
    {
        title: 'Pagani Huayra Roadster BC',
        priceUsd: 3500000,
        year: 2021,
        mileage: 1800,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        condition: 'Used',
        status: 'active',
        horsepower: 802,
        topSpeed: 370,
        descriptionMd: "The **Pagani Huayra Roadster BC** is a track-focused version of the Huayra Roadster.\n\n### Art on Wheels:\n- AMG V12 engine\n- Carbo-Titanium chassis\n- Active aerodynamics\n- Exquisite detailing",
        tags: JSON.stringify(['Hypercar', 'Pagani', 'V12', 'Art']),
        labels: JSON.stringify(['Masterpiece']),
        images: ['pagani_huayra_ext.jpg']
    },
    {
        title: 'Lotus Evija',
        priceUsd: 2100000,
        year: 2024,
        mileage: 100,
        transmission: 'Automatic',
        fuelType: 'Electric',
        condition: 'New',
        status: 'active',
        horsepower: 2000,
        topSpeed: 320,
        descriptionMd: "The **Lotus Evija** is a limited production electric sports car manufactured by British automobile manufacturer Lotus Cars.\n\n### Pure Electric:\n- Target output of 2000 PS\n- Ultra-fast charging\n- Venturi tunnels\n- Porous design",
        tags: JSON.stringify(['Hypercar', 'Electric', 'Lotus', 'Lightweight']),
        labels: JSON.stringify(['Innovation']),
        images: ['lotus_evija_ext.jpg']
    }
];

const sharedImages = [
    { path: 'car_interior_detail.jpg', isMain: false },
    { path: 'car_wheel_detail.jpg', isMain: false },
    { path: 'car_engine_detail.jpg', isMain: false },
    { path: 'car_rear_detail.jpg', isMain: false }
];

async function main() {
    console.log('Start seeding ...');

    // Clear existing data (optional, maybe safe to keep?)
    // await prisma.image.deleteMany();
    // await prisma.car.deleteMany();

    for (const carData of cars) {
        const { images, ...data } = carData;
        const car = await prisma.car.create({
            data: {
                ...data,
                images: {
                    create: [
                        { pathOrUrl: `/images/cars/${images[0]}`, isMain: true, sortOrder: 0 },
                        ...sharedImages.map((img, index) => ({
                            pathOrUrl: `/images/cars/${img.path}`,
                            isMain: img.isMain,
                            sortOrder: index + 1
                        }))
                    ]
                }
            },
        });
        console.log(`Created car with id: ${car.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
