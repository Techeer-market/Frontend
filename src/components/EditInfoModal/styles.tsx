import styled from 'styled-components';

export const BtnArea = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 3rem;
  height: 3rem;
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    color: #828385;
  }
`;

export const Contaniner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
`;

export const Label = styled.span`
  padding-right: 1.4rem;
  font-size: 1.4rem;
  color: #000000;
  font-weight: 700;
`;

export const InputBox = styled.input`
  height: 2.4rem;
  padding: 0 1rem;
  appearance: none;
  border: none;
  background-color: #efefef;
  border-radius: 1rem;
  font-size: 1.4rem;
`;

export const EditBtn = styled.button`
  position: absolute;
  bottom: 2rem;
  width: 6rem;
  height: 2.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  appearance: none;
  border: 0;
  border-radius: 10px;
  background-color: #fd8944;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;
