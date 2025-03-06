import BackButtton from "@/components/BackButton/BackButtton";
import ExerciseDetails from "@/components/ExerciseDetails/ExerciseDetails";
import ExerciseList from "@/components/ExerciseList/ExerciseList";
import { faCheck, faChevronLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Exercise() {
  const router = useRouter()
  return (
    <div>
      <Header>
        <Button type='button' onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
      </Header>
      <ExerciseDetails />
    </div>
  );
}

const Header = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
position: sticky;
top: 0;
padding: 20px;
`

const Button = styled.button`
background-color: ${(props) => (props.$dark ? "rgba(0, 0, 0, 0.2)" : "#292830")};
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