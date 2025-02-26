import { useState } from 'react';
import useSWR, { mutate } from 'swr';

export default function DeleteWorkout({id}) {
    
    async function handleDelete() {
        console.log(id);
        const response = await fetch('/api/workouts', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id)
        });

        if (!response.ok) {
            console.error('Error deleting Workout');
        } else {
            mutate("/api/workouts");
        }
    }

    return <button onClick={handleDelete}>Delete</button>
}