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
      await Workout.create({name: name, exercises: exercises});
      return res.status(201).json('Created Workout');
    } catch (error) {
      return res.status(500).json('Error creating Workout');
    }
  }
  if (req.method === 'DELETE') {
    try {
      await Workout.findByIdAndDelete(req.body);
      return res.status(200).json('Deleted Workout');
    } catch (error) {
      return res.status(500).json('Error deleting Workout');
    }
  }
  return res.status(405).json('Method not allowed')
}