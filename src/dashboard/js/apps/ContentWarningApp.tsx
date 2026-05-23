import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import { BUNDLE_NAME } from '../../../utils/utils';
import { useReplicant } from '@nodecg/react-hooks';
import { InputRow } from '../components/Layout';
import { ManagedInput } from '../components/ManagedInput';
import { ToggleSwitch } from '../components/ToggleSwitch';

export const ContentWarningApp = () => {
  const [isActive, setIsActive] = useReplicant<boolean>('contentWarning:active', {
    defaultValue: false,
    bundle: BUNDLE_NAME,
  });

  const [message, setMessage] = useReplicant<string>('contentWarning:message', {
    defaultValue: 'This game contains flashing lights.',
    bundle: BUNDLE_NAME,
  });

  const handleUpdateMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, [setMessage]);

  return (
    <Container>
      <InputRow>
        <ToggleSwitch
          onChange={setIsActive}
          toggled={isActive ?? false}
        >
          Show warning
        </ToggleSwitch>
      </InputRow>
      <InputRow>
        <label htmlFor="message">Message</label>
        <ManagedInput
          id="message"
          onChange={handleUpdateMessage}
          value={message}
        />
      </InputRow>
    </Container>
  )
}


const Container = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
`;
