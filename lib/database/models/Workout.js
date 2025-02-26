import mongoose from 'mongoose';
import Exercise from './Exercise';

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ 
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true }
  }]
});

const Workout = mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
