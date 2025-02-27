import { useState } from 'react';
import styled from 'styled-components';
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

    document.body.style.overflow = 'hidden';

    return (
        <PopUp>
            <h2>Add Workout</h2>
            <Form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <Input name='name' type='text' required />
                {exerciseSelectors.map((selector) => (
                    <Selector key={selector}>
                        {/* <h3 htmlFor={selector}>Exercise {Number(selector.split('-')[1]) + 1}</h3> */}
                        <Select name={selector} required>
                            <option value="">Select Exercise</option>
                            {data && data.map(exercise => (
                                <option key={exercise._id} value={exercise._id}>
                                    {exercise.name}
                                </option>
                            ))}
                        </Select>
                        <label htmlFor={`${selector}-sets`}>Sets</label>
                        <Input type='number' name={`${selector}-sets`} required />
                        <label htmlFor={`${selector}-reps`}>Reps</label>
                        <Input type='number' name={`${selector}-reps`} required />
                    </Selector>
                ))}
                <br/>
                <button type="button" onClick={addSelector}>Add Exercise</button>
                <button type="submit">Submit</button>
            </Form>
            <button onClick={() => {
                setVisible(false)
                document.body.style.overflow = '';
            }}>Cancel</button>
        </PopUp>
    );
}

const PopUp = styled.div`
position: fixed;
bottom: 0;
padding: 20px;
flex-direction: column;
height: 90vh;
width: 100%;
background-color: white;
margin-bottom: 80px;
overflow-y: auto;`

const Form = styled.form`
display: flex;
flex-direction: column;`

const Selector = styled.div`
display: flex;
flex-direction: column;
padding: 20px;
border-radius: 10px;
border: 1px solid lightgray;`

const Select = styled.select`
font-family: verdana;
font-size: 1rem;
padding: 10px;
border-radius: 10px;
border: 1px solid lightgray;`

const Input = styled.input`
font-family: verdana;
font-size: 1rem;
padding: 10px;
border-radius: 10px;
border: 1px solid lightgray;`
