import { faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Fragment } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Loader from "../Loader/Loader";

export default function WorkoutList() {
  const { data, error, isLoading, mutate } = useSWR('/api/workouts');

  if (isLoading) return <Loader />
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
    {data.map(workout => (
      <Card key={workout._id}>
        <WorkoutHeader>
          <Title>{workout.name}</Title>
          <DeleteButton onClick={() => handleDelete(workout._id)}><FontAwesomeIcon icon={faTrash} /></DeleteButton>
        </WorkoutHeader>
        <ListContainer>
          {workout.exercises.map(({ exercise, sets, reps, weight }, index) => (<Fragment key={exercise._id}>
            <ListItem>
              <Textwrapper $left>
                <Text>{exercise.name}</Text>
                {weight && <Text $grey>{exercise.difficulty}</Text>}
              </Textwrapper>
              <Textwrapper>
                <Text>{sets} x {reps}</Text>
                {weight && <Text $grey>{weight}kg</Text>}
              </Textwrapper>
            </ListItem>
            {index < workout.exercises.length - 1 && <Divider />}
          </Fragment>
          ))}
        </ListContainer>
        <StartButton href={`workouts/${workout._id}`}>
          <p>Start Workout</p>
          <FontAwesomeIcon icon={faPlay} />
        </StartButton>
      </Card>))}
  </CardContainer>
  )
}

const WorkoutHeader = styled.div`
display: flex;
justify-content: space-between;
`

const Textwrapper = styled.div`
text-align: ${(props) => (props.$left ? "left" : "right")};
margin: 0;
display: flex;
gap: 5px;
flex-direction: column;`

const Text = styled.span`
color: ${(props) => (props.$grey ? "grey" : "white")};
margin: 0;
font-weight: 200;`

const Title = styled.h2`
margin: 0;`

const Card = styled.div`
display: flex;
flex-direction: column;
text-decoration: none;
padding: 20px;
gap: 20px;
background: linear-gradient(to top, #292830, #232227);
border-radius: 25px;
border: 01px solid rgb(49, 49, 49)
`;

const CardContainer = styled.div`
display: flex;
padding: 20px;
gap: 20px;
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

const Divider = styled.hr`
border: 0.5px solid black`

const DeleteButton = styled.button`
display: flex;
color:rgb(193, 193, 193);
gap: 10px;
font-size: 14px;
align-items: center;
justify-content: center;
flex-direction: row;
text-decoration: none;
background-color: rgba(0, 0, 0, 0.2);
border-radius: 25px;
border: none;
padding: 10px
`

const StartButton = styled(Link)`
background: linear-gradient(to top, lightblue,rgb(154, 209, 225));
font-size: 1rem;
height: 40px;
padding: 10px 20px;
border-radius: 30px;
text-decoration: none;
display: flex;
gap: 10px;
color: black;
justify-content: center;
align-items: center;
`