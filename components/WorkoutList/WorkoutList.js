import useSWR, { mutate } from 'swr'
import Link from 'next/link'
import styled from 'styled-components'
import { Fragment } from 'react'

export default function WorkoutList() {
  const { data, error, isLoading } = useSWR('/api/workouts')

  async function handleDelete(id) {
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

  if (isLoading) return <p>Loading...</p>
  if (error || !data) return <p>Error fetching Data</p>

  return (<CardContainer>
    {data.map(workout => (<Fragment key={workout._id}>
        <h2>{workout.name}</h2>
      <Card key={workout._id}>
        <ListContainer>
          {workout.exercises.map(({ exercise, sets, reps }) => (<Fragment key={exercise._id}>
            <ListItem>
              <h3>{exercise.name}</h3>
              <p>Sets: {sets}</p>
              <p>Reps: {reps}</p>
            </ListItem>
            <hr></hr>
          </Fragment>
          ))}
        </ListContainer>
        <Buttons>
          <DeleteButton onClick={() => handleDelete(workout._id)}>Delete</DeleteButton>
          <StartButton href={`training/${workout._id}`}>Start</StartButton>
        </Buttons>
      </Card>
      </Fragment>))}
  </CardContainer>
  )
}

const Buttons = styled.div`
display: flex;
justify-content: flex-end;
gap: 10px`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  padding: 0 20px;
  background-color:rgb(240, 240, 240);
  border-radius: 10px;
  padding-bottom: 20px
`;

const CardContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 0px;
  flex-direction: column;
  margin-bottom: 80px
`;

const ListContainer = styled.ul`
list-style: none;
padding: 0
`

const ListItem = styled.li`
display: flex;
align-items: center;
justify-content: space-between`

const DeleteButton = styled.button`
border: 1px solid red;
background-color: lightred;
color: red;
font-family: verdana;
font-size: 1rem;
padding: 10px 20px;
border-radius: 5px`

const StartButton = styled(Link)`
background-color:rgb(0, 185, 213);
font-size: 1rem;
padding: 10px 20px;
border-radius: 5px;
text-decoration: none;
display: flex;
color: white;
justify-content: center`