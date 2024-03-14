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
import { ApiResponseType } from '@/types/apiResponseType';

const EditInfo = () => {
  const navigate = useNavigate();
  const queryClient = getClient();

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
      onError: (error) => {
        const err = error as AxiosError<ApiResponseType>;
        let errorMessage =
          err.response?.data.errorMessage || '정보 변경에 실패했습니다. 다시 시도해주세요.';
        alert(errorMessage);
      },
    },
  );

  const handleInfoChange = async (type: string, newValue: string | null) => {
    let updateInfo = {};
    if (type === 'email') updateInfo = { email: newValue };
    if (type === 'password') updateInfo = { password: newValue };

    await mutateInfoChange.mutateAsync(updateInfo as UserInfo);
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
            <S.ChangeImg src={userInfo?.profileUrl ? userInfo.profileUrl : profile} alt="Profile" />
            <S.Name>{userInfo?.name}</S.Name>
          </S.ProfileContainer>
        </S.Section>

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
