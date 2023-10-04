import React, { useState } from 'react';
import Modal from 'react-modal';
import * as S from './styles';
import { IoClose } from "react-icons/io5";

interface Props {
    openModal: boolean;
    type: "email" | "password" | "birth" | null;
    value: string;
    onRequestClose?: () => void;
    updateInfo?: (type: "email" | "password" | "birth" | null, newValue: string) => void;
}

const EditInfoModal = ({ openModal, type, value, onRequestClose, updateInfo }: Props) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    
    const handleUpdate = () => {
        if(updateInfo && type) {
            updateInfo(type, inputValue);
            setInputValue('');
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
                    backgroundColor: 'rgba(217, 217, 217, 0.8)'
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
                    flexDirection: 'column'
                }
              }}
            contentLabel="Modal"
        >
            <S.BtnArea onClick={onRequestClose}>
                <IoClose style={{width: "20px", height: "20px"}}/>
            </S.BtnArea>

            <S.Contaniner>
                <S.Label>
                    변경할 {type === 'email' ? '이메일' : (
                        type === 'password'? '비밀번호' : '생일'
                    )}
                </S.Label>
                {type === 'email' && <S.InputBox type='text' value={inputValue} onChange={handleInputChange} />}
                {type === 'password' && <S.InputBox type='password' value={inputValue} onChange={handleInputChange} />}
                {type === 'birth' && <S.InputBox type='date' value={inputValue} onChange={handleInputChange} />}
            </S.Contaniner>
            
            <S.EditBtn onClick={handleUpdate}>변경하기</S.EditBtn>
        </Modal>
    )
}

export default EditInfoModal;