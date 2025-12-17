
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genericImages = [
  '/images/cars/car_interior_detail_1765922825404.png',
  '/images/cars/car_engine_detail_1765922858321.png',
  '/images/cars/car_wheel_detail_1765922845594.png',
  '/images/cars/car_rear_detail_1765922870962.png',
];

const cars = [
  {
    title: 'Mercedes-AMG GT Black Series',
    mainImage: '/images/cars/amg_gt_black_ext_1765922721266.png',
    priceUsd: 450000,
    year: 2021,
    mileage: 1200,
    transmission: 'Automatic',
    horsepower: 730,
    topSpeed: 325,
    fuelType: 'Petrol',
    condition: 'Used',
    status: 'active',
    tags: 'Sport,Exclusive',
    labels: 'Hot',
    descriptionMd: 'The Mercedes-AMG GT Black Series is a high-performance variant of the Mercedes-AMG GT. It is the sixth Black Series model from Mercedes-AMG. The Black Series features a flat-plane crank V8 engine, active aerodynamics, and a host of other performance upgrades.',
  },
  {
    title: 'Aston Martin Valhalla',
    mainImage: '/images/cars/aston_valhalla_ext_1765922689971.png',
    priceUsd: 800000,
    year: 2024,
    mileage: 50,
    transmission: 'Automatic',
    horsepower: 950,
    topSpeed: 350,
    fuelType: 'Hybrid',
    condition: 'New',
    status: 'active',
    tags: 'Supercar,Hybrid',
    labels: 'New Arrival',
    descriptionMd: 'The Aston Martin Valhalla is a mid-engine plug-in hybrid sports car manufactured by British automobile manufacturer Aston Martin. The car is intended to sit below the Valkyrie in Aston Martin\'s lineup.',
  },
  {
    title: 'Bentley Continental GT',
    mainImage: '/images/cars/bentley_cont_gt_ext_1765922735397.png',
    priceUsd: 300000,
    year: 2023,
    mileage: 5000,
    transmission: 'Automatic',
    horsepower: 650,
    topSpeed: 335,
    fuelType: 'Petrol',
    condition: 'Used',
    status: 'active',
    tags: 'Luxury,GT',
    labels: '',
    descriptionMd: 'The Bentley Continental GT is a grand tourer manufactured and marketed by British automaker Bentley Motors since 2003. It was the first car released by Bentley under Volkswagen AG management.',
  },
  {
    title: 'Bugatti Chiron',
    mainImage: '/images/cars/bugatti_chiron_ext_1765922707671.png',
    priceUsd: 3500000,
    year: 2022,
    mileage: 800,
    transmission: 'Automatic',
    horsepower: 1500,
    topSpeed: 420,
    fuelType: 'Petrol',
    condition: 'Used',
    status: 'active',
    tags: 'Hypercar,Exclusive',
    labels: 'Rare',
    descriptionMd: 'The Bugatti Chiron is a mid-engine two-seater sports car designed and developed in Germany by Bugatti Engineering GmbH and manufactured in Molsheim, France by French automobile manufacturer Bugatti Automobiles S.A.S.',
  },
  {
    title: 'Ferrari SF90 Stradale',
    mainImage: '/images/cars/ferrari_sf90_ext_1765922622687.png',
    priceUsd: 600000,
    year: 2023,
    mileage: 1500,
    transmission: 'Automatic',
    horsepower: 1000,
    topSpeed: 340,
    fuelType: 'Hybrid',
    condition: 'Used',
    status: 'active',
    tags: 'Supercar,Hybrid',
    labels: 'Best Seller',
    descriptionMd: 'The Ferrari SF90 Stradale is a mid-engine PHEV (Plug-in Hybrid Electric Vehicle) sports car produced by the Italian car manufacturer Ferrari. The car shares its name with the SF90 Formula One car with SF90 standing for the 90th anniversary of the Scuderia Ferrari racing team.',
  },
  {
    title: 'Koenigsegg Jesko',
    mainImage: '/images/cars/koenigsegg_jesko_ext_1765922778658.png',
    priceUsd: 3000000,
    year: 2024,
    mileage: 0,
    transmission: 'Automatic',
    horsepower: 1600,
    topSpeed: 480,
    fuelType: 'Petrol',
    condition: 'New',
    status: 'active',
    tags: 'Hypercar,Speed',
    labels: 'Exclusive',
    descriptionMd: 'The Koenigsegg Jesko is a limited production mid-engine sports car produced by the Swedish automobile manufacturer Koenigsegg. Introduced at the 2019 Geneva Motor Show, the car succeeds the Agera.',
  },
  {
    title: 'Lamborghini Revuelto',
    mainImage: '/images/cars/lambo_revuelto_ext_1765922634479.png',
    priceUsd: 650000,
    year: 2024,
    mileage: 100,
    transmission: 'Automatic',
    horsepower: 1015,
    topSpeed: 350,
    fuelType: 'Hybrid',
    condition: 'New',
    status: 'active',
    tags: 'Supercar,V12',
    labels: 'New',
    descriptionMd: 'The Lamborghini Revuelto is a mid-engine plug-in hybrid sports car produced by the Italian automobile manufacturer Lamborghini. It is the successor to the Aventador.',
  },
  {
    title: 'Lotus Evija',
    mainImage: '/images/cars/lotus_evija_ext_1765922813835.png',
    priceUsd: 2300000,
    year: 2023,
    mileage: 50,
    transmission: 'Automatic',
    horsepower: 2000,
    topSpeed: 320,
    fuelType: 'Electric',
    condition: 'New',
    status: 'active',
    tags: 'Electric,Hypercar',
    labels: 'Electric',
    descriptionMd: 'The Lotus Evija is a limited production electric sports car to be manufactured by British automobile manufacturer Lotus Cars. It is the first electric vehicle to be introduced and manufactured by the company.',
  },
  {
    title: 'Maserati MC20',
    mainImage: '/images/cars/maserati_mc20_ext_1765922752896.png',
    priceUsd: 250000,
    year: 2022,
    mileage: 3000,
    transmission: 'Automatic',
    horsepower: 630,
    topSpeed: 325,
    fuelType: 'Petrol',
    condition: 'Used',
    status: 'active',
    tags: 'Sport,Italian',
    labels: '',
    descriptionMd: 'The Maserati MC20 is a two-seater, mid-engined sports car produced by Italian car manufacturer Maserati. The MC20 is the first super sports car of the brand since the MC12.',
  },
  {
    title: 'McLaren 765LT',
    mainImage: '/images/cars/mclaren_765lt_ext_1765922678094.png',
    priceUsd: 400000,
    year: 2021,
    mileage: 4000,
    transmission: 'Automatic',
    horsepower: 765,
    topSpeed: 330,
    fuelType: 'Petrol',
    condition: 'Used',
    status: 'active',
    tags: 'Track,Supercar',
    labels: '',
    descriptionMd: 'The McLaren 765LT is a limited-production version of the 720S, revealed in March 2020. It is lighter, more powerful, and has more aggressive aerodynamics than the 720S.',
  },
  {
    title: 'Pagani Huayra',
    mainImage: '/images/cars/pagani_huayra_ext_1765922798055.png',
    priceUsd: 2800000,
    year: 2018,
    mileage: 2000,
    transmission: 'Automatic',
    horsepower: 730,
    topSpeed: 370,
    fuelType: 'Petrol',
    condition: 'Used',
    status: 'active',
    tags: 'Art,Hypercar',
    labels: 'Masterpiece',
    descriptionMd: 'The Pagani Huayra is a mid-engine sports car produced by Italian sports car manufacturer Pagani, succeeding the company\'s previous offering, the Zonda. It is named after Huayra-tata, a Quechua wind god.',
  },
  {
    title: 'Porsche 911 GT3 RS',
    mainImage: '/images/cars/porsche_gt3rs_ext_1765922646949.png',
    priceUsd: 350000,
    year: 2023,
    mileage: 1500,
    transmission: 'Automatic',
    horsepower: 525,
    topSpeed: 296,
    fuelType: 'Petrol',
    condition: 'Used',
    status: 'active',
    tags: 'Track,Legend',
    labels: 'Track Ready',
    descriptionMd: 'The Porsche 911 GT3 is a high-performance homologation model of the Porsche 911 sports car. The GT3 RS is an even more track-focused version.',
  },
  {
    title: 'Rimac Nevera',
    mainImage: '/images/cars/rimac_nevera_ext_1765922765414.png',
    priceUsd: 2200000,
    year: 2023,
    mileage: 100,
    transmission: 'Automatic',
    horsepower: 1914,
    topSpeed: 412,
    fuelType: 'Electric',
    condition: 'New',
    status: 'active',
    tags: 'Electric,Hypercar',
    labels: 'Record Breaker',
    descriptionMd: 'The Rimac Nevera is an all-electric sports car designed and manufactured by the Croatian automotive manufacturer Rimac Automobili. It is claimed to be the fastest accelerating production car in the world.',
  },
  {
    title: 'Rolls-Royce Spectre',
    mainImage: '/images/cars/rr_spectre_ext_1765922664945.png',
    priceUsd: 450000,
    year: 2024,
    mileage: 50,
    transmission: 'Automatic',
    horsepower: 584,
    topSpeed: 250,
    fuelType: 'Electric',
    condition: 'New',
    status: 'active',
    tags: 'Luxury,Electric',
    labels: 'Silent',
    descriptionMd: 'The Rolls-Royce Spectre is a full-sized luxury electric grand tourer manufactured by Rolls-Royce Motor Cars. It is the first electric vehicle to be produced by the company.',
  },
];

async function main() {
  console.log(`Start seeding ${cars.length} cars...`);

  for (const car of cars) {
    const { mainImage, ...carData } = car;
    
    const createdCar = await prisma.car.create({
      data: carData,
    });

    console.log(`Created car: ${createdCar.title} with ID: ${createdCar.id}`);

    // Create Main Image
    await prisma.image.create({
      data: {
        carId: createdCar.id,
        pathOrUrl: mainImage,
        isMain: true,
        sortOrder: 0,
      },
    });

    // Create Generic Images
    for (let i = 0; i < genericImages.length; i++) {
      await prisma.image.create({
        data: {
          carId: createdCar.id,
          pathOrUrl: genericImages[i],
          isMain: false,
          sortOrder: i + 1,
        },
      });
    }
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
