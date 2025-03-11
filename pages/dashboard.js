// import ExerciseList from "@/components/ExerciseList/ExerciseList";
// import Footer from "@/components/Footer/Footer";
// import PageTitle from "@/components/Title/Title";
// import styled from "styled-components";

// export default function HomePage() {
//   return (
//     <div>
//       <ExerciseList />
//       <Footer />
//     </div>
//   );
// }

const WorkoutsHeader = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
`

import WorkoutCalendar from "@/components/Calendar/Calendar";
import Footer from "@/components/Footer/Footer";
import PageTitle from "@/components/Title/Title";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
padding: 20px;
`;

const Card = styled.div`
display: flex;
color: white;
flex-direction: column;
text-decoration: none;
padding: 20px;
background: linear-gradient(to top, #292830, #232227);
border-radius: 25px;
padding-bottom: 20px;
border: 01px solid rgb(49, 49, 49)
`;

const Title = styled.h2`
font-size: 24px;
font-weight: bold;
`;

const Subtitle = styled.p`
font-size: 16px;
opacity: 0.7;
`;

const ProgressCircle = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
border: 3px solid white;
display: flex;
align-items: center;
justify-content: center;
font-size: 16px;
font-weight: bold;
`;

const WeightText = styled.span`
font-size: 36px;
font-weight: bold;
`;

const WorkoutCard = ({ number, workout, day }) => (
  <Card>
    <ProgressCircle>{number}</ProgressCircle>
    <Title>{workout}</Title>
    <Subtitle>{day}</Subtitle>
  </Card>
);

const WeightCard = ({ weight, time }) => (
  <Card>
    <WeightText>{weight} kg</WeightText>
    <Subtitle>{time} ago</Subtitle>
  </Card>
);

const App = () => {
  return (<>
          <WorkoutsHeader>
            <PageTitle text={'Dashboard'} />
          </WorkoutsHeader>
    <Container>
      <WorkoutCalendar/>
    </Container>
    <Footer/>
    </>);
};

export default App;
