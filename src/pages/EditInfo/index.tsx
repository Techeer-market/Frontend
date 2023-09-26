import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import * as S from './styles';
import axios from 'axios';
import userID from '@/redux/userID';
import EditInfoModal from '@/components/EditInfoModal';

interface Info {
  email: string;
  password: string;
  birth: string;
}

const EditInfo = ({ getThumb }: any) => {
  const navigate = useNavigate();
  const reader = new FileReader();
  const [image, setImage] = useState(profile);
  const [info, setInfo] = useState<Info>();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try{
        const response = await axios.get(`http://localhost:8080/api/users/${userID}`);
        setInfo(response.data);
        if(response.data.image){
          setImage(response.data.image);
        }
      } catch(error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

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

  // 정보 업데이트
  const onInfoChange = () => {
    axios.patch(`http://localhost:8080/api/users/update`, info)
    .then(response=>{
      setInfo(response.data);
    })
    .catch(error=>{
      console.error(error);
    })
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  // 로그아웃
  const handleLogout = () => {
    axios.post('http://localhost:8080/api/users/logout')
    .then(response => {
        navigate('/login');
    })
    .catch(error => {
      console.error(error);
    })
  };

  // 회원탈퇴
  const handleDeleteUser = () => {
    axios.delete(`http://localhost:8080/api/users/${userID}`)
    .then(response => {
      navigate('/login');
    })
    .catch(error => {
      console.error(error);
    })
  };

  return (
    <S.Div>
      <S.ProfileContainer>
        <label htmlFor="Profile">
          <S.ChangeName src={image} alt="Profile" />
        </label>
        {/* userUuid로 구현 */}
        <S.Name>(이름)</S.Name> 
      </S.ProfileContainer>

      <S.ChangeProfile
        id="Profile"
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onImgChange}
        ref={fileInput}
        style={{ display: 'none' }}
      />

      <S.InfoContainer>
        <S.Section>
          <div>
            <S.Title>이메일</S.Title>
            <S.InfoContent>{info?.email? info?.email : "....@gmail.com"}</S.InfoContent>
          </div>
          <S.ChangeBtn>변경</S.ChangeBtn>
        </S.Section>
        <S.Section>
          <div>
            <S.Title>비밀번호</S.Title>
            <S.InfoContent>{info?.password? info?.password : "******"}</S.InfoContent>
          </div>
          <S.ChangeBtn>변경</S.ChangeBtn>
        </S.Section>
        <S.Section>
          <div>
            <S.Title>생일</S.Title>
            <S.InfoContent>{info?.birth? info?.birth : "2001-01-01"}</S.InfoContent>
          </div>
          <S.ChangeBtn>변경</S.ChangeBtn>
        </S.Section>
        {/* {isOpenModal && (
          <EditInfoModal
            closeModal={closeModal}
          />
        )} */}

        <S.Section2>
          <S.DelBtn onClick={handleLogout}>로그아웃</S.DelBtn>
          <S.DelBtn onClick={handleDeleteUser}>회원 탈퇴하기</S.DelBtn>
        </S.Section2>
      </S.InfoContainer>
    </S.Div>
  );
};

export default EditInfo;
