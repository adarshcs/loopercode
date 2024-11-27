
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const trails = [
    {
      name: "Test Trail",
      latitude: 18.921984, 
      longitude: 72.833117,
      type: "Red",
      url: "https://www.instagram.com/reel/DCa-nbkSqRR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",  
    },
  ];

  for (const trail of trails) {
    await prisma.trail.create({
      data: {
        name: trail.name,
        latitude: trail.latitude,
        longitude: trail.longitude,
        type: trail.type,
        url: trail.url,
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
