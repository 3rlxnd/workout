import styled from "styled-components"

export default function Selector({selector}) {
    return (
        <SelectorContainer key={selector._id}>
            <ExerciseHeader>

                <Select
                    id={selector._id}
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
        </SelectorContainer>
    )
}

const ExerciseSettings = styled.div`
font-family: verdana;
display: flex;
gap: 20px;
flex-direction: column;
margin-top: 20px;
font-size: 14px;`

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

const SelectorContainer = styled.div`
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