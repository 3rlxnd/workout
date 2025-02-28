import { faCheck, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import useSWR, { mutate } from 'swr';

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
            <form onSubmit={handleSubmit}>
                <WorkoutsHeader>
                    <CloseButton type='button' onClick={() => {
                        setVisible(false)
                    }}><FontAwesomeIcon icon={faClose} /></CloseButton>
                    <SubmitButton type="submit"><FontAwesomeIcon icon={faCheck} /></SubmitButton>
                </WorkoutsHeader>
                <Form>
                    <NameInput name='name' type='text' placeholder={'Workout Name'} required />
                    {exerciseSelectors.map((selector, index) => (
                        <Selector key={selector}>
                            <ExerciseHeader>
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
                                <DeleteButton type='button' onClick={() => {
                                    handleDeleteSelector(selector)
                                }}><FontAwesomeIcon icon={faClose} /></DeleteButton>
                            </ExerciseHeader>


                            {selectedExercises[selector] && (
                                <ExerciseSettings>
                                    <label htmlFor={`${selector}-sets`}>Sets</label>
                                    <Input type='number' name={`${selector}-sets`} required />

                                    <label htmlFor={`${selector}-reps`}>Reps</label>
                                    <Input type='number' name={`${selector}-reps`} required />

                                    <label htmlFor={`${selector}-weight`}>Weight</label>
                                    <Input type='number' name={`${selector}-weight`} required />
                                </ExerciseSettings>
                            )}
                        </Selector>

                    ))}
                    <AddButton type="button" onClick={addSelector}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add Exercise</span>
                    </AddButton>
                </Form>
            </form>
        </PopUp>
    );
}

const ExerciseSettings = styled.div`
font-family: verdana;
display: flex;
gap: 20px;
flex-direction: column;
margin-top: 20px;
font-size: 14px;`

const WorkoutsHeader = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
position: sticky;
top: 0;
padding: 20px;
background-color: #0C0B10;; 
`

const ExerciseHeader = styled.div`
display: flex;
align-items: center;
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
const AddButton = styled.button`
display: flex;
color:rgb(193, 193, 193);
gap: 10px;
font-size: 1rem;
align-items: center;
justify-content: center;
flex-direction: row;
text-decoration: none;
background-color: #292830;
border-radius: 25px;
border: none;
padding: 10px
`

const SubmitButton = styled.button`
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

background-color:rgb(53, 52, 59);
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

const PopUp = styled.div`
position: fixed;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #0C0B10;
  top: 0;
  overflow-y: auto;
  padding-bottom: 60px;`

const Form = styled.div`
font-family: verdana;
display: flex;
padding: 20px;
gap: 20px;
flex-direction: column;`

const Selector = styled.div`
display: flex;
flex-direction: column;
text-decoration: none;
padding: 10px;
background-color: #292830;
border-radius: 30px;
border: 01px solid rgb(49, 49, 49);
`

const Select = styled.select`
font-family: verdana;
font-size: 14px;
border: unset;
color: white;
padding: 10px 15px;
border-radius: 30px;
border: none;
background-color: rgba(0, 0, 0, 0.2);
width: 80%;
appearance: none;`

const Input = styled.input`
font-family: verdana;
font-size: 1rem;
color: white;
padding: 10px;
background-color: #1E1D22;
border-radius: 10px;
border: none;`

const NameInput = styled.input`
font-family: verdana;
font-size: 1.2rem;
color: white;
padding: 0;
background-color:rgba(0, 0, 0, 0);
border: none;
padding-bottom: 10px;
margin-bottom: 20px;
border-bottom: 1px solid white;`