import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

export default function WorkoutList() {
  const { data, error, isLoading, mutate } = useSWR('/api/workouts');

  if (isLoading) return <p>Loading...</p>
  if (error || !data) return <p>Error fetching Data</p>

  async function handleDelete(id) {
    const response = await fetch(`/api/workouts/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      console.error('Error deleting Workout');
    } else {
      mutate();
    }
  }

  
  return (<CardContainer>
    {data.map(workout => (<>
        <h2>{workout.name}</h2>
      <Card key={workout._id}>
        <ListContainer>
          {workout.exercises.map(({ exercise, sets, reps }) => (<>
            <ListItem key={exercise._id}>
              <p>{exercise.name}</p>
              <p>Sets: {sets}</p>
              <p>Reps: {reps}</p>
            </ListItem>
              <hr/>
              </>
          ))}
        </ListContainer>
        <Buttons>

        <button onClick={() => handleDelete(workout._id)}>Delete</button>
        </Buttons>
      </Card>
      </>))}
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