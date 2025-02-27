
export default function WorkoutList() {
  const { data, error, isLoading } = useSWR('/api/workouts')

  if (isLoading) return <p>Loading...</p>
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

  return (<>
    {data.map(workout => (
      <div key={workout._id}>
        <h2>{workout.name}</h2>
        <ul>
          {workout.exercises.map(({ exercise, sets, reps }) => (
            <li key={exercise._id}>
              <p>{exercise.name}</p>
              <p>Sets: {sets}</p>
              <p>Reps: {reps}</p>
            </li>
          ))}
        </ul>
        <button onClick={() => handleDelete(workout._id)}>Delete</button>
      </div>))}
  </>
  )
}