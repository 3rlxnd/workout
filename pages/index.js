import ExerciseList from "@/components/ExerciseList/ExerciseList";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import styled from "styled-components";

export default function HomePage() {
  return (
    <div>
      <Title>Exercises</Title>
      <ExerciseList />
      <Footer/>
    </div>
  );
}

const Title = styled.h1`
padding: 20px;
margin: 0`