import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

export default function ExerciseList() {
  const { data, error, isLoading } = useSWR('/api/exercises')
  
  if( isLoading) return <p>Loading...</p>
  if( error) return <p>Error fetching Data</p>
  
  return (<>
      {data?.map(exercise => (
        <Link href={`/exercises/${exercise.id}`} key={exercise.id}>
          <h2>{exercise.name}</h2>
          <img src={exercise.imageUrl} width={120} height={200} />
          <ul>
            {exercise.muscleGroups.map((muscle, index) => <li key={index}>{muscle}</li>)}
          </ul>
        </Link>))}
  </>
  )
}
