import BackButtton from "@/components/BackButton/BackButtton";
import ExerciseDetails from "@/components/ExerciseDetails/ExerciseDetails";
import ExerciseList from "@/components/ExerciseList/ExerciseList";
import Link from "next/link";

export default function Exercise() {
  return (
    <div>
      <BackButtton/>
      <ExerciseDetails/>
    </div>
  );
}
