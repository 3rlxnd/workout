import dbConnect from '@/lib/database/connect';
import Workout from '@/lib/database/models/Workout';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await dbConnect()
            const { id } = req.query
            const workout = await Workout.findById(id).populate({
                path: 'exercises.exercise', // Nested populate
                model: 'Exercise'
            });
            
            return res.status(200).json(workout);
        } catch (error) {
            return res.status(404).json('Error loading Data');
        }
    }

    return res.status(405).json('Method not allowed')
}
