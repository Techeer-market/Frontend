import { useRef, useState } from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';
import React from 'react';

const CProfile = ({ getThumb }: any) => {
  const reader = new FileReader();
  const [Image, setImage] = useState<string>(profile);
  // const [RD, setRD] = useState(reader.result);
  // const Rd = reader.result;
  const fileInput = useRef(null);

  const onChange = (e: any) => {
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
      <label htmlFor="CProfile">
        {/* <div>changeProfileeee</div> */}
        <ChangeName src={Image} alt="none" />
      </label>
      <ChangeProfile
        id="CProfile"
        type="file"
        // background-image:src={profile}
        style={{ display: 'none' }}
        accept="image/jpg,image.png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
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

export default CProfile;
