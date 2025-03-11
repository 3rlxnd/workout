import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #141416;
  color: white;
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  font-family: sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: #8b8b8b;
  font-size: 14px;
  margin-bottom: 12px;
`;

const GridWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#ffffff" : "#3a3a3a")};
`;

const WorkoutInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  // margin-bottom: 50px;
`;

const WorkoutNumber = styled.div`
  width: 36px;
  height: 36px;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const WorkoutText = styled.div`
  margin-left: 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0
`;

const Subtitle = styled.p`
  color: #8b8b8b;
  font-size: 14px;
  margin: 0
`;

const months = ["Jan", "Feb", "Mar"];
const workoutData = {
  Jan: [2, 4, 6, 9, 11, 16, 18, 23, 25, 30],
  Feb: [1, 6, 8, 13, 15, 20, 22, 27],
  Mar: [4],
};

const WorkoutCalendar = () => {
  return (
    <Card>
      <Header>
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </Header>
      <GridWrapper>
        {months.map((month) => (
          <MonthGrid key={month}>
            {[...Array(31)].map((_, i) => (
              <Dot key={i} active={workoutData[month]?.includes(i + 1)} />
            ))}
          </MonthGrid>
        ))}
      </GridWrapper>
      <WorkoutInfo>
        <WorkoutNumber>2</WorkoutNumber>
        <WorkoutText>
          <Title>Back + Upper Body</Title>
          <Subtitle>Mondays</Subtitle>
        </WorkoutText>
      </WorkoutInfo>
    </Card>
  );
};

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

export default WorkoutCalendar;
