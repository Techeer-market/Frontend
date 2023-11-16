import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 50rem;
  height: 100vh;
  img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 120px;
    margin: 0 auto;
  }
`;
export const Inputs = styled.div`
  margin-top: 100px;
  align-items: center;
  flex-direction: column;
  display: flex;
  align-items: center;
  place-content: center;
  margin-bottom: 80px;
`;
export const NameInput = styled.input`
  width: 36rem;
  height: 4.5rem;
  border: none;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding-left: 15px;
  margin-bottom: 30px;
`;
export const EmailInput = styled.input`
  width: 36rem;
  height: 4.5rem;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  padding-left: 15px;
  margin-bottom: 30px;
`;
export const PasswordInput = styled.input`
  width: 36rem;
  height: 4.5rem;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  padding-left: 15px;
  margin-bottom: 30px;
`;
export const PasswordCorrectInput = styled.input`
  width: 36rem;
  height: 4.5rem;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  padding-left: 15px;
  margin-bottom: 30px;
`;
export const Buttons = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  place-content: center;
  border: none;
`;
export const SaveBtn = styled.button`
  width: 36rem;
  height: 4.5rem;
  background: #ffffff;
  border: 2px solid #dfdfdf;
  border-radius: 10px;
`;
export const CancelBtn = styled.button`
  width: 36rem;
  height: 4.5rem;
  background: #ffffff;
  border: 2px solid #000;
  background-color: #000;
  border-radius: 10px;
  margin-top: 20px;
  border-radius: 10px;
  color: #fff;
`;
