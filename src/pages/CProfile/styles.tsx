import styled from 'styled-components';

export const Div = styled.div`

`

export const ChangeName = styled.img`
  z-index: 2;
  display: flex;
  width: 14.3rem;
  height: 14.3rem;
  border-radius: 50%;
  border: none;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: -6.5rem;
  background-color: rgba(255, 255, 255, 0);
  color: black;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 1px 10px 1px rgba(124, 161, 255, 0.769);
  }
`;

export const ChangeProfile = styled.input`
  z-index: 2;
  display: flex;
  width: 14.3rem;
  height: 14.3rem;
  // border-radius: 50%;
  border: none;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0);
  color: black;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 1px 10px 1px rgba(124, 161, 255, 0.769);
  }
`;

export const InfoContainer = styled.div`
`

export const Section = styled.div`
`

export const InputBox = styled.input`
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  color: black;
`

export const ChangeBtn = styled.button`
color: #FD8944;
font-size: 1rem;
font-style: normal;
font-weight: 700;
// 브라우저 스타일 제거
appearance: none;
border: 0;
padding: 0;
background-color: transparent;
`

export const DelBtn = styled.button`
font-size: 1rem;
font-style: normal;
font-weight: 700;
// 브라우저 스타일 제거
appearance: none;
border: 0;
padding: 0;
background-color: transparent;
`