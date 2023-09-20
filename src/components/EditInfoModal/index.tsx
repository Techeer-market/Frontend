import styled from 'styled-components';

interface Props {
    type: "email" | "password" | "birth";
    value: string;
    closeModal?: () => void;
}

const EditInfoModal = ({ type, value, closeModal }: Props) => {
    return (
        <ModalWrap>

        </ModalWrap>
    )
}

const ModalWrap = styled.div`

`

export default EditInfoModal;