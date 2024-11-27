import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    
    // Fetch all trails with their locations
    const trails = await prisma.trail.findMany({
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
          type: true,
          url: true,
        },
      });
      
    res.status(200).json(trails);
  } catch (error) {
    console.error('Error fetching trails:', error); // Log the error to the console
    res.status(500).json({ error: "Failed to fetch trails" });
  } finally {
    await prisma.$disconnect();
  }
}
