import { useState } from 'react';
import useSWR, { mutate } from 'swr';

export default function AddWorkout({ setVisible }) {
    const { data, error, isLoading } = useSWR('/api/exercises');
    const [exerciseSelectors, setExerciseSelectors] = useState(["exercise-0"]);

    const addSelector = () => {
        setExerciseSelectors(prev => [...prev, `exercise-${prev.length}`]);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = Object.fromEntries(formData);

        const selectedExercises = exerciseSelectors.map(selector => ({
            exercise: entries[selector],
            sets: entries[`${selector}-sets`],
            reps: entries[`${selector}-reps`]
        })).filter(exercise => exercise.exercise);

        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: entries.name, exercises: selectedExercises })
        });

        if (!response.ok) {
            console.error('Error creating Workout');
        } else {
            setVisible(false);
            event.target.reset();
            setExerciseSelectors(["exercise-0"]);
            mutate("/api/workouts");
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input name='name' type='text' required />
                {exerciseSelectors.map((selector) => (
                    <div key={selector}>
                        <label htmlFor={selector}>Exercise</label>
                        <select name={selector} required>
                            <option value="">Select Exercise</option>
                            {data && data.map(exercise => (
                                <option key={exercise._id} value={exercise._id}>
                                    {exercise.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor={`${selector}-sets`}>Sets</label>
                        <input type='number' name={`${selector}-sets`} required />
                        <label htmlFor={`${selector}-reps`}>Reps</label>
                        <input type='number' name={`${selector}-reps`} required />
                    </div>
                ))}
                <button type="button" onClick={addSelector}>+</button>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => setVisible(false)}>Cancel</button>
        </>
    );
}