import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '@/components/Logo';
import profile from '../../assets/profile.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [birth, setBirth] = useState('');
  // const [thumb, setThumb] = useState(profile);

  const [nValid, setNValid] = useState(true);
  const [pwConfirm, setPwConfirm] = useState('');
  const [eValid, setEValid] = useState(true);

  const navigate = useNavigate();
  // const getThumb = (data: any) => {
  //   setThumb(data);
  // };

  // useEffect(() => {
  //   console.log(thumb + '부모');
  // }, [thumb]);

  function onClick(e: any) {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/signup', {
        email: email,
        password: pw,
        name: name,
        birthDay: birth,
      })
      .then(function (res) {
        console.log(res);
        alert('회원가입 성공');
        navigate('/login');
      })
      .catch((res) => {
        if (res && res.response && res.response.data) {
          if (res.response.data.email) {
            setEValid(false);
          } else if (res.response.data.nickname) {
            setEValid(false);
          }
        } else {
        }
      });
  }

  return (
    <ConDiv>
      <Logo />
      {/* <CProfile getThumb={getThumb} /> */}
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
        <PwInput
          placeholder="비밀번호"
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <PwInput
          placeholder="비밀번호 확인"
          type="password"
          value={pwConfirm}
          onChange={(e) => {
            setPwConfirm(e.target.value);
          }}
        />
        <ValidCheck style={{ display: pwConfirm === pw ? 'none' : 'block' }}>
          pw한번더 확인해 주세요.
        </ValidCheck>
        <PwInput
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

// const CheckBtn = styled.button`
//   width: 10rem;
//   height: 3rem;
//   display: flex;
//   border-radius: 0.8rem;
//   float: right;
//   align-items: center;
//   justify-content: center;
//   color: black;
//   font-size: 1.4rem;
//   background-color: white;
//   &:hover {
//     cursor: pointer;
//     background-color: rgb(246, 246, 246);
//   }
//   &:active {
//     background-color: rgb(200, 200, 200);
//   }
// `;

const Input = styled.input`
  // width: 19rem;
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
  // display: none;
`;

const PwInput = styled.input`
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
