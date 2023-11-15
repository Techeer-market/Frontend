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
  flex-direction: column;
  padding-bottom: 3.6rem;
`;

export const Label = styled.span`
  padding: 4px;
  font-size: 1.2rem;
  color: #000000;
  font-weight: 700;
`;

export const InputBox = styled.input`
  height: 3rem;
  width: 24rem;
  padding: 0 1rem;
  appearance: none;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  border-radius: 1rem;
  font-size: 1.4rem;
`;

export const ErrorMessage = styled.span<{ show: boolean }>`
  height: 1.2rem;
  padding: 4px;
  font-size: 0.8rem;
  color: red;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
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
  background-color: ${(props) => (props.disabled ? '#ccc' : '#fd8944')};
  color: #fff;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;
