import { useState } from 'react';
import styled from 'styled-components';
import Logo from '@/components/Logo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [birth, setBirth] = useState('');

  const [nValid, setNValid] = useState(true);
  const [pwConfirm, setPwConfirm] = useState('');
  const [eValid, setEValid] = useState(true);

  const navigate = useNavigate();

  function onClick(e: any) {
    e.preventDefault();
    axios
      .post('http://54.180.142.116:8080/api/users/signup', {
        email: email,
        password: pw,
        name: name,
      })
      .then(function (res) {
        console.log(res);
        alert('회원가입 성공');
        navigate('/login');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.email) {
            setEValid(false);
          }
        } else {
          console.log(error);
        }
      });
  }

  return (
    <ConDiv>
      <Logo />
      <FirstForm />
      <Input
        placeholder="이름"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <ValidCheck style={{ display: nValid ? 'none' : 'block' }}>
        다른 name을 입력해주세요.
      </ValidCheck>
      <Input
        placeholder="이메일"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <ValidCheck style={{ display: eValid ? 'none' : 'block' }}>
        다른 email을 입력해주세요.
      </ValidCheck>
      <TextForm>
        <Input
          placeholder="비밀번호"
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <Input
          placeholder="비밀번호 확인"
          type="password"
          value={pwConfirm}
          onChange={(e) => {
            setPwConfirm(e.target.value);
          }}
        />
        <ValidCheck style={{ display: pwConfirm === pw ? 'none' : 'block' }}>
          비밀번호를 한번 더 확인하세요.
        </ValidCheck>
        <Input
          placeholder="ex) yyyy-mm-dd"
          type="date"
          value={birth}
          onChange={(e) => {
            setBirth(e.target.value);
          }}
        />
        <ValidCheck style={{ display: birth ? 'none' : 'block' }}>
          날짜를 입력해주세요
        </ValidCheck>
        <JoinInBtn onClick={onClick}>가입하기</JoinInBtn>
      </TextForm>
    </ConDiv>
  );
};

const ConDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1080px) {
    justify-content: center;
  }
`;

const FirstForm = styled.div`
  display: flex;
  margin-top: -0.8rem;
  flex-direction: column;
`;

const TextForm = styled.div`
  width: 30rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  margin-top: 1.3rem;
`;

const Input = styled.input`
  width: 30rem;
  height: 3rem;
  border-radius: 1rem;
  border: none;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1.3rem;
  padding-left: 1.7rem;
  font-size: 1.4rem;
`;

const ValidCheck = styled.h4`
  display: flex;
  width: 19rem;
  color: red;
  margin: 0rem;
  padding: 0rem;
  margin-top: -1rem;
  margin-bottom: 0.1rem;
  align-items: center;
  font-size: 0.8rem;
`;


const JoinInBtn = styled.button`
  width: 30rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  border: none;
  border-radius: 0.8rem;
  background-color: black;
  color: white;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
  }
`;

export default SignUp;
