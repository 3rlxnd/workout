import ExerciseList from "@/components/ExerciseList/ExerciseList";
import Footer from "@/components/Footer/Footer";
import styled from "styled-components";

export default function HomePage() {
  return (<>
    <Title>Exercises</Title>
    <ExerciseList />
    <Footer />
  </>
  );
}

const Title = styled.h1`
padding: 20px;
margin: 0`
