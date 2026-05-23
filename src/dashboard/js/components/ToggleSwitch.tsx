import React, { useCallback } from 'react';
import styled from 'styled-components';

const ToggleSwitchContainer = styled.label`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToggleSwitchSlider = styled.span`
  position: relative;
  display: block;
  cursor: pointer;
  width: 4rem;
  height: 2rem;
  background-color: #505050;
  transition: 0.4s;
  border-radius: 1.75rem;
  &:before {
    content: '';
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    left: 0.25rem;
    bottom: 0.125rem;
    background-color: #fff;
    transition: 0.4s;
  }
`;
const ToggleSwitchInput = styled.input`
  && {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    margin-left: -4px;
    border: none;
  }

  &:checked + ${ToggleSwitchSlider} {
    background-color: #43a829;
  }

  &:checked + ${ToggleSwitchSlider}:before {
    transform: translateX(1.75rem);
  }

  &:focus + ${ToggleSwitchSlider} {
    box-shadow: 0 0 1px #49dd24;
  }
`;

const ToggleSwitchLabelText = styled.div`
  margin: 0.125rem 0 0 0.5rem;
`;

interface ToggleSwitchProps {
  toggled: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ className, toggled, onChange, children }) => {
  const onToggle = useCallback(() => {
    onChange?.(!toggled);
  }, [onChange, toggled]);
  return (
    <ToggleSwitchContainer className={`toggle-switch ${className}`}>
      <ToggleSwitchInput type="checkbox" checked={toggled} onChange={onToggle} />
      <ToggleSwitchSlider />
      <ToggleSwitchLabelText>{children}</ToggleSwitchLabelText>
    </ToggleSwitchContainer>
  );
};