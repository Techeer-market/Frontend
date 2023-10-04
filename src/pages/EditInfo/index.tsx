import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import * as S from './styles';
import axios from 'axios';
import userID from '@/redux/userID';
import EditInfoModal from '@/components/EditInfoModal';
import TopNavBar from '@/components/TopNavBar';

interface Info {
  email: string;
  password: string;
  birth: string;
  image: string;
}

const EditInfo = ({ getThumb }: any) => {
  const navigate = useNavigate();
  const reader = new FileReader();

  const [info, setInfo] = useState<Info>({
    email: "",
    password: "",
    birth: "",
    image: profile,
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentModalType, setCurrentModalType] = useState<"email" | "password" | "birth" | null>(null);

  const fileInput = useRef<HTMLInputElement | null>(null);

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
  }, []);

  const onImgChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        if (reader.readyState === 2) {
          const newImage = reader.result as string;
          onInfoChange('image', newImage);

          setInfo({
            ...info,
            image: newImage,
          });
        }
      };
    } else {
      // 업로드가 취소
      setInfo({
        ...info,
        image: profile,
      });
      onInfoChange('image', profile);
    }
  };

  // 정보 업데이트
  const onInfoChange = (type: "email" | "password" | "birth" | "image" | null, newValue: string) => {
    const updatedInfo = { ...info };
    if (type === 'email') updatedInfo.email = newValue;
    if (type === 'password') updatedInfo.password = newValue;
    if (type === 'birth') updatedInfo.birth = newValue;
    if (type === 'image') updatedInfo.image = newValue;

    axios.patch(`http://localhost:8080/api/users/update`, updatedInfo)
    .then(response=>{
      setInfo(response.data);
      alert('정상적으로 변경되었습니다.');
    })
    .catch(error=>{
      console.error(error);
      alert('변경에 실패하였습니다. 다시 시도해주세요.');
    })
  };

  const openModal = (type: "email" | "password" | "birth") => {
    setCurrentModalType(type);
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
    <>
      <TopNavBar page="계정/정보 관리"/>
      <S.ProfileContainer>
        <label htmlFor="Profile">
          <S.ChangeName src={info.image} alt="Profile" />
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
          <S.ChangeBtn onClick={() => openModal('email')}>변경</S.ChangeBtn>
        </S.Section>
        <S.Section>
          <div>
            <S.Title>비밀번호</S.Title>
            <S.InfoContent>{info?.password? info?.password : "******"}</S.InfoContent>
          </div>
          <S.ChangeBtn onClick={() => openModal('password')}>변경</S.ChangeBtn>
        </S.Section>
        <S.Section>
          <div>
            <S.Title>생일</S.Title>
            <S.InfoContent>{info?.birth? info?.birth : "2001-01-01"}</S.InfoContent>
          </div>
          <S.ChangeBtn onClick={() => openModal('birth')}>변경</S.ChangeBtn>
        </S.Section>
        
        <EditInfoModal
          openModal={isOpenModal}
          type={currentModalType}
          value=''
          onRequestClose={closeModal}
          updateInfo={onInfoChange}
        />
        
        <S.Section2>
          <S.DelBtn onClick={handleLogout}>로그아웃</S.DelBtn>
          <S.DelBtn onClick={handleDeleteUser}>회원 탈퇴하기</S.DelBtn>
        </S.Section2>
      </S.InfoContainer>
    </>
  );
};

export default EditInfo;
