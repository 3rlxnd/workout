import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroups: [{ type: String }],
  imageUrl: { type: String },
  instructions: [{ type: String }]
});

const Exercise = mongoose.models.Exercise || mongoose.model("Exercise", exerciseSchema);

export default Exercise;
