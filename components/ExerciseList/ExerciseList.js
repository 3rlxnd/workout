import Link from 'next/link'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

export default function ExerciseList() {
  const { data, error, isLoading } = useSWR('/api/exercises')

  if (isLoading) return <p>Loading...</p>
  if (error || !data) return <p>Error fetching Data</p>

  return (<CardContainer>
    {data?.map(exercise => (<Fragment key={exercise._id}>
      <Card href={`/exercises/${exercise._id}`} key={exercise._id}>
        <h2>{exercise.name}</h2>
        <img src={exercise.imageUrl} width={120} height={200} />
        <ul>
          {exercise.muscleGroups.map(muscle => <li key={muscle}><img src={`/muscles/${muscle}.png`} height={20} />{muscle}</li>)}
        </ul>
      </Card>
      <hr></hr>
    </Fragment>
    ))}
  </CardContainer>
  )
}

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

const CardContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 0px;
  flex-direction: column;
  margin-bottom: 80px
`;