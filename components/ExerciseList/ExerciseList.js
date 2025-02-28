import Link from 'next/link'
import useSWR from 'swr'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import { useState } from 'react'
import styled from 'styled-components'

export default function ExerciseList() {
  const [filter, setFilter] = useState(null)
  const { data, error, isLoading } = useSWR('/api/exercises')

  if (isLoading) return <p>Loading...</p>
  if (error || !data) return <p>Error fetching Data</p>

  const exercises = filter
    ? filter.exercises
    : data

  return (<>
    <CategoryFilter filter={filter} setFilter={setFilter} />
    <CardContainer>
      {exercises?.map(exercise => (
        <Card href={`/exercises/${exercise._id}`} key={exercise._id}>
          <ExerciseHeader>
            <Title>{exercise.name}</Title>
          </ExerciseHeader>
          <Tags>
            {exercise.muscleGroups.map(muscle => <Tag key={muscle}><img/>{muscle}</Tag>)}
          </Tags>
        </Card>))}
    </CardContainer>
  </>
  )
}

const Tags = styled.div`
display: flex;
width: 100%;
padding-top: 20px;
gap: 10px;
flex-wrap: wrap;
font-size: 14px`

const Tag = styled.span`
background-color: grey;
padding: 5px 20px;
border-radius: 50px;`

const Title = styled.h2`
margin: 0;
font-weight: 200;
font-size: 1.2rem`

const ExerciseHeader = styled.div`
font-family: verdana;
display: flex;
gap: 20px;
justify-content: space-between;
align-items: center;`

const Card = styled.div`
display: flex;
flex-direction: column;
text-decoration: none;
padding: 20px;
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