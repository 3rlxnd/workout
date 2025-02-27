import AddWorkout from "@/components/AddWorkout/AddWorkout";
import BackButtton from "@/components/BackButton/BackButtton";
import ExerciseList from "@/components/ExerciseList/ExerciseList";
import Footer from "@/components/Footer/Footer";
import WorkoutList from "@/components/WorkoutList/WorkoutList";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function HomePage() {
    const [visible, setVisible] = useState(false);
    return (<>
        <WorkoutsHeader>
            <Title>Workouts</Title>
            <AddButton onClick={() => setVisible(true)}><FontAwesomeIcon icon={faPlus} /></AddButton>

        </WorkoutsHeader>
        {visible && <AddWorkout setVisible={setVisible} />}
        <WorkoutList />
        <Footer />
    </>
    );
}

const WorkoutsHeader = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
`

const AddButton = styled.button`
background-color: white;
border: none;
font-size: 24px;
`

const Title = styled.h1`
margin: 0`