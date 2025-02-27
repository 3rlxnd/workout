import Link from 'next/link'
import useSWR from 'swr'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import { useState } from 'react'
import styled from 'styled-components'

export default function ExerciseList() {
  const [ filter, setFilter ] = useState(null)
  const { data, error, isLoading } = useSWR('/api/exercises')
  
  if(isLoading) return <p>Loading...</p> 
  if(error || !data) return <p>Error fetching Data</p>

  const exercises = filter 
  ? filter.exercises 
  : data

  return (<>
  <CategoryFilter filter={filter} setFilter={setFilter}/>
  <CardContainer>
      {exercises?.map(exercise => (
        <Card href={`/exercises/${exercise._id}`} key={exercise._id}>
          <h2>{exercise.name}</h2>
          <img src={exercise.imageUrl} width={120} height={200} />
          <ul>
            {exercise.muscleGroups.map(muscle => <li key={muscle}>{muscle}</li>)}
          </ul>
        </Card>))}
        </CardContainer>
  </>
  )
}

const Card = styled.div`
display: flex;
flex-direction: column;
text-decoration: none;
padding: 0 20px;
background: linear-gradient(to top, #292830, #232227);
border-radius: 25px;
padding-bottom: 20px;
border: 01px solid rgb(49, 49, 49)
`;

const CardContainer = styled.div`
display: flex;
padding: 20px;
gap: 20px;
flex-direction: column;
margin-bottom: 80px
`;