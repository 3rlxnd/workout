import React, { useState } from 'react';
import useSWR from 'swr';

export default function AddWorkout({ setVisible }) {
    const { data, error, isLoading } = useSWR('/api/exercises');
    const [exerciseSelectors, setExerciseSelectors] = useState(["exercise-0"]);

    const addSelector = () => {
        setExerciseSelectors(prev => [...prev, `exercise-${prev.length}`]);
    };

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = Object.fromEntries(formData);

        // Get all selected exercises
        const selectedExercises = exerciseSelectors.map(selector => entries[selector]).filter(value => value);

        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: entries.name, exercises: selectedExercises })
        });

        if (!response.ok) {
            console.log('Error creating Workout');
        } else {
            console.log('Workout created successfully');
            setVisible(false);
            event.target.reset();
            setExerciseSelectors(["exercise-0"]);
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
                                        <option key={exercise.id} value={exercise.name}>
                                            {exercise.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        <button type="button" onClick={addSelector}>+</button>
                        <button type="submit">Submit</button>
                    </form>
                    <button onClick={() => setVisible(false)}>Cancel</button>
        </>
    );
}