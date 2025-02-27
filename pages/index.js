import ExerciseList from "@/components/ExerciseList/ExerciseList";
import Footer from "@/components/Footer/Footer";
import PageTitle from "@/components/Title/Title";
import styled from "styled-components";

export default function HomePage() {
  return (
    <div>
      <WorkoutsHeader>
        <PageTitle text={'Exercises'} />
      </WorkoutsHeader>
      <ExerciseList />
      <Footer />
    </div>
  );
}

const WorkoutsHeader = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
`