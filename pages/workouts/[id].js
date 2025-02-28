import Loader from "@/components/Loader/Loader";
import PageTitle from "@/components/Title/Title";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

export default function Start() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(`/api/workouts/${id}`);
  const [current, setCurrent] = useState(0);

  if (isLoading) return <Loader />;
  if (error || !data) return <p>Error fetching Data</p>;

  const exercise = data.exercises[current].exercise;

  return (
    <>
      <WorkoutsHeader>
        <PageTitle text={data.name}/>
        <Button type='button' onClick={() => router.back()}><FontAwesomeIcon icon={faClose} /></Button>
      </WorkoutsHeader>
      <div>
        {exercise.name}
        <p>Reps: {data.exercises[current].reps}</p>
        <p>Sets: {data.exercises[current].sets}</p>
        <div>
          <ol>
            {exercise.instructions.map(instruction => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </div>
        {current < data.exercises.length - 1 ?
          <button onClick={() => setCurrent(prev => prev + 1)}>Next</button> :
          <Link href={'/workouts'}>Done</Link>
        }
      </div>
    </>
  );
}

const WorkoutsHeader = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
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