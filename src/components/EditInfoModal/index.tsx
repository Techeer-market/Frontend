import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as S from './styles';
import { IoClose } from 'react-icons/io5';

interface Props {
  openModal: boolean;
  type: string; // email, password
  onRequestClose?: () => void;
  updateInfo?: (type: string, newValue: string) => void;
}

const EditInfoModal = ({ openModal, type, onRequestClose, updateInfo }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [typeErrorMessage, setTypeErrorMessage] = useState<string>(''); // 에러 메시지
  const [isCorrect, setIsCorrect] = useState<boolean>(false); // 입력값이 올바른지 표시

  // 창을 닫을 때 초기화
  useEffect(() => {
    setInputValue('');
    setTypeErrorMessage('');
    setIsCorrect(false);
  }, [onRequestClose]);

  // 이메일 형식 체크
  const checkEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(e.target.value)) {
      setTypeErrorMessage('이메일 형식이 아닙니다.');
      setIsCorrect(false);
    } else {
      setTypeErrorMessage('');
      setIsCorrect(true);
    }
  }, []);

  // 비밀번호 형식 체크
  // const checkPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {}, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (type === 'email') {
      checkEmail(e);
    }
  };

  const updateHandler = () => {
    if (updateInfo && type) {
      updateInfo(type, inputValue);
      onRequestClose && onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(217, 217, 217, 0.8)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '32rem',
          height: '16rem',
          border: 0,
          background: '#fff',
          overflow: 'auto',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        },
      }}
      contentLabel="Modal"
    >
      <S.BtnArea onClick={onRequestClose}>
        <IoClose style={{ width: '20px', height: '20px' }} />
      </S.BtnArea>

      <S.Contaniner>
        <S.Label>변경할 {type === 'email' ? '이메일' : '비밀번호'}</S.Label>
        {type === 'email' && (
          <S.InputBox
            name="email"
            placeholder="이메일을 입력해주세요."
            type="text"
            value={inputValue}
            onChange={inputChangeHandler}
          />
        )}
        {type === 'password' && (
          <S.InputBox
            name="password"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            value={inputValue}
            onChange={inputChangeHandler}
          />
        )}
        <S.ErrorMessage show={typeErrorMessage !== ''}>{typeErrorMessage}</S.ErrorMessage>
      </S.Contaniner>

      <S.EditBtn onClick={updateHandler} disabled={!isCorrect}>
        변경하기
      </S.EditBtn>
    </Modal>
  );
};

export default EditInfoModal;
