import ExerciseList from "@/components/ExerciseList/ExerciseList";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Link href={'/workouts'}>Workouts</Link>
      <h1>Exercises</h1>
      <ExerciseList />
    </div>
  );
}
