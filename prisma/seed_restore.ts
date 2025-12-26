
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const carsData = [
  {
    "id": "cf7638c9-7bce-4325-bae5-d4e744b7d638",
    "title": "Mercedes-AMG E63 S1",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 119500,
    "year": 2022,
    "mileage": 12000,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 612,
    "topSpeed": 300,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "New",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "Бизнес-седан с душой гоночного болида. Режим дрифта, роскошный интерьер и невероятная динамика разгона.\n\n**Комплектация:**\n* Мультиконтурные сидения\n* Widescreen Cockpit\n* Пакет AMG Driver's Package\n* Камеры 360",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Бизнес,Спорт",
    "tags_ru": null,
    "tags_en": null,
    "labels": "Mercedes,Sedan,Sport",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T05:50:44.777Z",
    "updatedAt": "2025-12-16T06:05:05.966Z",
    "images": [
      {
        "id": "21891ed1-dab5-4077-a66c-4ae9f28c3a30",
        "carId": "cf7638c9-7bce-4325-bae5-d4e744b7d638",
        "pathOrUrl": "/uploads/bmw-m5-main.png",
        "isMain": true,
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "26965af9-24e7-4dd1-8162-5cac8d55121e",
    "title": "Porsche Panamera Turbo S",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 139900,
    "year": 2021,
    "mileage": 25000,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 630,
    "topSpeed": 315,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "Used",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "Эталон спортивного седана. Безупречная управляемость Porsche в сочетании с комфортом представительского класса.\n\n**Комплектация:**\n* Sport Chrono\n* Подруливающая задняя ось\n* Карбоновый пакет\n* Burmester High-End",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Премиум,Спорт",
    "tags_ru": null,
    "tags_en": null,
    "labels": "Porsche,Liftback,Sport",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T05:50:44.780Z",
    "updatedAt": "2025-12-16T05:51:37.195Z",
    "images": [
      {
        "id": "d6bb9178-87dd-45e8-862a-4cafffd54c81",
        "carId": "26965af9-24e7-4dd1-8162-5cac8d55121e",
        "pathOrUrl": "/uploads/bmw-m5-main.png",
        "isMain": true,
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "07be8e6c-02fa-4547-9158-931e6f6056de",
    "title": "Mercedes-AMG GT Black Series",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 450000,
    "year": 2021,
    "mileage": 1200,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 730,
    "topSpeed": 325,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "Used",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Mercedes-AMG GT Black Series is a high-performance variant of the Mercedes-AMG GT. It is the sixth Black Series model from Mercedes-AMG. The Black Series features a flat-plane crank V8 engine, active aerodynamics, and a host of other performance upgrades.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Sport,Exclusive",
    "tags_ru": null,
    "tags_en": null,
    "labels": "Hot",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:27.832Z",
    "updatedAt": "2025-12-16T23:15:27.832Z",
    "images": [
      {
        "id": "a3becc5f-e41d-403d-978b-6c3fc86db421",
        "carId": "07be8e6c-02fa-4547-9158-931e6f6056de",
        "pathOrUrl": "/images/cars/amg_gt_black_ext_1765922721266.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "7d1496b8-c785-4798-9bf0-b20481dc3ede",
        "carId": "07be8e6c-02fa-4547-9158-931e6f6056de",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "12690e53-2782-4f0b-a6af-cc58e582a728",
        "carId": "07be8e6c-02fa-4547-9158-931e6f6056de",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "97d91b68-3cd7-4dca-af33-cc3da370f792",
        "carId": "07be8e6c-02fa-4547-9158-931e6f6056de",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "6711f489-16b2-41f8-9a2d-f3e9cf692e71",
        "carId": "07be8e6c-02fa-4547-9158-931e6f6056de",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "a79d9016-416c-4c05-a496-d0e4f66669bd",
    "title": "Aston Martin Valhalla",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 800000,
    "year": 2024,
    "mileage": 50,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 950,
    "topSpeed": 350,
    "fuelType": "Hybrid",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "New",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Aston Martin Valhalla is a mid-engine plug-in hybrid sports car manufactured by British automobile manufacturer Aston Martin. The car is intended to sit below the Valkyrie in Aston Martin's lineup.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Supercar,Hybrid",
    "tags_ru": null,
    "tags_en": null,
    "labels": "New Arrival",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:27.858Z",
    "updatedAt": "2025-12-16T23:15:27.858Z",
    "images": [
      {
        "id": "06b01c6f-6077-4247-8d87-2edb09fef2b6",
        "carId": "a79d9016-416c-4c05-a496-d0e4f66669bd",
        "pathOrUrl": "/images/cars/aston_valhalla_ext_1765922689971.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "b78eb74b-39ab-430b-9c20-b9bfde7865c4",
        "carId": "a79d9016-416c-4c05-a496-d0e4f66669bd",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "eef1163a-6ede-4db4-a190-2cd288712d5a",
        "carId": "a79d9016-416c-4c05-a496-d0e4f66669bd",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "04eed110-70b4-4e80-9146-3db4db4316f4",
        "carId": "a79d9016-416c-4c05-a496-d0e4f66669bd",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "d5434cbd-e78c-45fe-8771-6b56edeb0dcf",
        "carId": "a79d9016-416c-4c05-a496-d0e4f66669bd",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "55e2a3cd-3db4-469d-b14a-ef44aa9782ae",
    "title": "Bentley Continental GT",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 300000,
    "year": 2023,
    "mileage": 5000,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 650,
    "topSpeed": 335,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "Used",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Bentley Continental GT is a grand tourer manufactured and marketed by British automaker Bentley Motors since 2003. It was the first car released by Bentley under Volkswagen AG management.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Luxury,GT",
    "tags_ru": null,
    "tags_en": null,
    "labels": "",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:27.867Z",
    "updatedAt": "2025-12-16T23:15:27.867Z",
    "images": [
      {
        "id": "2a413160-d4ad-485d-9780-944fb51b2f0d",
        "carId": "55e2a3cd-3db4-469d-b14a-ef44aa9782ae",
        "pathOrUrl": "/images/cars/bentley_cont_gt_ext_1765922735397.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "17a53b4d-b534-44fc-9700-02a98c3b8fad",
        "carId": "55e2a3cd-3db4-469d-b14a-ef44aa9782ae",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "171fa5e4-a698-41fa-8e17-cd60d9351cab",
        "carId": "55e2a3cd-3db4-469d-b14a-ef44aa9782ae",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "2033c894-c55b-42c8-b7ac-97e1e02182a5",
        "carId": "55e2a3cd-3db4-469d-b14a-ef44aa9782ae",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "e5ec522a-a0a7-409e-9e03-ed3b65d1e21d",
        "carId": "55e2a3cd-3db4-469d-b14a-ef44aa9782ae",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "37c3144b-e334-4bb6-bca5-eea0a88c7617",
    "title": "Bugatti Chiron",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 3500000,
    "year": 2022,
    "mileage": 800,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 1500,
    "topSpeed": 420,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "Used",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Bugatti Chiron is a mid-engine two-seater sports car designed and developed in Germany by Bugatti Engineering GmbH and manufactured in Molsheim, France by French automobile manufacturer Bugatti Automobiles S.A.S.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Hypercar,Exclusive",
    "tags_ru": null,
    "tags_en": null,
    "labels": "Rare",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:27.878Z",
    "updatedAt": "2025-12-16T23:15:27.878Z",
    "images": [
      {
        "id": "d49e6703-b574-4cdd-8325-769e0ea7ee15",
        "carId": "37c3144b-e334-4bb6-bca5-eea0a88c7617",
        "pathOrUrl": "/images/cars/bugatti_chiron_ext_1765922707671.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "b6e33c25-ce69-45f3-85da-816175b6503d",
        "carId": "37c3144b-e334-4bb6-bca5-eea0a88c7617",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "1c81a977-1f44-4a0f-b1ca-2c9e020617fe",
        "carId": "37c3144b-e334-4bb6-bca5-eea0a88c7617",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "e6b4d584-1892-499e-8bee-13c63f55f0b8",
        "carId": "37c3144b-e334-4bb6-bca5-eea0a88c7617",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "8aa21630-3caf-409b-b3d9-54c151851831",
        "carId": "37c3144b-e334-4bb6-bca5-eea0a88c7617",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "79aa05bc-e47a-4d6d-9dc8-c1989dd4a0b6",
    "title": "Ferrari SF90 Stradale",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 600000,
    "year": 2023,
    "mileage": 1500,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 1000,
    "topSpeed": 340,
    "fuelType": "Hybrid",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "Used",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Ferrari SF90 Stradale is a mid-engine PHEV (Plug-in Hybrid Electric Vehicle) sports car produced by the Italian car manufacturer Ferrari. The car shares its name with the SF90 Formula One car with SF90 standing for the 90th anniversary of the Scuderia Ferrari racing team.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Supercar,Hybrid",
    "tags_ru": null,
    "tags_en": null,
    "labels": "Best Seller",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:27.895Z",
    "updatedAt": "2025-12-16T23:15:27.895Z",
    "images": [
      {
        "id": "eb895980-0d78-403d-8aae-40a954671962",
        "carId": "79aa05bc-e47a-4d6d-9dc8-c1989dd4a0b6",
        "pathOrUrl": "/images/cars/ferrari_sf90_ext_1765922622687.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "2c7d1ec4-651f-4861-af81-1149f989050a",
        "carId": "79aa05bc-e47a-4d6d-9dc8-c1989dd4a0b6",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "43999130-2be7-422f-a6d4-90ce6fe9e3b8",
        "carId": "79aa05bc-e47a-4d6d-9dc8-c1989dd4a0b6",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "0b8348f9-c5ef-4991-a842-72703bd7548c",
        "carId": "79aa05bc-e47a-4d6d-9dc8-c1989dd4a0b6",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "d2e9f3a9-747f-4db3-ae3d-302b1e1d55d3",
        "carId": "79aa05bc-e47a-4d6d-9dc8-c1989dd4a0b6",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "1a73ac65-8c5b-40e0-8d36-c125d56c9dfb",
    "title": "Koenigsegg Jesko",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 3000000,
    "year": 2024,
    "mileage": 0,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 1600,
    "topSpeed": 480,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "New",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Koenigsegg Jesko is a limited production mid-engine sports car produced by the Swedish automobile manufacturer Koenigsegg. Introduced at the 2019 Geneva Motor Show, the car succeeds the Agera.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Hypercar,Speed",
    "tags_ru": null,
    "tags_en": null,
    "labels": "Exclusive",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:27.922Z",
    "updatedAt": "2025-12-16T23:15:27.922Z",
    "images": [
      {
        "id": "20916e92-7f72-44ad-b4bf-bdc3d75d2a4d",
        "carId": "1a73ac65-8c5b-40e0-8d36-c125d56c9dfb",
        "pathOrUrl": "/images/cars/koenigsegg_jesko_ext_1765922778658.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "3b4d36af-23f6-4f50-a30a-3bd6c1e36fc6",
        "carId": "1a73ac65-8c5b-40e0-8d36-c125d56c9dfb",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "e2ab7a71-fbb3-4a0e-a2ee-61b036a57a53",
        "carId": "1a73ac65-8c5b-40e0-8d36-c125d56c9dfb",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "df7f1e19-5c9f-4534-b73e-90823a7165c1",
        "carId": "1a73ac65-8c5b-40e0-8d36-c125d56c9dfb",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "7d838e43-10a7-4636-a4e0-8dbb5e4d6b45",
        "carId": "1a73ac65-8c5b-40e0-8d36-c125d56c9dfb",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "6df430cf-bd0c-4fa4-bfb5-3855c2281264",
    "title": "Lamborghini Revuelto",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 650000,
    "year": 2024,
    "mileage": 100,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 1015,
    "topSpeed": 350,
    "fuelType": "Hybrid",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "New",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Lamborghini Revuelto is a mid-engine plug-in hybrid sports car produced by the Italian automobile manufacturer Lamborghini. It is the successor to the Aventador.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Supercar,V12",
    "tags_ru": null,
    "tags_en": null,
    "labels": "New",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:28.059Z",
    "updatedAt": "2025-12-16T23:15:28.059Z",
    "images": [
      {
        "id": "6030bbb5-1221-44eb-a93c-2e8d4cc77c13",
        "carId": "6df430cf-bd0c-4fa4-bfb5-3855c2281264",
        "pathOrUrl": "/images/cars/lambo_revuelto_ext_1765922634479.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "40de001e-73ed-44d0-9cec-26d1efaee62a",
        "carId": "6df430cf-bd0c-4fa4-bfb5-3855c2281264",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "83c5d106-85bb-4c78-bdb7-3697c37271eb",
        "carId": "6df430cf-bd0c-4fa4-bfb5-3855c2281264",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "418e9931-8518-41e6-8cec-12b7561e8158",
        "carId": "6df430cf-bd0c-4fa4-bfb5-3855c2281264",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "9e29a615-0e2e-4a78-9894-a9b0856c4f7c",
        "carId": "6df430cf-bd0c-4fa4-bfb5-3855c2281264",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "dbe2b551-bb82-4c04-b0b3-7fe07c4f2b33",
    "title": "Lotus Evija",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 2300000,
    "year": 2023,
    "mileage": 50,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 2000,
    "topSpeed": 320,
    "fuelType": "Electric",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "New",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Lotus Evija is a limited production electric sports car to be manufactured by British automobile manufacturer Lotus Cars. It is the first electric vehicle to be introduced and manufactured by the company.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Electric,Hypercar",
    "tags_ru": null,
    "tags_en": null,
    "labels": "Electric",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:28.069Z",
    "updatedAt": "2025-12-16T23:15:28.069Z",
    "images": [
      {
        "id": "fae7f351-7cc7-4c1d-9aa9-acf708762071",
        "carId": "dbe2b551-bb82-4c04-b0b3-7fe07c4f2b33",
        "pathOrUrl": "/images/cars/lotus_evija_ext_1765922813835.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "acce866f-d1fc-4769-9ee7-2ced5c2ce478",
        "carId": "dbe2b551-bb82-4c04-b0b3-7fe07c4f2b33",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "7eceddad-6596-450b-9491-4dc93237b53f",
        "carId": "dbe2b551-bb82-4c04-b0b3-7fe07c4f2b33",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "20aa74c1-2bfc-4551-9bf2-d010fced8fe8",
        "carId": "dbe2b551-bb82-4c04-b0b3-7fe07c4f2b33",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "0c21230c-b6b5-4235-bee3-04e45294bd54",
        "carId": "dbe2b551-bb82-4c04-b0b3-7fe07c4f2b33",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "54fdd760-a6a3-4fc4-86e8-a8f09856243c",
    "title": "Maserati MC20",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 250000,
    "year": 2022,
    "mileage": 3000,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 630,
    "topSpeed": 325,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "Used",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The Maserati MC20 is a two-seater, mid-engined sports car produced by Italian car manufacturer Maserati. The MC20 is the first super sports car of the brand since the MC12.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Sport,Italian",
    "tags_ru": null,
    "tags_en": null,
    "labels": "",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:28.079Z",
    "updatedAt": "2025-12-16T23:15:28.079Z",
    "images": [
      {
        "id": "ee646bd2-c79e-4fdc-b94d-89596d1945ca",
        "carId": "54fdd760-a6a3-4fc4-86e8-a8f09856243c",
        "pathOrUrl": "/images/cars/maserati_mc20_ext_1765922752896.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "537c4782-8a2a-45c8-9db0-50849e7c2a39",
        "carId": "54fdd760-a6a3-4fc4-86e8-a8f09856243c",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "62889487-39b8-4dbc-b1c0-44fa6d934a8a",
        "carId": "54fdd760-a6a3-4fc4-86e8-a8f09856243c",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "05003a9e-a031-40ea-b903-28f0ee0404e3",
        "carId": "54fdd760-a6a3-4fc4-86e8-a8f09856243c",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "87589c51-5f7d-47ce-b666-54c898af9cc9",
        "carId": "54fdd760-a6a3-4fc4-86e8-a8f09856243c",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "f3d4b86f-a989-4256-a7d8-b546a0a6b91a",
    "title": "McLaren 765LT",
    "title_ru": null,
    "title_en": null,
    "priceUsd": 400000,
    "year": 2021,
    "mileage": 4000,
    "transmission": "Automatic",
    "transmission_ru": null,
    "transmission_en": null,
    "horsepower": 765,
    "topSpeed": 330,
    "fuelType": "Petrol",
    "fuelType_ru": null,
    "fuelType_en": null,
    "condition": "Used",
    "condition_ru": null,
    "condition_en": null,
    "acceleration": null,
    "engineCapacity": null,
    "bodyType": null,
    "bodyType_ru": null,
    "bodyType_en": null,
    "driveType": null,
    "driveType_ru": null,
    "driveType_en": null,
    "color": null,
    "color_ru": null,
    "color_en": null,
    "descriptionMd": "The McLaren 765LT is a limited-production version of the 720S, revealed in March 2020. It is lighter, more powerful, and has more aggressive aerodynamics than the 720S.",
    "description_ru": null,
    "description_en": null,
    "status": "active",
    "tags": "Track,Supercar",
    "tags_ru": null,
    "tags_en": null,
    "labels": "",
    "youtubeUrl": null,
    "createdAt": "2025-12-16T23:15:28.090Z",
    "updatedAt": "2025-12-16T23:15:28.090Z",
    "images": [
      {
        "id": "70f7cca4-2ba2-458b-88a4-59a6de404960",
        "carId": "f3d4b86f-a989-4256-a7d8-b546a0a6b91a",
        "pathOrUrl": "/images/cars/mclaren_765lt_ext_1765922678094.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "bff60820-2e89-4353-9fb6-66f0719da867",
        "carId": "f3d4b86f-a989-4256-a7d8-b546a0a6b91a",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "6734e069-1deb-41ee-b32d-25308e2596fd",
        "carId": "f3d4b86f-a989-4256-a7d8-b546a0a6b91a",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "ae37e2b4-d92a-42fd-bf27-83655d9bb041",
        "carId": "f3d4b86f-a989-4256-a7d8-b546a0a6b91a",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "d60052f0-a4ce-47ca-8c35-6ea82b444c40",
        "carId": "f3d4b86f-a989-4256-a7d8-b546a0a6b91a",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "72c4e3a6-2b51-4501-912b-23408e26675a",
    "title": "Pagani Huayra",
    "title_ru": "Pagani Huayra",
    "title_en": "",
    "priceUsd": 2800000,
    "year": 2018,
    "mileage": 2000,
    "transmission": "Automatic",
    "transmission_ru": "",
    "transmission_en": "",
    "horsepower": 730,
    "topSpeed": 370,
    "fuelType": "Diesel",
    "fuelType_ru": "",
    "fuelType_en": "",
    "condition": "Used",
    "condition_ru": "",
    "condition_en": "",
    "acceleration": null,
    "engineCapacity": "",
    "bodyType": "Van",
    "bodyType_ru": "",
    "bodyType_en": "",
    "driveType": "Custom",
    "driveType_ru": "",
    "driveType_en": "",
    "color": "Custom",
    "color_ru": "",
    "color_en": "",
    "descriptionMd": "The Pagani Huayra is a mid-engine sports car produced by Italian sports car manufacturer Pagani, succeeding the company's previous offering, the Zonda. It is named after Huayra-tata, a Quechua wind god.",
    "description_ru": "The Pagani Huayra is a mid-engine sports car produced by Italian sports car manufacturer Pagani, succeeding the company's previous offering, the Zonda. It is named after Huayra-tata, a Quechua wind god.",
    "description_en": "",
    "status": "active",
    "tags": "Art,Hypercar",
    "tags_ru": "Art,Hypercar",
    "tags_en": "Art,Hypercar",
    "labels": "Masterpiece",
    "youtubeUrl": "",
    "createdAt": "2025-12-16T23:15:28.098Z",
    "updatedAt": "2025-12-26T02:15:05.106Z",
    "images": [
      {
        "id": "313a931d-9cf3-4dfc-9261-187546cb6a0d",
        "carId": "72c4e3a6-2b51-4501-912b-23408e26675a",
        "pathOrUrl": "/images/cars/pagani_huayra_ext_1765922798055.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "8119c001-144b-4711-86ba-4ec940a5e338",
        "carId": "72c4e3a6-2b51-4501-912b-23408e26675a",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "fd66b60c-5cbf-47c8-a515-348f91c346ad",
        "carId": "72c4e3a6-2b51-4501-912b-23408e26675a",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "e8363988-7b9d-4b83-a8c5-43269d963a4e",
        "carId": "72c4e3a6-2b51-4501-912b-23408e26675a",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "305007f4-71e3-4436-bb6b-b294957550a6",
        "carId": "72c4e3a6-2b51-4501-912b-23408e26675a",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "4ea78422-bdf2-4c83-b267-32c5c7de032c",
    "title": "Porsche 911 GT3 RS",
    "title_ru": "Porsche 911 GT3 RS",
    "title_en": "",
    "priceUsd": 350000,
    "year": 2023,
    "mileage": 1500,
    "transmission": "Automatic",
    "transmission_ru": "",
    "transmission_en": "",
    "horsepower": 525,
    "topSpeed": 296,
    "fuelType": "Petrol",
    "fuelType_ru": "",
    "fuelType_en": "",
    "condition": "Used",
    "condition_ru": "",
    "condition_en": "",
    "acceleration": 3.3,
    "engineCapacity": "",
    "bodyType": "",
    "bodyType_ru": "",
    "bodyType_en": "",
    "driveType": "",
    "driveType_ru": "",
    "driveType_en": "",
    "color": "",
    "color_ru": "",
    "color_en": "",
    "descriptionMd": "The Porsche 911 GT3 is a high-performance homologation model of the Porsche 911 sports car. The GT3 RS is an even more track-focused version.",
    "description_ru": "The Porsche 911 GT3 is a high-performance homologation model of the Porsche 911 sports car. The GT3 RS is an even more track-focused version.",
    "description_en": "",
    "status": "active",
    "tags": "Track,Legend",
    "tags_ru": "Track,Legend",
    "tags_en": "Track,Legend",
    "labels": "Track Ready",
    "youtubeUrl": "",
    "createdAt": "2025-12-16T23:15:28.109Z",
    "updatedAt": "2025-12-26T02:01:48.002Z",
    "images": [
      {
        "id": "f4120c13-d07c-45f4-a786-fbf5c7feeed0",
        "carId": "4ea78422-bdf2-4c83-b267-32c5c7de032c",
        "pathOrUrl": "/images/cars/porsche_gt3rs_ext_1765922646949.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "f102c728-ce0e-41f9-9008-42a28faa6bc2",
        "carId": "4ea78422-bdf2-4c83-b267-32c5c7de032c",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "b55c2a39-0e99-4a3a-8aeb-81dde5cd557d",
        "carId": "4ea78422-bdf2-4c83-b267-32c5c7de032c",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "e147ddae-dded-43a8-8ffd-a9c2e640f3b7",
        "carId": "4ea78422-bdf2-4c83-b267-32c5c7de032c",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "5063dea7-0a7b-478c-af0d-86fe426d7bad",
        "carId": "4ea78422-bdf2-4c83-b267-32c5c7de032c",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "9287e42b-1626-49f5-b144-d9b9f266e44c",
    "title": "Rimac Nevera",
    "title_ru": "Лада Веста",
    "title_en": "Lada Vesta",
    "priceUsd": 2200000,
    "year": 2023,
    "mileage": 100,
    "transmission": "asd",
    "transmission_ru": "asd",
    "transmission_en": "asd",
    "horsepower": 1914,
    "topSpeed": 10,
    "fuelType": "Hybrid",
    "fuelType_ru": "",
    "fuelType_en": "",
    "condition": "New",
    "condition_ru": "",
    "condition_en": "",
    "acceleration": 2.2,
    "engineCapacity": "4.4L",
    "bodyType": "Van",
    "bodyType_ru": "",
    "bodyType_en": "",
    "driveType": "4WD",
    "driveType_ru": "",
    "driveType_en": "",
    "color": "Blue",
    "color_ru": "",
    "color_en": "",
    "descriptionMd": "The Rimac Nevera is an all-electric sports car designed and manufactured by the Croatian automotive manufacturer Rimac Automobili. It is claimed to be the fastest accelerating production car in the world.",
    "description_ru": "The Rimac Nevera is an all-electric sports car designed and manufactured by the Croatian automotive manufacturer Rimac Automobili. It is claimed to be the fastest accelerating production car in the world.",
    "description_en": "",
    "status": "active",
    "tags": "Electric,Hypercar",
    "tags_ru": "Electric,Hypercar",
    "tags_en": "Electric,Hypercar",
    "labels": "Record Breaker",
    "youtubeUrl": "",
    "createdAt": "2025-12-16T23:15:28.118Z",
    "updatedAt": "2025-12-26T02:59:17.702Z",
    "images": [
      {
        "id": "9772a4aa-993e-4fee-801a-cbc253620077",
        "carId": "9287e42b-1626-49f5-b144-d9b9f266e44c",
        "pathOrUrl": "/images/cars/rimac_nevera_ext_1765922765414.png",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "b1602a1a-0f44-44bd-89d5-44bf3ceb6505",
        "carId": "9287e42b-1626-49f5-b144-d9b9f266e44c",
        "pathOrUrl": "/images/cars/car_interior_detail_1765922825404.png",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "2f8b9261-c2cf-4c16-be44-c7e39201f011",
        "carId": "9287e42b-1626-49f5-b144-d9b9f266e44c",
        "pathOrUrl": "/images/cars/car_engine_detail_1765922858321.png",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "98697e07-0380-4adf-8b3f-0781d1c59bba",
        "carId": "9287e42b-1626-49f5-b144-d9b9f266e44c",
        "pathOrUrl": "/images/cars/car_wheel_detail_1765922845594.png",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "71bb8464-396c-4941-bc30-8c9f865dd739",
        "carId": "9287e42b-1626-49f5-b144-d9b9f266e44c",
        "pathOrUrl": "/images/cars/car_rear_detail_1765922870962.png",
        "isMain": false,
        "sortOrder": 4
      }
    ]
  },
  {
    "id": "104e6331-2bfc-4bbc-a1de-d49095c61bc6",
    "title": "BMW M5 Competition",
    "title_ru": "BMW M5 Competition",
    "title_en": "BNV M5power",
    "priceUsd": 48600,
    "year": 2025,
    "mileage": 8000,
    "transmission": "Typetronic",
    "transmission_ru": "Тиктоник",
    "transmission_en": "Typetronic",
    "horsepower": 670,
    "topSpeed": 420,
    "fuelType": "Diesel",
    "fuelType_ru": "",
    "fuelType_en": "",
    "condition": "Freshish",
    "condition_ru": "Свежак",
    "condition_en": "Freshish",
    "acceleration": 2.6,
    "engineCapacity": "5.5L",
    "bodyType": "Sedan",
    "bodyType_ru": "",
    "bodyType_en": "",
    "driveType": "AWD",
    "driveType_ru": "",
    "driveType_en": "",
    "color": "Blue",
    "color_ru": "",
    "color_en": "",
    "descriptionMd": "",
    "description_ru": "",
    "description_en": "",
    "status": "active",
    "tags": "m5,powefull,sportif",
    "tags_ru": "MPOWER,Sportcar,xDrive",
    "tags_en": "m5,powefull,sportif",
    "labels": "",
    "youtubeUrl": "",
    "createdAt": "2025-12-25T22:22:27.485Z",
    "updatedAt": "2025-12-26T01:52:45.391Z",
    "images": [
      {
        "id": "9eb0e84e-6807-41fc-af9f-33ffe863bfa2",
        "carId": "104e6331-2bfc-4bbc-a1de-d49095c61bc6",
        "pathOrUrl": "/uploads/1766713962735-782372083.jpg",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "74e84600-9f21-4bf8-9a00-b20ae8645aa3",
        "carId": "104e6331-2bfc-4bbc-a1de-d49095c61bc6",
        "pathOrUrl": "/uploads/1766713962741-569335559.jpg",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "b7a94fb2-5b2f-46fd-bcd9-cbd4efe8460f",
        "carId": "104e6331-2bfc-4bbc-a1de-d49095c61bc6",
        "pathOrUrl": "/uploads/1766713962751-110485348.webp",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "8906795f-6410-46c3-9f7e-57ea424e4a94",
        "carId": "104e6331-2bfc-4bbc-a1de-d49095c61bc6",
        "pathOrUrl": "/uploads/1766713962752-222891177.jpg",
        "isMain": false,
        "sortOrder": 3
      }
    ]
  },
  {
    "id": "b3c3a55d-5d81-47ec-8006-40c18834f5b0",
    "title": "DODGE RAM TRX",
    "title_ru": "DODGE RAM TRX",
    "title_en": "DODGE RAM TRXXxX",
    "priceUsd": 89000,
    "year": 2023,
    "mileage": 42000,
    "transmission": "Automatic",
    "transmission_ru": "",
    "transmission_en": "",
    "horsepower": 702,
    "topSpeed": 180,
    "fuelType": "Diesel",
    "fuelType_ru": "",
    "fuelType_en": "",
    "condition": "Used",
    "condition_ru": "",
    "condition_en": "",
    "acceleration": 6,
    "engineCapacity": "6.2L",
    "bodyType": "Truck",
    "bodyType_ru": "",
    "bodyType_en": "",
    "driveType": "4WD",
    "driveType_ru": "",
    "driveType_en": "",
    "color": "Red",
    "color_ru": "",
    "color_en": "",
    "descriptionMd": "\nExtérieur et performances / PR4: FLAME RED / Différentiel électronique / Suspension actives performance avant et arrière / Ration de pont arrière 3.55 / NFF: Réservoir 124L / ANT: 4 crochets, lumière de benne, marchepied de benne, protection de benne en spray projeté / GWJ: Double toit ouvrant panoramique / MTW: Marchepieds MOPAR Off-Road / WS1: Jantes Beadlocks\n\nConfort et commodités / A6G: TRX Level 2 Equipment Group 2022 (Sellerie cuir, détecteur d'angle mort, sièges avant chauffants et ventilés, sièges arrière chauffants et ventilés, sièges arrière strapontins inclinables, volant chauffant, entrée sans clé, démarrage à distance, ouverture hayon à distance, chargeur téléphone sans fil, affichage tête haute, bac de rangement sous siège arrière, essuie-glace automatique, lumière de benne, radars avant et arrière) / Sièges arrière de type strapontins\n\nTechnologie et divertissement / Écran tactile 12 pouces avec GPS US (GPS Europe non disponible), Apple CarPlay sans fil et Android Auto / Sono Harman Kardon 19 haut-parleurs / Caméra 360 degrés\n\nSécurité et aide à la conduite / ALP: Pack sécurité (régulateur adaptatif avec anticollision, détection de piétons, détection ligne blanche) / Anticollision avant avec freinage assisté / Caméra de recul / Assistance au freinage / ESC / Aide au démarrage en côte / AHC: Pack remorquage (contrôle de pression des feux et des pneus de la remorque) / Frein de remorque électrique\n",
    "description_ru": "🇷🇺 РУССКИЙ (Демо-описание)\n\nTRX в цвете Flame Red с активной спортивной подвеской, электронным дифференциалом и задним мостом 3.55.\nТопливный бак 124 л, напыляемая защита кузова, буксировочные крюки, внедорожные пороги MOPAR, колёса Beadlock, двойной панорамный люк.\n\nПакет TRX Level 2: кожаный салон, подогрев и вентиляция сидений спереди и сзади, подогрев руля, проекционный дисплей, беспроводная зарядка, дистанционный запуск, парктроники.\nЭкран 12″ с GPS США, беспроводные Apple CarPlay и Android Auto, аудиосистема Harman Kardon (19 динамиков), камеры 360°.\n\nПакет безопасности: адаптивный круиз-контроль, предотвращение столкновений, распознавание пешеходов, контроль полосы.\nПакет буксировки с электрическим тормозом прицепа.\n",
    "description_en": "🇬🇧 ENGLISH (Demo Description)\n\nFlame Red TRX with active performance suspension, electronic differential, and 3.55 rear axle ratio. \n124L fuel tank, spray-in bedliner, tow hooks, MOPAR Off-Road side steps, Beadlock wheels, and dual panoramic sunroof.\n\nTRX Level 2 Equipment Group (leather interior, heated & ventilated seats front and rear, heated steering wheel, HUD, wireless charger, remote start, parking sensors).\n12\" touchscreen with US GPS, wireless Apple CarPlay & Android Auto, Harman Kardon 19-speaker audio, 360° camera.\n\nSafety package includes adaptive cruise control, collision mitigation, pedestrian detection, lane assist.\nTowing package with electric trailer brake controller.\n",
    "status": "active",
    "tags": "trx,truck,pickup",
    "tags_ru": "trx,ram,muscle,vrutal",
    "tags_en": "trx,truck,pickup",
    "labels": "",
    "youtubeUrl": "",
    "createdAt": "2025-12-26T02:00:54.557Z",
    "updatedAt": "2025-12-26T02:31:48.106Z",
    "images": [
      {
        "id": "0ab00e17-1b7d-48c2-8f17-960612dede5d",
        "carId": "b3c3a55d-5d81-47ec-8006-40c18834f5b0",
        "pathOrUrl": "/uploads/1766714297814-867157959.jpg",
        "isMain": true,
        "sortOrder": 0
      },
      {
        "id": "78827319-1e5b-4173-b7c6-26dbfd63cb65",
        "carId": "b3c3a55d-5d81-47ec-8006-40c18834f5b0",
        "pathOrUrl": "/uploads/1766714297798-147408128.jpg",
        "isMain": false,
        "sortOrder": 1
      },
      {
        "id": "99845014-f1fb-4ce4-8556-433032c5a76e",
        "carId": "b3c3a55d-5d81-47ec-8006-40c18834f5b0",
        "pathOrUrl": "/uploads/1766714297809-785031894.jpg",
        "isMain": false,
        "sortOrder": 2
      },
      {
        "id": "870134aa-484f-4653-9901-4e9b1bbdcd57",
        "carId": "b3c3a55d-5d81-47ec-8006-40c18834f5b0",
        "pathOrUrl": "/uploads/1766714297816-25151381.jpg",
        "isMain": false,
        "sortOrder": 3
      },
      {
        "id": "c255ffa4-6b73-4370-aed1-af984a785f73",
        "carId": "b3c3a55d-5d81-47ec-8006-40c18834f5b0",
        "pathOrUrl": "/uploads/1766714297819-104032606.jpeg",
        "isMain": false,
        "sortOrder": 4
      },
      {
        "id": "c9f9ef17-0700-4a9f-86bb-7b7ddd15df7c",
        "carId": "b3c3a55d-5d81-47ec-8006-40c18834f5b0",
        "pathOrUrl": "/uploads/1766714297822-82949405.jpg",
        "isMain": false,
        "sortOrder": 5
      }
    ]
  }
];

async function main() {
    console.log('Starting restore...');

    const uploadsDir = path.join(__dirname, '../server/uploads');
    const restoreAssetsDir = path.join(__dirname, 'restore_assets');

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 1. Restore Images
    if (fs.existsSync(restoreAssetsDir)) {
        const files = fs.readdirSync(restoreAssetsDir);
        let restoredCount = 0;
        for (const file of files) {
            if (file === '.DS_Store') continue;
            const source = path.join(restoreAssetsDir, file);
            const target = path.join(uploadsDir, file);
            fs.copyFileSync(source, target);
            restoredCount++;
        }
        console.log(`Restored ${restoredCount} images to server/uploads.`);
    } else {
        console.warn('No restore_assets directory found.');
    }

    // 2. Restore Database Records
    console.log('Restoring database records...');
    
    for (const car of carsData) {
        const { images, ...carData } = car;
        
        // Upsert Car
        // We use 'any' cast because TS might complain about types mismatch if schema changed slightly
        // or just strict typing of Date strings from JSON.
        await prisma.car.upsert({
            where: { id: car.id },
            update: {
                ...carData,
                updatedAt: new Date(carData.updatedAt),
                createdAt: new Date(carData.createdAt)
            } as any,
            create: {
                ...carData,
                updatedAt: new Date(carData.updatedAt),
                createdAt: new Date(carData.createdAt)
            } as any
        });

        // Upsert Images
        for (const image of images) {
            await prisma.image.upsert({
                where: { id: image.id },
                update: image,
                create: image
            });
        }
    }

    console.log('Database restore completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
