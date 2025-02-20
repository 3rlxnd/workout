import exercises from '../../../lib/resources/exercises.json'

export default function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query
        const exercise = exercises.find(exercise => exercise.id === id)
        res.status(200).json(exercise);
    }
}
