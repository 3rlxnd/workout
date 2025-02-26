import dbConnect from '@/lib/database/connect';
import Exercise from '@/lib/database/models/Exercise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await dbConnect()
    try {
      const exercises = await Exercise.find()
      return res.status(200).json(exercises);
    } catch (error) {
      return res.status(404).json('Error loading Data');
    }
  }

  return res.status(405).json('Method not allowed')
}
