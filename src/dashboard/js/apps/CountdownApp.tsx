import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useReplicant } from '@nodecg/react-hooks';
import { Button } from '../components/Button';
import { useFallbackReplicant } from '../../../utils/hooks';
import { BUNDLE_NAME } from '../../../utils/utils';

export const CountdownApp = () => {
  const [countdownSecondsRemaining, setCountdownSecondsRemaining] = useFallbackReplicant('countdownSecondsRemaining', {
    defaultValue: 0,
    bundle: BUNDLE_NAME,
  });

  const [isCountdownRunning, setIsCountdownRunning] = useReplicant('isCountdownRunning', {
    defaultValue: false,
    bundle: BUNDLE_NAME,
  });

  const minutesRemaining = Math.floor(countdownSecondsRemaining / 60);
  const secondsRemainder = countdownSecondsRemaining - minutesRemaining * 60;

  const handleToggleCountdownRunning = useCallback(() => {
    setIsCountdownRunning(!isCountdownRunning);
  }, [isCountdownRunning, setIsCountdownRunning]);

  const handleCountdownReset = useCallback(() => {
    setCountdownSecondsRemaining(60 * 30);
    setIsCountdownRunning(false);
  }, [setCountdownSecondsRemaining, setIsCountdownRunning]);
   
  const handleMinutesChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(event.target.value);

    if (Number.isNaN(minutes)) return;
    setCountdownSecondsRemaining(minutes * 60 + secondsRemainder);
  }, [setCountdownSecondsRemaining, secondsRemainder]);

  const handleSecondsChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const seconds = Math.min(Number(event.target.value), 59);

    if (Number.isNaN(seconds)) return;
    setCountdownSecondsRemaining(minutesRemaining * 60 + seconds);
  }, [setCountdownSecondsRemaining, minutesRemaining]);

  return (
    <Container>
      <InputContainer>
        <TimerInput
          onChange={handleMinutesChanged}
          min={0}
          value={minutesRemaining < 10 ? `0${minutesRemaining}` : minutesRemaining}
        />
        <div>:</div>
        <TimerInput
          onChange={handleSecondsChanged}
          max={59}
          min={0}
          value={secondsRemainder < 10 ? `0${secondsRemainder}` : secondsRemainder}
        />
      </InputContainer>
      <ActionContainer>
        <Button onClick={handleToggleCountdownRunning}>{isCountdownRunning ? 'Stop' : 'Start'}</Button>
        <Button onClick={handleCountdownReset}>Reset</Button>
      </ActionContainer>
    </Container>
  )
};

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1rem 1fr;
  font-size: 2rem;
  color: #fff;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const TimerInput = styled.input`
  min-width: 0;
  border: none;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.7);
  background-color: transparent;
  text-align: center;
  font-size: 2rem;
  color: #fff;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 1rem;

  & button {
    font-size: 1.5rem;
  }
`;