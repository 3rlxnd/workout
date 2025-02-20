import workouts from '../../../lib/resources/workouts.json'

export default function handler(req, res) {
    res.status(200).json(workouts);
  }
  