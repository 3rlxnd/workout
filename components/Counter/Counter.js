import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Counter({ sets, reps }) {
  const [currentRep, setCurrentRep] = useState(1);
  const [phase, setPhase] = useState('pull');
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Phases with their durations in seconds
  const phases = {
    pull: 4,
    hold: 2,
    release: 4,
    break: 2,
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + (100 / phases[phase]) / 10;
          } else {
            return 100;
          }
        });
      }, 100);

      if (progress >= 100) {
        setTimeout(() => {
          setProgress(0);

          // Phase transitions
          if (phase === 'pull') setPhase('hold');
          else if (phase === 'hold') setPhase('release');
          else if (phase === 'release') setPhase('break');
          else if (phase === 'break') {
            if (currentRep < reps) {
              setCurrentRep((prev) => prev + 1);
              setPhase('pull');
            } else {
              setIsRunning(false);
            }
          }
        }, 100);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, progress, phase, currentRep, reps]);

  // Toggle Start/Pause
  const toggleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  // Reset for Next Set
  const nextSet = () => {
    setCurrentRep(1);
    setPhase('pull');
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <CounterWrapper>
      <CircleWrapper>
        <svg width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#e6e6e6"
            strokeWidth="20"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#3498db"
            strokeWidth="20"
            fill="none"
            strokeDasharray="565.48"
            strokeDashoffset={`${565.48 - (565.48 * progress) / 100}`}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <CounterText>{phase.replace(/([A-Z])/g, ' $1')}</CounterText>
        <RepText>Rep: {currentRep}/{reps}</RepText>
      </CircleWrapper>
      <Button onClick={toggleStartPause}>
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <Button onClick={nextSet} disabled={isRunning || currentRep < reps}>
        Next
      </Button>
    </CounterWrapper>
  );
}

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CircleWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const CounterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const RepText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #777;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
