import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import { BUNDLE_NAME } from '../../../utils/utils';
import { useReplicant } from '@nodecg/react-hooks';
import { InputRow } from '../components/Layout';
import { ManagedInput } from '../components/ManagedInput';

export const FoobarNowPlayingApp = () => {
  const [sourceFile, setSourceFile] = useReplicant<string>('foobar:sourceFile', {
    defaultValue: '',
    bundle: BUNDLE_NAME,
  });

  const [nowPlaying] = useReplicant<string>('foobar:nowPlaying', {
    defaultValue: '',
    bundle: BUNDLE_NAME,
  });

  const handleUpdateSourceFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSourceFile(event.target.value);
  }, [setSourceFile]);

  return (
    <Container>
      <InputRow>
        <label htmlFor="file-path">File path</label>
        <ManagedInput
          id="file-path"
          onChange={handleUpdateSourceFile}
          value={sourceFile}
        />
      </InputRow>
      <InputRow>
        <label>Now playing</label>
        <span>
          {nowPlaying ?? '—'}
        </span>
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
