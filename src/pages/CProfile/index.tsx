import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';
import axios from 'axios';
import userID from '@/redux/userID';

interface Info {
  email: string;
  password: string;
  birth: string;
}

const CProfile = ({ getThumb }: any) => {
  const reader = new FileReader();
  const [image, setImage] = useState<string>(profile);
  const [info, setInfo] = useState<Info>();
  // const [RD, setRD] = useState(reader.result);
  // const Rd = reader.result;
  const fileInput = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try{
        const response = await axios.get(`http://localhost:8080/api/users/${userID}`);
        setInfo(response.data);
      } catch(error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [info]);

  const onImgChange = (e: any) => {
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0].name);

    if (e.target.files[0].name) {
      setImage(e.target.files[0].name);
      console.log(e.target.files[0].name);
      getThumb(e.target.files[0].name);
    } else {
      //업로드 취소
      setImage(profile);
      getThumb(profile);
      return;
    }
    console.log(reader.result);
    // 화면에 프로필 사진 표시
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader);
        // console.log(reader.result);
        console.log(typeof reader.result);
        const aa: any = reader.result;
        setImage(aa);

        // setImage(e.target.files[0].name);
      }
    };
  };

  return (
    <>
      {/* <label htmlFor="CProfile">
      <div>changeProfileeee</div>
      <ChangeName src={Image} alt="none" />
      </label> */}
      <ChangeProfile
        id="CProfile"
        type="file"
        // background-image:src={profile}
        style={{ display: 'none' }}
        accept="image/jpg,image.png,image/jpeg"
        name="profile_img"
        onChange={onImgChange}
        ref={fileInput}
      />
      {/* userUuid로 구현 */}
      <span>(이름)</span> 

      <InfoContainer>
        <Section>
          <label htmlFor='email'>이메일</label>
          <InputBox 
            type='email'
            name='email'
            value={info?.email}
            // readOnly
          />
          <ChangeBtn>변경</ChangeBtn>
        </Section>
        <Section>
          <label htmlFor='password'>비밀번호</label>
          <InputBox 
            type='password'
            name='password'
            value={info?.password}
            // readOnly
          />
          <ChangeBtn>변경</ChangeBtn>
        </Section>
        <Section>
          <label htmlFor='birth'>생일</label>
          <InputBox 
            type='date'
            name='birth'
            value={info?.birth}
            // readOnly
          />
          <ChangeBtn>변경</ChangeBtn>
        </Section>
      </InfoContainer>
    </>
  );
};

const ChangeName = styled.img`
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

const ChangeProfile = styled.input`
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

const InfoContainer = styled.div`
`

const Section = styled.div`
`

const InputBox = styled.input`
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  color: black;
`

const ChangeBtn = styled.button`
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

export default CProfile;
