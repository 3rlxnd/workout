import Link from 'next/link'
import useSWR from 'swr'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import { useState } from 'react'

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
      {exercises?.map(exercise => (
        <Link href={`/exercises/${exercise._id}`} key={exercise._id}>
          <h2>{exercise.name}</h2>
          <img src={exercise.imageUrl} width={120} height={200} />
          <ul>
            {exercise.muscleGroups.map(muscle => <li key={muscle}>{muscle}</li>)}
          </ul>
        </Link>))}
  </>
  )
}
