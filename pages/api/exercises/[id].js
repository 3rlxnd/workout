import dbConnect from '@/lib/database/connect';
import Exercise from '@/lib/database/models/Exercise';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await dbConnect()
            const { id } = req.query
            const exercise = await Exercise.findById(id)
            console.log(exercise);

            return res.status(200).json(exercise);
        } catch (error) {
            return res.status(404).json('Error loading Data');
        }
    }

    return res.status(405).json('Method not allowed')
}
