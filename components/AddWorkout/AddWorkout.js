// import React, { useState } from 'react';
// import useSWR from 'swr';

// export default function AddWorkout({ setVisible }) {
//     const { data, error, isLoading } = useSWR('/api/exercises');
//     const [exerciseSelectors, setExerciseSelectors] = useState(["exercise-0"]);

//     const addSelector = () => {
//         setExerciseSelectors(prev => [...prev, `exercise-${prev.length}`]);
//     };

//     // Handle form submission
//     async function handleSubmit(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const entries = Object.fromEntries(formData);

//         // Get all selected exercises
//         // Get all selected exercises with sets and reps
//         const selectedExercises = exerciseSelectors.map(selector => ({
//             exercise: entries[selector],
//             sets: entries[`${selector}-sets`],
//             reps: entries[`${selector}-reps`]
//         })).filter(exercise => exercise);

//         const response = await fetch('/api/workouts', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ name: entries.name, exercises: selectedExercises })
//         });

//         if (!response.ok) {
//             console.log('Error creating Workout');
//         } else {
//             console.log('Workout created successfully');
//             setVisible(false);
//             event.target.reset();
//             setExerciseSelectors(["exercise-0"]);
//         }

//     }

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='name'>Name</label>
//                 <input name='name' type='text' required />

//                 {exerciseSelectors.map((selector) => (

//                     <div key={selector}>
//                         <label htmlFor={selector}>Exercise</label>
//                         <select name={selector} required>
//                             <option value="">Select Exercise</option>
//                             {data && data.map(exercise => (
//                                 <option key={exercise._id} value={exercise._id}>
//                                     {exercise.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <label htmlFor={`${selector}-sets`}>Sets</label>
//                         <input type='text' name={`${selector}-sets`} required />
//                         <label htmlFor={`${selector}-reps`}>Reps</label>
//                         <input type='text' name={`${selector}-reps`} required />
//                     </div>
//                 ))}

//                 <button type="button" onClick={addSelector}>+</button>
//                 <button type="submit">Submit</button>
//             </form>
//             <button onClick={() => setVisible(false)}>Cancel</button>
//         </>
//     );
// }

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

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
        // Get all selected exercises with sets and reps
        const selectedExercises = exerciseSelectors.map(selector => ({
            exercise: entries[selector],
            sets: entries[`${selector}-sets`],
            reps: entries[`${selector}-reps`]
        })).filter(exercise => exercise);

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
            mutate()
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
                        <input type='text' name={`${selector}-sets`} required />
                        <label htmlFor={`${selector}-reps`}>Reps</label>
                        <input type='text' name={`${selector}-reps`} required />
                    </div>
                ))}

                <button type="button" onClick={addSelector}>+</button>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => setVisible(false)}>Cancel</button>
        </>
    );
}