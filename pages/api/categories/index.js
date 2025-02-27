import dbConnect from "@/lib/database/connect";
import Category from "@/lib/database/models/Category";

export default async function handler(req, res) {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            // Populate the exercises field to get full Exercise documents
            const category = await Category.find().populate('exercises');
            return res.status(200).json(category);
        } catch (error) {
            return res.status(404).json('Error loading Data');
        }
    }
    return res.status(405).json('Method not allowed');
}
