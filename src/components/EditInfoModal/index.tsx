import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

interface Props {
    openModal: boolean;
    type: "이메일" | "비밀번호" | "생일" | null;
    value: string;
    onRequestClose?: () => void;
    updateInfo?: (type: "이메일" | "비밀번호" | "생일" | null, newValue: string) => void;
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
            <BtnArea onClick={onRequestClose}>
                <IoClose style={{width: "20px", height: "20px"}}/>
            </BtnArea>

            <Contaniner>
                <Label>변경할 {type}</Label>
                {type === '이메일' && <InputBox type='text' value={inputValue} onChange={handleInputChange} />}
                {type === '비밀번호' && <InputBox type='password' value={inputValue} onChange={handleInputChange} />}
                {type === '생일' && <InputBox type='date' value={inputValue} onChange={handleInputChange} />}
            </Contaniner>
            
            <EditBtn onClick={handleUpdate}>변경하기</EditBtn>
        </Modal>
    )
}

const BtnArea = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 3rem;
    height: 3rem;
    appearance: none;
    border: 0;
    padding: 0;
    background-color: transparent;
    &:hover {
        cursor: pointer;
        color: #828385;
    }
`

const Contaniner = styled.div`
    padding-bottom: 20px;
`

const Label = styled.span`
    padding-right: 14px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
`

const InputBox = styled.input`
    appearance: none;
    border: 0;
    padding: 0;
    background-color: transparent;
    border-bottom: 1px solid #D9D9D9;
    font-size: 14px;
    color: #828385;
`

const EditBtn = styled.button`
    width: 60px;
    height: 24px;
    font-size: 12px;
    appearance: none;
    border: 0;
    border-radius: 10px;
    background-color: #FD8944;
    color: #FFF;
`

export default EditInfoModal;