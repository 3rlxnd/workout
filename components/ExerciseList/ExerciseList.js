import Link from 'next/link'
import useSWR from 'swr'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import { useState } from 'react'
import styled from 'styled-components'
import Loader from '../Loader/Loader'
import SearchBar from '../SearchBar/SearchBar'

export default function ExerciseList() {
  const [filter, setFilter] = useState(null)
  const [search, setSearch] = useState('')
  const { data, error, isLoading } = useSWR('/api/exercises')

  if (isLoading) return <Loader />
  if (error || !data) return <p>Error fetching Data</p>

  const filtered = (array) => {
    return array.filter(exercise => exercise.name.toLowerCase().includes(search.toLowerCase()))
  }

  const exercises = filter
    ? filtered(filter.exercises)
    : filtered(data)

  return (<>
    <SearchBar setSearch={setSearch} />
    <CategoryFilter filter={filter} setFilter={setFilter} />
    <CardContainer>
      {exercises.map(exercise => (
        <Card href={`/exercises/${exercise._id}`} key={exercise._id}>
          <ExerciseHeader>
            <h2>{exercise.name}</h2>
            <Difficulty>{exercise.difficulty}</Difficulty>
          </ExerciseHeader>
          <Description>{exercise.description}</Description>
          <Divider />
          <Tags>
            {exercise.muscleGroups.map(muscle => <Tag key={muscle}>
              <span>{muscle}</span>
            </Tag>)}

          </Tags>

        </Card>
      ))}
    </CardContainer>
  </>
  )
}

const Difficulty = styled.span`
color: grey; 
font-weight: 200;
`

const Description = styled.span`
color: grey; 
font-weight: 200; 
font-size: 14px, line-height: 1.25rem;
`

const Divider = styled.hr`
border: 0.5px solid black;
width: 100%;
margin-top: 25px`

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
padding: 5px 10px;
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