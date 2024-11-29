import { prisma } from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

      console.log('Trails from DB in trails.ts',trails);
      
    res.status(200).json(trails);
  } catch (error) {
    console.error('Error fetching trails:', error); // Log the error to the console
    res.status(500).json({ error: "Failed to fetch trails" });
  } finally {
    await prisma.$disconnect();
  }
}
