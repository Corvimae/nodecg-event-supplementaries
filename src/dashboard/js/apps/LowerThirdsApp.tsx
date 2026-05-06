import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { NameplateLowerThirds } from './lowerThirds/NameplateLowerThirds';
import { Button } from '../components/Button';
import { CTALowerThirds } from './lowerThirds/CTALowerThirds';

export const LowerThirdsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nameplates');

  const handleShowNameplates = useCallback(() => {
    setActiveTab('nameplates');
  }, []);

  const handleShowCTA = useCallback(() => {
    setActiveTab('cta');
  }, []);

  return (
    <Container>
      <TabRow>
        <Button
          variant={activeTab === 'nameplates' ? 'active' : 'primary'}
          onClick={handleShowNameplates}
        >
          Nameplates
        </Button>
        <Button
          variant={activeTab === 'cta' ? 'active' : 'primary'}
          onClick={handleShowCTA}
        >
          CTA
        </Button>
      </TabRow>
      {activeTab === 'nameplates' && <NameplateLowerThirds />}
      {activeTab === 'cta' && <CTALowerThirds />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
`;

const TabRow = styled.div`
  display: grid;
  width: 100%;
  height: 2rem;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  & button {
    border-radius: 0;
    margin: 0;
  }
`;
