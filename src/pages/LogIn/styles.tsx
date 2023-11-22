import styled from 'styled-components';

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1080px) {
    justify-content: center;
  }
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 36rem;
  height: 4.5rem;
  border-radius: 1rem;
  border: none;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 2.8rem;
  padding-left: 17px;
`;

export const Etc = styled.div`
  width: 36rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -1rem;
  margin-bottom: 6rem;
`;
export const Check = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;
export const CheckLogin = styled.button`
  background: none;
  border: 0;
  font-size: 1.4rem;
`;
export const FindAccount = styled.button`
  background: none;
  border: 0;
  text-decoration: underline;
  font-size: 1.4rem;
  color: #a0a0a0;

  &:hover {
    cursor: pointer;
  }
`;
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;
export const LogInButton = styled.button`
  width: 36rem;
  height: 5.5rem;
  border-radius: 10px;
  // background: #000;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#000')};
  color: white;
  border: none;
  margin-bottom: 12px;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;
export const KakaoButton = styled.button`
  width: 36rem;
  height: 5.5rem;
  border-radius: 10px;
  background: #ffdb20;
  border: none;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  font-size: 14px;
`;
export const SignUpeButton = styled.button`
  width: 36rem;
  height: 5.5rem;
  border-radius: 10px;
  border: 2px solid #dfdfdf;
  background: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Message = styled.span`
  font-size: 0.8rem;
  color: red;
  display: flex;
  margin-top: -2rem;
  margin-bottom: 2rem;
`;
