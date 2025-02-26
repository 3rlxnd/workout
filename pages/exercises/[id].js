import ExerciseDetails from "@/components/ExerciseDetails/ExerciseDetails";
import Link from "next/link";

export default function Exercise() {
  return (
    <div>
      <Link href={'/'}>Back</Link>
      <ExerciseDetails/>
    </div>
  );
}
