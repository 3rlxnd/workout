import dbConnect from '@/lib/database/connect';
import Workout from '@/lib/database/models/Workout';

export default async function handler(req, res) {
    await dbConnect()
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
    if (req.method === 'DELETE') {
        const { id } = req.query
        try {
            await Workout.findByIdAndDelete(id);
            return res.status(200).json('Deleted Workout');
        } catch (error) {
            return res.status(500).json('Error deleting Workout');
        }
    }
    return res.status(405).json('Method not allowed')
}