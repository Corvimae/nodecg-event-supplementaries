import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useReplicant } from '@nodecg/react-hooks';
import { InputRow } from '../../components/Layout';
import { BUNDLE_NAME } from '../../../../utils/utils';
import { LowerThirdsInterface } from './LowerThirdsInterface';

function getDefaultValue() {
  return '';
}

export const CTALowerThirds: React.FC = () => {
  const [ctaLowerThird, setCTALowerThird] = useReplicant('lowerThirds:cta', {
    defaultValue: '',
    bundle: BUNDLE_NAME,
  });
  
  const handleUpdateCTA = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCTALowerThird(event.target.value);
  }, [setCTALowerThird]);

  return (
    <LowerThirdsInterface
      type="cta"
      replicantName="lowerThirds:cta"
      defaultValue={getDefaultValue}
    >
      <Textarea onChange={handleUpdateCTA} value={ctaLowerThird} />
    </LowerThirdsInterface>
  );
};

const Textarea = styled.textarea`
  border-radius: 0.25rem;
  height: 10rem;
  width: calc(100% - 1rem);
  padding: 0.25rem 0.5rem;
  margin: 0 0.5rem 0.5rem;
  font-size: 1rem;
  color: #f6f7f9;
  background-color: #383f45;
  border: 1px solid #596066;
  box-shadow: none;
  resize: none;
`;