import React from 'react';
import styled from 'styled-components';
import NavBar from '@/components/NavBar';
import uploadimage from '../../assets/uploadimage.svg';

const WritePost = () => {
    return (
        <Writepost>
            <NavBar />
            <Title>게시물 등록</Title>
            <Form>
                <Row>
                    <Label>제목:</Label>
                    <Input/>
                </Row> 
                <Row>
                    <Label>카테고리:</Label>
                    <Select>
                        <Option>카테고리 선택</Option>
                        <Option>Electronic</Option>
                        <Option>Living</Option>
                        <Option>Book/Magazine</Option>
                        <Option>Food</Option>
                        <Option>Fashion</Option>
                    </Select>
                </Row>
                <Row>
                    <Label>옵션 선택:</Label>
                    <OptionButton>일반거래</OptionButton>
                    <OptionButton>쿨거래</OptionButton>
                </Row>
                <Row>
                    <Label>금액:</Label>
                    <Input/>
                </Row>
            </Form>
            <Img>
            <img src={uploadimage} alt="Upload Image" style={{ cursor: "pointer" }} />
            </Img>
            <TextArea />
            <Buttons>
                <UploadButton>게시글 등록</UploadButton>
                <ReturnButton>돌아가기</ReturnButton>
            </Buttons>
        </Writepost>
    );
};

export default WritePost;

const Writepost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    font-family:"LINESeedKRBd";
    font-style: normal;
    font-weight: 700;
`;
const Title = styled.h1`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
    padding-bottom: 6rem;
    border-bottom: 0.07rem solid #000000;
    width: 92.68rem;

    font-size: 3.36rem;
    line-height: 4.1rem;
    /* identical to box height */
    color: #000000;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-bottom: 0.07rem solid #000000;
    width: 92.68rem;
    margin-bottom: 3rem;
    gap: 1rem;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
`;
const Label = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 2rem;
    line-height: 2.4rem;
    color: #000000;
    width: 30%;
`;
const Input = styled.input`
    display: flex;
    width: 70%;
    height: 2.4rem;
    background: #EFEFEF;
    border-radius: 1.05rem;
    border: none;
    font-size: 1.5rem;
`;
const Select = styled.select`
    display: flex;
    width: 70%;
    height: 2.4rem;
    background: #EFEFEF;
    border-radius: 1.05rem;
    border: none;
    font-size: 1.5rem;

  &:focus {
    outline: none;
    border: 0.1rem solid black;
  }
`;
const Option = styled.option`
    color: black;
    font-size: 1.5rem;
`;
const OptionButton = styled.button`
    background-color:#EFEFEF;
    color: #000000;
    border-radius: 1.05rem;
    border: none;
    cursor: pointer;
    margin-right: 1.5%;
    height: 2.4rem;
    font-size: 1.5rem;
`;
const Img = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-bottom: 2rem;
    margin-left: 2rem;
    width: 92.68rem;
    gap: 2rem;
`;
const TextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.4rem;
    height: 84.3rem;
    left: 29.3rem;
    top: 73.7rem;
    background: #FFFFFF;
    box-shadow: 0px 0.2rem 0.4rem rgba(0, 0, 0, 0.25), inset 0px 2.8px 4.9px rgba(0, 0, 0, 0.25);
    border-radius: 2.1rem;
    margin-bottom: 1.7rem;
    border: none;

    font-size: 1.5rem;
`;
const Buttons = styled.div`
    margin-bottom: 20rem;
`;
const UploadButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.47rem;
    height: 5.6rem;
    left: 29.27rem;
    top: 160rem;
    color: #FFFFFF;
    background: #000000;
    border-radius: 1.05rem;
    margin-bottom: 1.25rem;
    border: none;
    cursor: pointer;

    font-size: 2.8rem;
    line-height: 4.1rem;
`;
const ReturnButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.47rem;
    height: 5.6rem;
    left: 29.27rem;
    top: 167.6rem;
    background: #EFEFEF;
    border-radius: 1.05rem;
    border: none;
    cursor: pointer;

    font-size: 2.8rem;
    line-height: 4.1rem;
`;