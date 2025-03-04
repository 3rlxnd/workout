import { faCheck, faClose, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import useSWR, { mutate } from 'swr';
import Loader from '../Loader/Loader';

export default function WorkoutForm({ workout, setVisible, setWorkout }) {
    const { data, error, isLoading } = useSWR('/api/exercises');
    const [exerciseSelectors, setExerciseSelectors] = useState(workout ? workout.exercises : []);
    const [selectedExercises, setSelectedExercises] = useState({});

    if (isLoading) return <Loader />
    if (error || !data) return <p>Error fetching Data</p>

    const addSelector = () => {
        setExerciseSelectors(prev => [...prev, { id: `exercise-${prev.length}`, workout: null, sets: 1, reps: 3, weight: null }]);
        console.log(exerciseSelectors);

    };


    const handleSelectChange = (e, selectorId) => {
        setSelectedExercises(prev => ({
            ...prev,
            [selectorId]: e.target.value
        }));
    };

    function handleDeleteSelector(selector) {
        setExerciseSelectors(prev => prev.filter(exercise => exercise !== selector));
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

    async function handleDelete(id) {
        const response = await fetch(`/api/workouts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            console.error('Error deleting Workout');
        } else {
            mutate('/api/workouts');
            setVisible(false)
            if (workout) setWorkout(null)
        }
    }

    return (
        <PopUp>
            <form onSubmit={handleSubmit}>
                <WorkoutsHeader>
                    <Button type='button' onClick={() => {
                        setVisible(false)
                        if (workout) setWorkout(null)
                    }}><FontAwesomeIcon icon={faClose} /></Button>
                    <Button type="submit"><FontAwesomeIcon icon={faCheck} /></Button>
                </WorkoutsHeader>
                <Form>
                    {workout ?
                        <NameInput name='name' type='text' defaultValue={workout ? workout.name : 'Workout Name'} required /> :
                        <NameInput name='name' type='text' placeholder={'Workout Name'} required />
                    }
                    {exerciseSelectors.map((selector) => (
                        <Selector key={selector.id}>
                            {workout && console.log(selector)}
                            <ExerciseHeader>
                                <Select
                                    name={`exercise-${selector.id}`}
                                    required
                                    value={selectedExercises[selector.id] || ''}
                                    onChange={(e) => handleSelectChange(e, selector.id)}
                                >

                                    <option value="">{workout ? selector.exercise.name : 'Select Exercise'}</option>
                                    {data && data.map(exercise => (
                                        <option key={exercise._id} value={exercise._id}>
                                            {exercise.name}
                                        </option>
                                    ))}
                                </Select>
                                <Button $dark type='button' onClick={() => {
                                    handleDeleteSelector(selector)
                                }}><FontAwesomeIcon icon={faClose} /></Button>
                            </ExerciseHeader>


                            {selectedExercises[selector.id] && (
                                <ExerciseSettings>
                                    <Input type='number' name={`${selector.id}-sets`} placeholder='Sets' required />
                                    <Input type='number' name={`${selector.id}-reps`} placeholder='Reps' required />
                                    <Input type='number' name={`${selector.id}-weight`} placeholder='Weight' required />
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
            {workout && <DeleteButton onClick={() => handleDelete(workout._id)}>
                <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>}
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
background-color:rgb(25, 24, 28);
`

const ExerciseHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Button = styled.button`
background-color: ${(props) => (props.$dark ? "rgba(0, 0, 0, 0.2)" : "#292830")};
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

const DeleteButton = styled.button`
display: flex;
color:rgb(193, 193, 193);
gap: 10px;
margin: 0px 20px;
font-size: 14px;
width: 40px;
height: 40px;
align-items: center;
justify-content: center;
flex-direction: row;
text-decoration: none;
text-decoration: none;
background-color: #292830;
border-radius: 25px;
border: none;`

const PopUp = styled.div`
position: fixed;
  flex-direction: column;
  height: 100vh;
  width: 100%;
background-color:rgb(25, 24, 28);
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
font-size: 1rem;
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
border-radius: 30px;
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