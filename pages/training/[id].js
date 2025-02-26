import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Start() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(`/api/workouts/${id}`);
  const [current, setCurrent] = useState(0);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error fetching Data</p>;

  const exercise = data.exercises[current].exercise;

  return (
    <>
      <Link href={'/workouts'}>Back</Link>
      <h1>{data.name}</h1>
      <div>
        {exercise.name}
        <p>Reps: {data.exercises[current].reps}</p>
        <p>Sets: {data.exercises[current].sets}</p>
        <div>
          <ol>
            {exercise.instructions.map(instruction => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </div>
        {current < data.exercises.length - 1 ? 
        <button onClick={() => setCurrent(prev => prev + 1)}>Next</button> :
        <Link href={'/workouts'}>Done</Link>
        }
      </div>
    </>
  );
}
