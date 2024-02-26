import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '@/assets/profile.png';
import * as S from './styles';
import { AxiosError } from 'axios';
import EditInfoModal from '@/components/EditInfoModal';
import TopNavBar from '@/components/TopNavBar';
import { getClient, restFetcher } from '@/queryClient';
import { UserInfo } from '@/types/userInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { clearLocalStorage } from '@/hooks/useTokenRefreshTimer';
import { IoCamera } from 'react-icons/io5';

const EditInfo = () => {
  const navigate = useNavigate();
  const queryClient = getClient();
  // const fileInput = useRef<HTMLInputElement>(null);

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

  // 파일 입력(input) 엘리먼트를 클릭
  // const openFileInput = () => {
  //   if (fileInput.current) {
  //     fileInput.current.click();
  //   }
  // };

  // 프로필 이미지 업로드
  // const onChangeImg = (e: any) => {
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(selectedFile);
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         // base64 형식 url 반환
  //         const base64Image = reader.result as string;
  //         handleInfoChange('profileUrl', base64Image);
  //       }
  //     };
  //   }
  // };

  // 프로필 이미지 삭제
  // const onDeleteImg = () => {
  //   if (!userInfo?.profileUrl) {
  //     alert('프로필 이미지가 없습니다.');
  //     return;
  //   }
  //   let result = confirm('프로필 이미지를 삭제하시겠습니까?');
  //   if (result === true && userInfo?.profileUrl) {
  //     handleInfoChange('profileUrl', null);
  //   }
  // };

  const mutateInfoChange = useMutation(
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

  const handleInfoChange = async (type: string, newValue: string | null) => {
    try {
      let updateInfo = {};
      if (type === 'email') updateInfo = { email: newValue };
      if (type === 'password') updateInfo = { password: newValue };
      // if (type === 'profileUrl') updateInfo = { profileUrl: newValue };

      await mutateInfoChange.mutateAsync(updateInfo as UserInfo);
    } catch (error) {
      alert('정보 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const mutateLogout = useMutation(() => {
    return restFetcher({
      method: 'POST',
      path: '/users/logout',
    });
  });

  const handleLogout = async () => {
    try {
      await mutateLogout.mutateAsync();
      clearLocalStorage();
      navigate('/', { replace: true });
    } catch (error) {
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const mutateDeleteUser = useMutation(() => {
    return restFetcher({
      method: 'DELETE',
      path: '/users',
    });
  });

  const handleDeleteUser = async () => {
    try {
      await mutateDeleteUser.mutateAsync();
      clearLocalStorage();
      navigate('/', { replace: true });
    } catch (error) {
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <TopNavBar page="계정/정보 관리" />

      <S.InfoContainer>
        <S.Section style={{ paddingBottom: '4.4rem' }}>
          <S.ProfileContainer>
            <S.ChangeImg
              src={userInfo?.profileUrl ? userInfo.profileUrl : profile}
              alt="Profile"
              // onClick={openFileInput}
            />

            {/* <S.CameraIcom> */}
              {/* <IoCamera size={10} /> */}
            {/* </S.CameraIcom> */}

            <S.Name>{userInfo?.name}</S.Name>
          </S.ProfileContainer>
          {/* <S.ChangeBtn onClick={() => onDeleteImg()}>삭제</S.ChangeBtn> */}
        </S.Section>

        {/* <S.ChangeProfile
          id="Profile"
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          name="profile_img"
          onChange={onChangeImg}
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
          </div>
          <S.ChangeBtn onClick={() => openModal('password')}>변경</S.ChangeBtn>
        </S.Section>

        <EditInfoModal
          openModal={isOpenModal}
          type={currentModalType}
          onRequestClose={closeModal}
          updateInfo={handleInfoChange}
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
