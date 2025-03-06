import { faPause, faPlay, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Counter({ name, reps, sets }) {
    const [setCount] = useState(sets); // Number of sets
    const [repCount] = useState(reps); // Number of reps per set
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState("Ready");
    const [running, setRunning] = useState(false);
    const [paused, setPaused] = useState(false);
    const [currentSet, setCurrentSet] = useState(1);
    const [currentRep, setCurrentRep] = useState(1);
    const [phase, setPhase] = useState("idle"); // "rep", "rest", "idle"
    let timer;

    useEffect(() => {
        if (running && !paused) {
            if (phase === "rep") {
                setStatus(`Set ${currentSet} - Rep ${currentRep}`);
                startCountdown(4, handleNext);
            } else if (phase === "rest") {
                setStatus("Rest");
                startCountdown(30, handleNextSet);
            }
        }
        return () => clearInterval(timer);
    }, [running, paused, phase, currentSet, currentRep]);

    const startWorkout = () => {
        if (running) {
            setPaused(!paused);
        } else {
            setRunning(true);
            setPaused(false);
            setCurrentSet(1);
            setCurrentRep(1);
            setPhase("rep");
        }
    };

    const startCountdown = (seconds, callback) => {
        setTimeLeft(seconds);
        timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    callback();
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleNext = () => {
        if (currentRep < repCount) {
            setCurrentRep(currentRep + 1);
            setPhase("rep");
        } else {
            setPhase("rest");
        }
    };

    const handleNextSet = () => {
        if (currentSet < setCount) {
            setCurrentSet(currentSet + 1);
            setCurrentRep(1);
            setPhase("rep");
        } else {
            setStatus("Workout Complete!");
            setRunning(false);
        }
    };

    const resetTimer = () => {
        clearInterval(timer);
        setTimeLeft(0);
        setRunning(false);
        setPaused(false);
        setCurrentSet(1);
        setCurrentRep(1);
        setPhase("idle");
        setStatus("Ready");
    };

    return (
        <Container>
            <p>{status}</p>
            <p>{timeLeft > 0 ? timeLeft : ""}</p>
            <Wrapper>
                <Title>{name}</Title>
                <Controls>
                    <ResetButton onClick={resetTimer}>
                        <FontAwesomeIcon icon={faRedo} />
                    </ResetButton>
                    <StartButton onClick={startWorkout}>
                        {running ? (paused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />) : "Start"}
                    </StartButton>
                </Controls>
            </Wrapper>
        </Container>
    );
}

const Title = styled.h2`
`

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Container = styled.div`
padding: 20px;`

const Controls = styled.div`
display: flex;
gap: 10px;`

const StartButton = styled.button`
background-color: ${(props) => (props.$dark ? "rgba(0, 0, 0, 0.2)" : "#292830")};
color: white;
display: flex;
gap: 10px;
align-items: center;
justify-content: center;
// width: 40px;
height: 40px;
border-radius: 50px;
border: none;
font-weight: 200;
font-size: 1rem;
padding: 0px 20px
`
const ResetButton = styled.button`
background-color: ${(props) => (props.$dark ? "rgba(0, 0, 0, 0.2)" : "#292830")};
color: white;
display: flex;
gap: 10px;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
border-radius: 50px;
border: none;
font-weight: 200;
font-size: 1rem;
padding: 0px 20px
`