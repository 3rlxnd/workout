import workouts from '../../../lib/resources/workouts.json'

export default function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json(workouts);
  if (req.method === 'POST') {
    const { name, workouts } = req.body
    console.log(req.body);
    return res.status(200).json('Created Workout');
  }
  return res.status(405).json('Method not allowed')
}