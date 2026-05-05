import styled, { css } from 'styled-components';

const CARD_VARIANTS = {
  info: {
    background: '#a1c2ee',
    border: '#5e84b6',
    text: '#1a3250',
  },
  error: {
    background: '#ffc6c6',
    border: '#923a3a',
    text: '#3f0909',
  },
  warning: {
    background: '#fff5bc',
    border: '#c4b980',
    text: '#4e4a30',
  },
  success: {
    background: '#b3f7cd',
    border: '#409b63',
    text: '#0f4423',
  },
  neutral: {
    background: '#e6e6e6',
    border: '#999',
    text: '#333',
  },
  borderless: {
    background: 'transparent',
    border: 'transparent',
    text: 'inherit',
    borderless: true,
  },
  faint: {
    background: 'transparent',
    border: 'transparent',
    text: '#999',
  },
} as const;


export const Subtitle = styled.h4`
  margin: 0.5rem 0;
`;

export const InputRow = styled.div`
  position: relative;
  width: 100%;

  & label:not(.toggle-switch),
  & header {
    display: flex;
    margin-bottom: 0.25rem;
    padding-right: 0.5rem;
    font-weight: 700;
    color: #979A9B;
  }

  & input,
  & textarea {
    border-radius: 0.25rem;
    height: 2rem;
    width: 100%;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    color: #f6f7f9;
    background-color: #383f45;
    border: 1px solid #596066;
    box-shadow: none;
  }

  & textarea {
    width: 100%;
    min-height: 200px;
    resize: vertical;
  }

  & select {
    width: 100%;    
    height: 2rem;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    color: #f6f7f9;
    background-color: #383f45;
    border: 1px solid #596066;
  }

  & + & {
    margin-top: 0.5rem;
  }

  & .typeahead__control {
    color: #f6f7f9;
    background-color: #383f45;
    border-color: #596066;
  }

  & .typeahead__value-container div {
    color: #f6f7f9;
  }

  & .typeahead__indicator-separator {
    background-color: #596066;
  }

  & .typeahead__menu {
    background-color: #383f45;
    z-index: 99;
  }

  & .typeahead__option--is-focused {
    background-color: #596066;
  }

  & + ${Subtitle} {
    margin-top: 1rem;
  }
`;


export const Card = styled.div<{ variant?: keyof typeof CARD_VARIANTS }>`
  width: 100%;
  padding: 0.25rem 0.5rem;
  margin: 1rem 0;
  border-radius: 0.25rem;

  ${({ variant }) => {
    const variantSet = CARD_VARIANTS[variant ?? 'info'];

    return css`
      color: ${variantSet.text};
      background-color: ${variantSet.background};
      border: 1px solid ${variantSet.border};
    `;
  }}
`;

export const ActionSet = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;

  & + & {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

export const ConfirmInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  
  & > input,
  & > select {
    flex-grow: 1;
    min-width: 0;
    align-self: stretch;
    margin-right: 0.5rem;
  }
`;

export const HelpText = styled.div`
  grid-column: 2;
  font-size: 0.875rem;
  font-style: italic;
  color: #979A9B;
  margin-top: 0.25rem;

  & a {
    color: #7ea5d8;
  }

  & + & {
    margin-top: -0.25rem;
  }
`;