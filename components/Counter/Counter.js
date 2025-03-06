import { faPause, faPlay, faRedo, faStop } from "@fortawesome/free-solid-svg-icons";
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
        setCurrentSet(0);
        setCurrentRep(0);
        setPhase("idle");
        setStatus("Ready");
    };

    const circleProgress = (timeLeft, phase) => {
        let maxTime = phase === "rep" ? 4 : 30;
        let strokeDasharray = Math.PI * 2 * 40; // Circumference of the circle (radius 50)
        let strokeDashoffset = (strokeDasharray * timeLeft) / maxTime;
        return strokeDashoffset;
    };

    return (
        <Container>
            <ProgressCircle>
                <Circle>
                    {/* <SvgCircle
                        cx="50%"
                        cy="50%"
                        r="40"
                        fill="red"
                        strokeWidth="10"
                    /> */}
                    <SvgCircle
                        cx="50%"
                        cy="50%"
                        r="40"
                        stroke="white"
                        strokeWidth="10"
                        strokeDasharray={Math.PI * 2 * 40}
                        strokeDashoffset={circleProgress(timeLeft, phase)}
                        strokeLinecap="round"
                        fill="none"
                    />
                </Circle>
                <Count>{phase === "rep" ? reps-currentRep + 1 + ' left' : "Rest"}</Count>
            </ProgressCircle>
            {/* <p>{timeLeft > 0 ? timeLeft : ""}</p> */}
            <Wrapper>
                <Info>
                <Title>{name}</Title>
                </Info>
                <Controls>
                    <ResetButton onClick={resetTimer}>
                        <FontAwesomeIcon icon={faStop} />
                    </ResetButton>
                    <StartButton onClick={startWorkout}>
                        {running ? (paused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />) : "Start"}
                    </StartButton>
                </Controls>
            </Wrapper> 
                <Text>{sets-currentSet + 1} Sets to go</Text>
        </Container>
    );
}

const Count = styled.p`
margin: 0;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`

const Text = styled.p`
margin: 0;
`

const Info = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
`

const Title = styled.h2`
`

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Container = styled.div`
padding: 20px;
`

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

const ProgressCircle = styled.div`
position: relative;
display: flex;
    width: 120px;
    height: 120px;
    justify-content: center;
margin-left: auto;
margin-right: auto;
    `;
    
    const Circle = styled.svg`
    transform: rotate(-90deg);
    `;
    
    const SvgCircle = styled.circle`
    transition: stroke-dashoffset 0.1s ease-in-out;
`;