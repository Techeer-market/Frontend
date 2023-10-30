import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Div>
      <Spinner />
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerKeyframes = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.5rem solid rgba(0, 0, 0, 0.1);
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${SpinnerKeyframes} 0.6s linear infinite;
`;

export default Loading;
