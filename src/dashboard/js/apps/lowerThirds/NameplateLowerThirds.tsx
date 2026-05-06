import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useReplicant } from '@nodecg/react-hooks';
import { InputRow } from '../../components/Layout';
import { ManagedInput } from '../../components/ManagedInput';
import { BUNDLE_NAME } from '../../../../utils/utils';
import { LowerThirdsInterface } from './LowerThirdsInterface';

const MAX_NAMEPLATES = 4;

function createBlankNameplateSet() {
  return [...new Array(MAX_NAMEPLATES)].map(() => ({
    name: '',
    pronouns: '',
    title: '',
  }));
}

interface NameplateData {
  name: string;
  pronouns: string;
  title: string;
}

interface NameplateEditorProps {
  nameplate: NameplateData
  onUpdate: (value: NameplateData) => void;
}

const NameplateEditor: React.FC<NameplateEditorProps> = ({ nameplate, onUpdate }) => {
  const updateNameplateField = useCallback((field: keyof NameplateData, value: NameplateData[typeof field]) => {
    if (!nameplate) return;

    const updatedValue = { ...nameplate, [field]: value };
    
    onUpdate(updatedValue);
  }, [nameplate, onUpdate]);

  const handleUpdateName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateNameplateField('name', event.target.value);
  }, [updateNameplateField]);

  const handleUpdatePronouns = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateNameplateField('pronouns', event.target.value);
  }, [updateNameplateField]);

  const handleUpdateTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateNameplateField('title', event.target.value);
  }, [updateNameplateField]);

  return (
    <NameplateEditorContainer>
      <NameplateNameRow>
        <label htmlFor="nameplate-name">Name</label>
        <ManagedInput
          id="nameplate-name"
          onChange={handleUpdateName}
          value={nameplate.name}
        />
      </NameplateNameRow>
      <InputRow>
        <label htmlFor="nameplate-pronouns">Pronouns</label>
        <ManagedInput
          id="nameplate-pronouns"
          onChange={handleUpdatePronouns}
          value={nameplate.pronouns}
        />
      </InputRow>
      <InputRow>
        <label htmlFor="nameplate-title">Title</label>
        <ManagedInput
          id="nameplate-title"
          onChange={handleUpdateTitle}
          value={nameplate.title}
        />
      </InputRow>
    </NameplateEditorContainer>
  );
}

export const NameplateLowerThirds: React.FC = () => {
  const [nameplateLowerThirds, setNameplateLowerThirds] = useReplicant('lowerThirds:nameplates', {
    defaultValue: createBlankNameplateSet(),
    bundle: BUNDLE_NAME,
  });
  
  const handleUpdateNameplate = useCallback((index: number, data: NameplateData) => {
    if (!nameplateLowerThirds) return;

    setNameplateLowerThirds(nameplateLowerThirds.map((item, mapIndex) => index === mapIndex ? data : item));
  }, [nameplateLowerThirds, setNameplateLowerThirds]);

  return (
    <LowerThirdsInterface
      type="nameplates"
      replicantName="lowerThirds:nameplates"
      defaultValue={createBlankNameplateSet}
    >
      {(nameplateLowerThirds ?? []).map((nameplate, index) => (
        <NameplateEditor
          key={index}
          nameplate={nameplate}
          onUpdate={data => handleUpdateNameplate(index, data)}
        />
      ))}
    </LowerThirdsInterface>
  );
};

const NameplateEditorContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 0 0.5rem;
  flex-direction: column;
  padding: 0.5rem;

  & + & {
    margin-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
`

const NameplateNameRow = styled(InputRow)`
  grid-column: 1 / -1;
`;
