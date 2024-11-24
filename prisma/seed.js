const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const hotels = [
    {
      name: "Taj Mahal Palace",
      location: { latitude: 18.921984, longitude: 72.833117 },
      ratesSummary: { minPrice: "15000.00" },
    },
    {
      name: "Leela Palace Bengaluru",
      location: { latitude: 12.9611159, longitude: 77.6481536 },
      ratesSummary: { minPrice: "12000.00" },
    },
    {
      name: "Oberoi Amarvilas",
      location: { latitude: 27.175255, longitude: 78.042155 },
      ratesSummary: { minPrice: "20000.00" },
    },
    {
      name: "ITC Maurya",
      location: { latitude: 28.610712, longitude: 77.191768 },
      ratesSummary: { minPrice: "11000.00" },
    },
    {
      name: "Umaid Bhawan Palace",
      location: { latitude: 26.297867, longitude: 73.027233 },
      ratesSummary: { minPrice: "25000.00" },
    },
    {
      name: "Marriott Kochi",
      location: { latitude: 10.026816, longitude: 76.308387 },
      ratesSummary: { minPrice: "8000.00" },
    },
    {
      name: "Hyatt Regency Chennai",
      location: { latitude: 13.035422, longitude: 80.252928 },
      ratesSummary: { minPrice: "7000.00" },
    },
    {
      name: "Radisson Blu Jaipur",
      location: { latitude: 26.841028, longitude: 75.802759 },
      ratesSummary: { minPrice: "9000.00" },
    },
    {
      name: "Novotel Goa Resort",
      location: { latitude: 15.516578, longitude: 73.768106 },
      ratesSummary: { minPrice: "10000.00" },
    },
    {
      name: "Vivanta by Taj Guwahati",
      location: { latitude: 26.143217, longitude: 91.736236 },
      ratesSummary: { minPrice: "9500.00" },
    },
  ];

  for (const hotel of hotels) {
    await prisma.hotel.create({
      data: {
        name: hotel.name,
        location: {
          create: {
            latitude: hotel.location.latitude,
            longitude: hotel.location.longitude,
          },
        },
        ratesSummary: {
          create: {
            minPrice: hotel.ratesSummary.minPrice,
          },
        },
      },
    });
  }

  console.log(
    "Seed data with 10 hotels in India has been inserted successfully!",
  );
}

main()
  .catch((e) => {
    console.error("Error while seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
