import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import useSWR, { mutate } from 'swr';
import PageTitle from '../Title/Title';

export default function AddWorkout({ setVisible }) {
    const { data, error, isLoading } = useSWR('/api/exercises');
    const [exerciseSelectors, setExerciseSelectors] = useState(['exercise-0']);

    const addSelector = () => {
        setExerciseSelectors(prev => [...prev, `exercise-${prev.length}`]);
    };

    const [selectedExercises, setSelectedExercises] = useState({});

const handleSelectChange = (e, selector) => {
    setSelectedExercises(prev => ({
        ...prev,
        [selector]: e.target.value
    }));
};

function handleDeleteSelector(selector) {
    setExerciseSelectors(prev => prev.filter(exercise => exercise !== selector));
    console.log(selectedExercises)
}

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = Object.fromEntries(formData);

        const selectedExercises = exerciseSelectors.map(selector => ({
            exercise: entries[selector],
            sets: entries[`${selector}-sets`],
            reps: entries[`${selector}-reps`],
            weight: entries[`${selector}-weight`]
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
        <PopUp>
            <WorkoutsHeader>
                <PageTitle text={'New Workout'}/>
                <CloseButton onClick={() => {
                    setVisible(false)
                }}><FontAwesomeIcon icon={faClose} /></CloseButton>
            </WorkoutsHeader>
            <Form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <Input name='name' type='text' required />
                {exerciseSelectors.map((selector, index) => (
    <Selector key={selector}>
        <ExerciseHeader>
            <Subtitle htmlFor={selector}>Exercise {index + 1}</Subtitle>
            <DeleteButton onClick={() => {
                handleDeleteSelector(selector)
            }}><FontAwesomeIcon icon={faClose} /></DeleteButton>
        </ExerciseHeader>
        
        <Select 
            name={selector} 
            required 
            onChange={(e) => handleSelectChange(e, selector)}
        >
            <option value="">Select Exercise</option>
            {data && data.map(exercise => (
                <option key={exercise._id} value={exercise._id}>
                    {exercise.name}
                </option>
            ))}
        </Select>

        {/* Conditionally render inputs */}
        {selectedExercises[selector] && (
            <>
                <label htmlFor={`${selector}-sets`}>Sets</label>
                <Input type='number' name={`${selector}-sets`} required />
                
                <label htmlFor={`${selector}-reps`}>Reps</label>
                <Input type='number' name={`${selector}-reps`} required />
                
                <label htmlFor={`${selector}-weight`}>Weight</label>
                <Input type='number' name={`${selector}-weight`} required />
            </>
        )}
    </Selector>
))}
                <br />
                <button type="button" onClick={addSelector}>Add Exercise</button>
                <button type="submit">Submit</button>
            </Form>
        </PopUp>
    );
}

const WorkoutsHeader = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
`

const ExerciseHeader = styled.div`
display: flex;
justify-content: space-between;
`

const CloseButton = styled.button`
background-color: #292830;
color: white;
display: flex;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
border-radius: 50px;
border: none;
font-weight: 200;
font-size: 1rem;
`

const DeleteButton = styled.button`
background-color:rgba(41, 40, 48, 0);
color: white;
border: none;
font-weight: 200;
font-size: 1rem;
padding: 0;
`

const Title = styled.h1`
margin: 0`

const Subtitle = styled.h3`
margin: 0;
font-weight: 500;
font-size: 1rem;
`

const PopUp = styled.div`
position: fixed;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #0C0B10;
  top: 0;
  overflow-y: auto;
  padding-bottom: 60px;`

const Form = styled.form`
font-family: verdana;
padding: 20px;
display: flex;
gap: 20px;
flex-direction: column;`

const Selector = styled.div`
display: flex;
flex-direction: column;
text-decoration: none;
padding: 20px;
background: linear-gradient(to top, #292830, #232227);
border-radius: 25px;
padding-bottom: 20px;
border: 01px solid rgb(49, 49, 49)
`

const Select = styled.select`
font-family: verdana;
font-size: 1rem;
color: white;
padding: 10px;
border-radius: 10px;
margin-top: 30px;
border: none;
background-color: rgba(0, 0, 0, 0.2);`

const Input = styled.input`
font-family: verdana;
font-size: 1rem;
color: white;
padding: 10px;
background-color: #1E1D22;
border-radius: 10px;
border: none;`