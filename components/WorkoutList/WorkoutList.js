import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

export default function WorkoutList() {
  const { data, error, isLoading } = useSWR('/api/workouts')
  
  if( isLoading) return <p>Loading...</p>
  if( error) return <p>Error fetching Data</p>
  


return (<>
    {data?.map(workout => (
      <div key={workout.id}>
        <h2>{workout.name}</h2>
        <ul>
          {workout.exercises.map((exercise, index) => <li key={index}>
              <p>{exercise.exerciseId}</p>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              </li>)}
        </ul>
      </div>))}
</>
)
}