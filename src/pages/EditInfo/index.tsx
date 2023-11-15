import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import * as S from './styles';
import { AxiosError } from 'axios';
import EditInfoModal from '@/components/EditInfoModal';
import TopNavBar from '@/components/TopNavBar';
import { getClient, restFetcher } from '@/queryClient';
import { UserInfo } from '@/types/userInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

const EditInfo = () => {
  const navigate = useNavigate();
  const queryClient = getClient();
  const { clearTokens } = useAuth();
  // const reader = new FileReader();
  // const fileInput = useRef<HTMLInputElement | null>(null);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentModalType, setCurrentModalType] = useState<string>('');

  const openModal = (type: string) => {
    setCurrentModalType(type);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const { data: userInfo } = useQuery<UserInfo, AxiosError>(
    ['userInfo'],
    async () => {
      const response = await restFetcher({
        method: 'GET',
        path: '/users',
      });
      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
      // 자동 리프레시 비활성화
      refetchOnWindowFocus: false,
    },
  );

  // 프로필 이미지 업로드
  // const onImgChange = (e: any) => {
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile) {
  //     reader.readAsDataURL(selectedFile);
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         const newImage = reader.result as string;
  //         onInfoChange('image', newImage);

  //         setInfo({
  //           ...info,
  //           image: newImage,
  //         });
  //       }
  //     };
  //   } else {
  //     // 업로드가 취소
  //     setInfo({
  //       ...info,
  //       image: profile,
  //     });
  //     onInfoChange('image', profile);
  //   }
  // };

  const infoChangeMutation = useMutation(
    (updateInfo: UserInfo) => {
      return restFetcher({
        method: 'PATCH',
        path: '/users/update',
        body: updateInfo,
      });
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData(['userInfo'], response.data);
      },
    },
  );

  const infoChangeHandler = async (type: string, newValue: string) => {
    try {
      let updateInfo = {};
      if (type === 'email') updateInfo = { email: newValue };
      if (type === 'password') updateInfo = { password: newValue };

      await infoChangeMutation.mutateAsync(updateInfo as UserInfo);
    } catch (error) {
      alert('정보 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const logoutMutation = useMutation(() => {
    return restFetcher({
      method: 'POST',
      path: '/users/logout',
    });
  });

  const logoutHandler = async () => {
    try {
      await logoutMutation.mutateAsync();
      clearTokens();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserMutation = useMutation(() => {
    return restFetcher({
      method: 'DELETE',
      path: '/users',
    });
  });

  const deleteUserHandler = async () => {
    try {
      await deleteUserMutation.mutateAsync();
      clearTokens();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TopNavBar page="계정/정보 관리" />
      <S.InfoContainer>
        <S.ProfileContainer>
          <S.ChangeImg src={profile} alt="Profile" />
          <S.Name>{userInfo?.name}</S.Name>
        </S.ProfileContainer>

        {/* <S.ChangeProfile
          id="Profile"
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          name="profile_img"
          onChange={onImgChange}
          ref={fileInput}
          style={{ display: 'none' }}
        /> */}

        <S.Section>
          <div>
            <S.Title>이메일</S.Title>
            <S.InfoContent>{userInfo?.email}</S.InfoContent>
          </div>
          <S.ChangeBtn onClick={() => openModal('email')}>변경</S.ChangeBtn>
        </S.Section>
        <S.Section>
          <div>
            <S.Title>비밀번호</S.Title>
            {/* <S.InfoContent>{'******'}</S.InfoContent> */}
          </div>
          <S.ChangeBtn onClick={() => openModal('password')}>변경</S.ChangeBtn>
        </S.Section>

        <EditInfoModal
          openModal={isOpenModal}
          type={currentModalType}
          onRequestClose={closeModal}
          updateInfo={infoChangeHandler}
        />

        <S.Section2>
          <S.DelBtn onClick={logoutHandler}>로그아웃</S.DelBtn>
          <S.DelBtn onClick={deleteUserHandler}>회원 탈퇴하기</S.DelBtn>
        </S.Section2>
      </S.InfoContainer>
    </>
  );
};

export default EditInfo;
