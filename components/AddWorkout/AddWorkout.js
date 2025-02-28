import { faCheck, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
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
            <form onSubmit={handleSubmit}>
                <WorkoutsHeader>

                    <CloseButton type='button' onClick={() => {
                        setVisible(false)
                    }}><FontAwesomeIcon icon={faClose} /></CloseButton>

                    <SubmitButton type="submit"><FontAwesomeIcon icon={faCheck}/></SubmitButton>
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
                {/* <CloseButton onClick={() => {
                    setVisible(false)
                }}><FontAwesomeIcon icon={faCheck} /></CloseButton>
                 */}
                {/* <SubmitButton type="submit">Save</SubmitButton> */}
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
background-color: black; 
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
// background: linear-gradient(to top, #292830, #232227);
background-color: #292830;
border-radius: 25px;
border: 01px solid rgb(49, 49, 49);
`

const Select = styled.select`
font-family: verdana;
font-size: 14px;
border: unset;
color: white;
padding: 10px;
border-radius: 15px;
border: none;
background-color: rgba(0, 0, 0, 0.2);
width: 250px;

appearance: none;
//   background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
//   background-repeat: no-repeat;
//   background-position: right 0.7rem top 50%;
//   background-size: 0.65rem auto;
  `

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