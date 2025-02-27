import Link from 'next/link'
import useSWR from 'swr'

export default function ExerciseList() {
  const { data, error, isLoading } = useSWR('/api/exercises')
  
  if(isLoading) return <p>Loading...</p> 
  if(error || !data) return <p>Error fetching Data</p>
  
  return (<>
      {data?.map(exercise => (
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
