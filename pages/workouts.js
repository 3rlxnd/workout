import AddWorkout from "@/components/AddWorkout/AddWorkout";
import BackButtton from "@/components/BackButton/BackButtton";
import ExerciseList from "@/components/ExerciseList/ExerciseList";
import WorkoutList from "@/components/WorkoutList/WorkoutList";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <BackButtton />
            <button onClick={() => setVisible(true)}>Add Workout</button>
            {visible && <AddWorkout setVisible={setVisible}/>}
            <h1>Workouts</h1>
            <WorkoutList/>
        </div>
    );
}
