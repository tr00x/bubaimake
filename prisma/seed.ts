
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const uploadsDir = path.join(__dirname, '../server/uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Copy local asset to uploads for seeding
    const sourceImage = path.join(__dirname, '../src/assets/5ff7312c3dc0a1014ede77a74beefcf8924374ee.png');
    const targetImageName = 'bmw-m5-main.png';
    const targetPath = path.join(uploadsDir, targetImageName);

    if (fs.existsSync(sourceImage)) {
        fs.copyFileSync(sourceImage, targetPath);
        console.log(`Copied ${sourceImage} to ${targetPath}`);
    } else {
        console.warn(`Source image not found at ${sourceImage}, skipping copy.`);
    }

    const cars = [
        {
            title: "BMW M5 Competition",
            priceUsd: 138889,
            year: 2024,
            mileage: 0,
            transmission: "Automatic",
            horsepower: 625,
            topSpeed: 305,
            fuelType: "Petrol",
            condition: "New",
            descriptionMd: "Спортивный седан премиум-класса с мощным двигателем и богатой комплектацией. Идеален для динамичной езды и комфортных поездок. Автомобиль с прозрачной историей и гарантией качества.\n\n**Комплектация:**\n* Кожа Nappa\n* Премиальная аудиосистема\n* Пакет M Sport\n* Адаптивная подвеска\n* Подогрев сидений\n* Панорамная крыша",
            status: "active",
            tags: "Горячее,Новый",
            labels: "BMW,Sedan,Sport",
            youtubeUrl: null,
        },
        {
            title: "Audi RS6 Performance",
            priceUsd: 129000,
            year: 2023,
            mileage: 5000,
            transmission: "Automatic",
            horsepower: 630,
            topSpeed: 305,
            fuelType: "Petrol",
            condition: "Used",
            descriptionMd: "Ультимативный универсал для всей семьи с динамикой суперкара. Просторный салон, огромный багажник и полный привод Quattro.\n\n**Комплектация:**\n* Матричные фары\n* Спортивный выхлоп RS\n* Керамические тормоза\n* Bang & Olufsen 3D Advanced",
            status: "active",
            tags: "Семейный,Спорт",
            labels: "Audi,Wagon,Sport",
            youtubeUrl: null,
        },
        {
            title: "Mercedes-AMG E63 S",
            priceUsd: 119500,
            year: 2022,
            mileage: 12000,
            transmission: "Automatic",
            horsepower: 612,
            topSpeed: 300,
            fuelType: "Petrol",
            condition: "Used",
            descriptionMd: "Бизнес-седан с душой гоночного болида. Режим дрифта, роскошный интерьер и невероятная динамика разгона.\n\n**Комплектация:**\n* Мультиконтурные сидения\n* Widescreen Cockpit\n* Пакет AMG Driver's Package\n* Камеры 360",
            status: "active",
            tags: "Бизнес,Спорт",
            labels: "Mercedes,Sedan,Sport",
            youtubeUrl: null,
        },
        {
            title: "Porsche Panamera Turbo S",
            priceUsd: 139900,
            year: 2021,
            mileage: 25000,
            transmission: "Automatic",
            horsepower: 630,
            topSpeed: 315,
            fuelType: "Petrol",
            condition: "Used",
            descriptionMd: "Эталон спортивного седана. Безупречная управляемость Porsche в сочетании с комфортом представительского класса.\n\n**Комплектация:**\n* Sport Chrono\n* Подруливающая задняя ось\n* Карбоновый пакет\n* Burmester High-End",
            status: "active",
            tags: "Премиум,Спорт",
            labels: "Porsche,Liftback,Sport",
            youtubeUrl: null,
        }
    ];

    for (const carData of cars) {
        const existingCar = await prisma.car.findFirst({
            where: { title: carData.title }
        });

        if (!existingCar) {
            const car = await prisma.car.create({
                data: {
                    ...carData,
                    images: {
                        create: [
                            {
                                pathOrUrl: `/uploads/${targetImageName}`,
                                isMain: true,
                                sortOrder: 0
                            }
                        ]
                    }
                }
            });
            console.log(`Created car: ${car.title}`);
        } else {
            console.log(`Car already exists: ${existingCar.title}`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
