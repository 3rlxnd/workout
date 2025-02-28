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
            <h2>{exercise.name}</h2>
            <span style={{ color: 'grey', fontWeight: 200 }}>{exercise.difficulty}</span>
          </ExerciseHeader>
          <Divider />
          <span style={{ color: 'grey', fontWeight: 200, fontSize: '14px', lineHeight: '1.25rem' }}>{exercise.description}</span>
          <Tags>
            {exercise.muscleGroups.map(muscle => <Tag key={muscle}>
              <img src={`/muscles/${muscle}.png`} alt={muscle} height={20} />
              <span>{muscle}</span>
            </Tag>)}

          </Tags>

        </Card>
      ))}
    </CardContainer>
  </>
  )
}

const Divider = styled.hr`
border: 0.5px solid grey;
width: 100%;
margin-top: -2px`

const Tags = styled.div`
display: flex;
width: 100%;
padding-top: 20px;
gap: 10px;
flex-wrap: wrap;
font-size: 14px`

const Tag = styled.span`
background-color: #1E1D22;
display: flex;
gap: 10px;
color:gray;
font-size: 14px;
align-items: center;
padding: 5px 10px 5px 5px;
border-radius: 50px;`

const ExerciseHeader = styled.div`
display: flex;
gap: 20px;
justify-content: space-between;
align-items: center;`

const Card = styled(Link)`
display: flex;
color: white;
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