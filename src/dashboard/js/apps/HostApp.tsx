import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { BUNDLE_NAME } from '../../../utils/utils';
import { useReplicant } from '@nodecg/react-hooks';
import { ActionSet, InputRow } from '../components/Layout';
import { Button } from '../components/Button';

export const HostApp = () => {
  const [hostName, setHostName] = useState('');
  const [hostPronouns, setHostPronouns] = useState('');
  const [hostNameReplicant, setHostNameReplicant] = useReplicant<string>('host:name', {
    defaultValue: '',
    bundle: BUNDLE_NAME,
  });

  const [hostPronounsReplicant, setHostPronounsReplicant] = useReplicant<string>('host:pronouns', {
    defaultValue: '',
    bundle: BUNDLE_NAME,
  });

  useEffect(() => {
    if (hostNameReplicant) setHostName(hostNameReplicant);
    if (hostPronounsReplicant) setHostPronouns(hostPronounsReplicant);
  }, [hostNameReplicant, hostPronounsReplicant]);

  const handleUpdateHostName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHostName(event.target.value);
  }, [setHostName]);

  const handleUpdateHostPronouns = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHostPronouns(event.target.value);
  }, [setHostPronouns]);

  const handleSave = useCallback(() => {
    setHostNameReplicant(hostName);
    setHostPronounsReplicant(hostPronouns);
  }, [setHostNameReplicant, setHostPronounsReplicant, hostName, hostPronouns]);

  return (
    <Container>
      <InputRow>
        <label>Current host</label>
        <span>
          {hostName || '—'} {hostPronouns || ''}
        </span>
      </InputRow>
      <InputRow>
        <label htmlFor="host-name">Name</label>
        <input
          id="host-name"
          onChange={handleUpdateHostName}
          value={hostName}
        />
      </InputRow>
      <InputRow>
        <label htmlFor="host-pronouns">Pronouns</label>
        <input
          id="host-pronouns"
          onChange={handleUpdateHostPronouns}
          value={hostPronouns}
        />
      </InputRow>
      <ActionSet>
        <Button onClick={handleSave}>Update</Button>
      </ActionSet>
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
