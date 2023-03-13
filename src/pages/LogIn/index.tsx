import React from 'react';
import styled from 'styled-components';

//로고 컴포넌트로 빼놓기

const LogIn = () => {
  return (
    <Login>
      {/* <Logo /> */}

      <Inputs>
        <Email />
        <Password />
        <Etc>
          <Checkbox />
          <CheckLogin />
          <FindAccount />
        </Etc>
      </Inputs>

      <Buttons>
        <LogInButton />
        <KakaoButton />
        <GoogleButton />
      </Buttons>
    </Login>
  );
};

const Login = styled.div``;
const Inputs = styled.div``;
const Email = styled.input``;
const Password = styled.input``;
const Etc = styled.div``;
const Checkbox = styled.div``;
const CheckLogin = styled.h3``;
const FindAccount = styled.h3``;
const Buttons = styled.div``;
const LogInButton = styled.button``;
const KakaoButton = styled.button``;
const GoogleButton = styled.button``;

export default LogIn;
