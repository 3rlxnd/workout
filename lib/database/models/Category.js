import mongoose from 'mongoose';
import Exercise from './Exercise';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
