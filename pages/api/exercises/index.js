import exercises from '../../../lib/resources/exercises.json'

export default function handler(req, res) {
    res.status(200).json(exercises);
  }
  