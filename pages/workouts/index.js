import Footer from "@/components/Footer/Footer";
import PageTitle from "@/components/Title/Title";
import WorkoutList from "@/components/WorkoutList/WorkoutList";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import WorkoutForm from "@/components/WorkoutForm/WorkoutForm";

export default function HomePage() {
    const [visible, setVisible] = useState(false);
    return (<div>
        <WorkoutsHeader>
            <PageTitle text={'Workouts'}/>
            <AddButton onClick={() => setVisible(true)}>
                    <FontAwesomeIcon icon={faPlus} />
            </AddButton>

        </WorkoutsHeader>
        {visible && <WorkoutForm setVisible={setVisible} />}
        <WorkoutList />
        <Footer />
    </div>
    );
}

const WorkoutsHeader = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
`

const AddButton = styled.button`
background-color: #292830;
color: white;
display: flex;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
border-radius: 50px;
border: none;
font-weight: 200;
font-size: 1rem;
`

const Title = styled.h1`
margin: 0;
font-weight: 500`