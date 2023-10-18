import styled from 'styled-components';

export const BtnArea = styled.button`
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

export const Contaniner = styled.div`
    padding-bottom: 20px;
`

export const Label = styled.span`
    padding-right: 14px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
`

export const InputBox = styled.input`
    appearance: none;
    border: 0;
    padding: 0;
    background-color: transparent;
    border-bottom: 1px solid #D9D9D9;
    font-size: 14px;
    color: #828385;
`

export const EditBtn = styled.button`
    width: 60px;
    height: 24px;
    font-size: 12px;
    appearance: none;
    border: 0;
    border-radius: 10px;
    background-color: #FD8944;
    color: #FFF;
`