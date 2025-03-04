import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Loader from "../Loader/Loader";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { uid } from "uid";

export default function WorkoutForm({ setVisible, workout, setWorkout }) {


    const { data, error, isLoading } = useSWR('/api/exercises');
    const [selectors, setSelectors] = useState(workout ? workout.exercises : [{ _id: uid(), exercise: null, reps: null, sets: null, weight: null }]);

    if (isLoading) return <Loader />;
    if (error || !data) return <p>Error fetching Data</p>;

    const addSelector = () => {
        setSelectors(prev => [...prev, { _id: uid(), exercise: null, reps: null, sets: null }]);
    };

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

    function handleDeleteSelector(selector) {
        setSelectors(prev => prev.filter(exercise => exercise !== selector));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = Object.fromEntries(formData);

        console.log(entries); 
        
        const updatedExercises = selectors.map(selector => ({
            exercise: entries[selector._id],  
            sets: parseInt(entries[`${selector._id}-sets`], 10) || 0,
            reps: parseInt(entries[`${selector._id}-reps`], 10) || 0,
            weight: entries[`${selector._id}-weight`] || null
        })).filter(exercise => exercise.exercise); 

       
        
        if (updatedExercises.length === 0) return

        console.log(updatedExercises); 

        const response = await fetch(workout ? `/api/workouts/${workout._id}` : '/api/workouts', {
            method: workout ? 'PUT' : 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: entries.name,
                exercises: updatedExercises
            })
        });

        if (!response.ok) {
            console.error('Error saving Workout');
        } else {
            setVisible(false);
            event.target.reset();
            if (setWorkout) setWorkout(null)
            mutate("/api/workouts");
        }
    }


    return (
        <PopUp>
            <form onSubmit={handleSubmit}>
                <WorkoutsHeader>
                    <Button type='button' onClick={() => {
                        setVisible(false)
                        if (setWorkout) setWorkout(null)
                    }}><FontAwesomeIcon icon={faClose} /></Button>
                    <Button type="submit"><FontAwesomeIcon icon={faCheck} /></Button>
                </WorkoutsHeader>
                <Form>
                    <NameInput name='name' type='text' placeholder={'Workout Name'} required defaultValue={workout?.name || ''} />
                    {selectors.map((selector) => (
                        <Selector key={selector._id}>
                            <ExerciseHeader>

                                <Select
                                    name={selector._id}
                                    required
                                    defaultValue={selector.exercise?._id || ''}
                                >
                                    <option value="">Select Exercise</option>
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
                            <ExerciseSettings>
                                <Input type='number' name={`${selector._id}-sets`} placeholder='Sets' required defaultValue={workout ? selector.sets : null} />
                                <Input type='number' name={`${selector._id}-reps`} placeholder='Reps' required defaultValue={workout ? selector.reps : null} />
                                <Input type='number' name={`${selector._id}-weight`} placeholder='Weight (optional)' defaultValue={workout ? selector.weight : null} />
                            </ExerciseSettings>
                        </Selector>
                    ))}
                    {selectors < 1 && <span>Please select an Exercises</span>}
                    <AddButton type="button" onClick={addSelector}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add Exercise</span>
                    </AddButton>
                    {workout && <>
                    <Divider/>
                    <DeleteButton onClick={() => handleDelete(workout._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Delete Exercise</span>
                    </DeleteButton>
                    </>}
                </Form>
            </form>
        </PopUp>
    );
}

const Divider = styled.span`
border-bottom: 0.5px solid grey;
width: 100%`

const DeleteButton = styled.button`
display: flex;
color:rgb(255, 81, 81);
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
color:rgb(255, 255, 255);
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
border-bottom: 0.5px solid grey;`