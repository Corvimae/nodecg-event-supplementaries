import styled, { css } from 'styled-components';

const VARIANTS = {
  primary: {
    background: '#272727',
    hover: '#474747',
    foreground: '#fff',
  },
  danger: {
    background: '#a13232',
    hover: '#c75050',
    foreground: '#fff',
  },
  active: {
    background: '#009900',
    hover: '#00cc00',
    foreground: '#fff',
  },
} as const;

export const Button = styled.button<{ variant?: keyof typeof VARIANTS }>`
  color: ${({ variant }) => VARIANTS[variant ?? 'primary'].background};
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  margin: 0;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;

  ${({ variant }) => {
    const variantSet = VARIANTS[variant ?? 'primary'];

    return css`
      color: ${variantSet.foreground};
      background-color: ${variantSet.background};

      &:not(:disabled):hover,
      &:not(:disabled):active {
        background-color: ${variantSet.hover};
      }
    `;
  }}


  &:disabled {
    opacity: 0.5;
  }

  & + & {
    margin-left: 1rem;
  }
`;