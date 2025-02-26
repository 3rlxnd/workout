import AddWorkout from "@/components/AddWorkout/AddWorkout";
import Footer from "@/components/Footer/Footer";
import WorkoutList from "@/components/WorkoutList/WorkoutList";
import Link from "next/link";
import { useState } from "react";

export default function Workouts() {
    const [visible, setVisible] = useState(false);
    return (<>
        <div>
            <button onClick={() => setVisible(true)}>Add Workout</button>
            {visible && <AddWorkout setVisible={setVisible} />}
            <h1>Workouts</h1>
            <WorkoutList />

        </div>
        <Footer />
    </>
    );
}
