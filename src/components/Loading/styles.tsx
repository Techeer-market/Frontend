import styled, { keyframes } from 'styled-components';

export const Div = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const SpinnerKeyframes = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

export const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.5rem solid rgba(0, 0, 0, 0.3);
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${SpinnerKeyframes} 0.6s linear infinite;
`;