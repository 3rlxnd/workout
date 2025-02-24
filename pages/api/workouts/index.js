import workouts from '../../../lib/resources/workouts.json'

export default function handler(req, res) {
  if (req.method === 'GET') res.status(200).json(workouts);
  if (req.method === 'POST') {
    const { name, workouts } = req.body
    console.log(req.body);
    res.status(200).json('Created Workout');
  }
}