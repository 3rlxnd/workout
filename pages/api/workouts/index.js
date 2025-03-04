import dbConnect from '@/lib/database/connect';
import Workout from '@/lib/database/models/Workout';

export default async function handler(req, res) {
  await dbConnect()
  if (req.method === 'GET') {
    try {
      const workouts = await Workout.find().populate('exercises.exercise')
      return res.status(200).json(workouts)
    } catch (error) {
      return res.status(500).json('Error fetching Data');
    }
  }
  if (req.method === 'POST') {
    try {
      const { name, exercises } = req.body
      console.log(req.body);
      
      await Workout.create(req.body);
      return res.status(201).json('Created Workout');
    } catch (error) {
      return res.status(500).json('Error creating Workout');
    }
  }
  return res.status(405).json('Method not allowed')
}