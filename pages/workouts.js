import BackButtton from "@/components/BackButton/BackButtton";
import ExerciseList from "@/components/ExerciseList/ExerciseList";
import WorkoutList from "@/components/WorkoutList/WorkoutList";
import Link from "next/link";

export default function HomePage() {
    return (
        <div>
            <BackButtton />
            <h1>Workouts</h1>
            <WorkoutList/>
        </div>
    );
}
