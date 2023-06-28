import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '@/components/NavBar';
import uploadimage from '../../assets/uploadimage.svg';
import axios from 'axios';

const EditPost = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [categoryUuid, setCategoryUuid] = useState('');
    const [type, setType] = useState('normal');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productUuid, setProductUuid] = useState('');
  
    const handleTypeButtonClick = (newType) => {
      setType(newType);
    };
  
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      if (uploadedImages.length >= 4) {
        alert('사진은 최대 4장까지 업로드 가능합니다.');
        return;
      }
  
      reader.onloadend = () => {
        setUploadedImages((prevState) => [...prevState, reader.result]);
      };
  
      reader.readAsDataURL(file);
    };
  
    const handleSubmit = () => {
      // 유효성 검사
      if (!title || !categoryUuid || !type || !price || !description || uploadedImages.length === 0) {
        alert('모든 항목을 입력해주세요.');
        return;
      }
  
      const data = {
        categoryUuid,
        title,
        description,
        price,
        tradeType: type,
      };
  
      axios
        .put(`http://localhost:8080/api/products/${productUuid}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          const { title, description, price, tradeType } = response.data;
  
          console.log(title);
          console.log(description);
          console.log(price);
          console.log(tradeType);
  
          alert('게시물이 수정되었습니다.');
        })
        .catch((error) => {
          console.error(error);
          alert('게시물 수정에 실패했습니다.');
        });
    };
  
    useEffect(() => {
      const fetchPostData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/products/${productUuid}`);
          const postData = response.data;
          setTitle(postData.title);
          setCategoryUuid(postData.categoryUuid);
          setType(postData.tradeType);
          setPrice(postData.price);
          setDescription(postData.description);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPostData();
    }, [productUuid]);
  

    return (
        <Editpost>
            <NavBar />
            <Title>게시물 수정</Title>
            <Form>
                <Row>
                    <Label>제목:</Label>
                    <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Row> 
                <Row>
                    <Label>카테고리:</Label>
                    <Select name="categoryUuid" value={categoryUuid} onChange={(e) => setCategoryUuid(e.target.value)}>
                        <Option value="">카테고리 선택</Option>
                        <Option value="electronic">Electronic</Option>
                        <Option value="living">Living</Option>
                        <Option value="book_magazine">Book/Magazine</Option>
                        <Option value="food">Food</Option>
                        <Option value="fashion">Fashion</Option>
                    </Select>
                </Row>
                <Row>
                    <Label>옵션 선택:</Label>
                    <OptionButton type="normal" checked={type === "normal"} onClick={() => handleTypeButtonClick("normal")}>일반거래</OptionButton>
                    <OptionButton type="cool" checked={type === "cool"} onClick={() => handleTypeButtonClick("cool")}>쿨거래</OptionButton>
                </Row>
                <Row>
                    <Label>금액:</Label>
                    <Input name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </Row>
            </Form>
            <Img>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileInputChange}
                style={{ display: "none" }}
            />
            <label htmlFor="file-upload">
                <img src={uploadimage} alt="Upload Image" style={{ cursor: "pointer" }} />
            </label>
            {uploadedImages.map((imageUrl) => (
            <div style={{ position: "relative" }}>
                <DeleteButton onClick={() => setUploadedImages(prevState => prevState.filter(img => img !== imageUrl))}>
                X
                </DeleteButton>
                <UploadedImg key={imageUrl} src={imageUrl} alt="Uploaded Image"/>
            </div>
            ))}
            </Img>
            <TextArea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <Buttons>
            <UploadButton type="submit" onClick={handleSubmit}>게시글 수정</UploadButton>
                <ReturnButton onClick={() => (window.location.href = "/")}>돌아가기</ReturnButton>
            </Buttons>
        </Editpost>
    );
};

export default EditPost;

const Editpost = styled.div`
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

    font-size: 3rem;
    line-height: 4.1rem;
    font-weight: bold;
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
    border-radius: 10px;
    border: none;
    font-size: 1.5rem;
    padding-left: 1rem;
`;
const Select = styled.select`
    display: flex;
    width: 70%;
    height: 2.4rem;
    background: #EFEFEF;
    border-radius: 10px;
    border: none;
    font-size: 1.5rem;
    padding-left: 0.5rem;

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
    background-color: ${({ checked }) => (checked ? "#000000" : "#EFEFEF")};
    color: ${({ checked }) => (checked ? "#FFFFFF" : "#000000")};
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
const UploadedImg = styled.img`
  width: 166px;
  height: 166px;
  border-radius: 10.5px;
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 0rem;
  right: 0rem;
  border: none;
  background: #000000;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.4rem;
    height: 60rem;
    left: 29.3rem;
    top: 73.7rem;
    background: #FFFFFF;
    box-shadow: 0px 0.2rem 0.4rem rgba(0, 0, 0, 0.25), inset 0px 2.8px 4.9px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 1.7rem;
    border: none;
    
    font-size: 1.5rem;
    padding: 1.4rem 0 0 1.4rem;
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
    height: 4.2rem;
    left: 29.27rem;
    top: 160rem;
    color: #FFFFFF;
    background: #000000;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    border: none;
    cursor: pointer;

    font-size: 2.5rem;
    line-height: 4.1rem;
`;
const ReturnButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.47rem;
    height: 4.2rem;
    left: 29.27rem;
    top: 167.6rem;
    background: #EFEFEF;
    border-radius: 10px;
    border: none;
    cursor: pointer;

    font-size: 2.5rem;
    line-height: 4.1rem;
`;