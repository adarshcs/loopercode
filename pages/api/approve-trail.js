import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { trailName, latitude, longitude, trailType, trailUrl } = req.body;

    try {
      const newTrail = await prisma.trail.create({
        data: {
          name: trailName,
          type: trailType,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          url: trailUrl,
        },
      });
      res.status(200).json({ success: true, trail: newTrail });
    } catch (error) {
      console.error('Error saving trail to the database:', error);
      res.status(500).json({ success: false, error: 'Failed to save trail to database' });
    }
  } else if (req.method === 'GET') {
    // Handle GET request (extract parameters from URL query string)
    const { trailName, latitude, longitude, trailType, url } = req.query;

    try {
      const newTrail = await prisma.trail.create({
        data: {
          name: trailName,
          type: trailType,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          url: url,
        },
      });
      res.status(200).json({ success: true, trail: newTrail });
    } catch (error) {
      console.error('Error saving trail to the database:', error);
      res.status(500).json({ success: false, error: 'Failed to save trail to database' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
