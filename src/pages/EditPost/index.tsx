import React, { useState, useEffect } from 'react';//React 및 필요한 훅
import styled from 'styled-components';//스타일링을 위해
import NavBar from '@/components/NavBar';//NavBar 컴포넌트
import uploadimage from '../../assets/uploadimage.svg';
import axios from 'axios';//HTTP 요청을 보내기 위해
import { useParams } from 'react-router-dom';//리액트 라우터의 Link 컴포넌트(경로이동용)

const EditPost  = () => {
    // 상태 정의
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [title, setTitle] = useState("");
    const [categoryUuid, setCategoryUuid] = useState("");
    const [type, setType] = useState("GeneralDeal");
    const [price, setPrice] = useState(0);  // 실제 서버에 전달될 price
    // const [displayPrice, setDisplayPrice] = useState(""); // price 쉼표 및 "원" 기호 표기용
    const [description, setDescription] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const { productUuid } = useParams();

    useEffect(() => { //성한님이 작성한 사용자 UUID를 로컬스토리지로부터 가져오는 부분
        const uuid = localStorage.getItem('uuid');
        console.log({uuid})
        if(uuid){ 
            setUserUuid(uuid);
        }else{
            console.log("uuid 가 없습니다.")
        }
    }, []);
    // 수정하려는 게시글 정보를 서버로부터 불러옴
    useEffect(() => {
        const getProduct = async () => {
          try { //get메서드로 등록한 정보 불러오기 요청
            const response = await axios.get(`http://54.180.142.116:8080/api/products/list/${productUuid}`);
            const productData = response.data;
            setTitle(productData.title);
            setCategoryUuid(productData.categoryUuid);
            setType(productData.tradeType);
            setPrice(productData.price);
            setDescription(productData.description);
            // 이미지들이 있다면 이미지들을 상태에 저장
            if (productData.imageUrls && productData.imageUrls.length > 0) {
              const images = productData.imageUrls.map((imageUrl) => ({
                file: null,
                url: imageUrl,
              }));
              setUploadedImages(images);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        getProduct();
      }, [productUuid]);

    //거래타입 수정  
    const handleTypeButtonClick = (event: React.MouseEvent, newType: "GeneralDeal" | "CoolDeal") => {
        event.preventDefault();
        setType(newType);
    };
    //수정 필수!!!!!!!!!!!! 급하게 복붙하여 오류나는 이미지 업로드 함수..수정사항이 적용 안됨
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (uploadedImages.length >= 4) {
            alert("사진은 최대 4장까지 업로드 가능합니다.");
            return;
          }
          setUploadedImages((prevState) => [...prevState, file]);
        }
    };
    //게시글 수정 요청
    const handleSubmit = () => {
        // 유효성 검사
        if (!title || !categoryUuid || !type || price === 0 || !description || uploadedImages.length === 0) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('userUuid', userUuid);
        formData.append('title', title);
        formData.append('categoryUuid', categoryUuid);
        formData.append('tradeType', type);
        formData.append('price', price.toString());
        formData.append('description', description);
        // 업로드한 이미지 파일들을 formData에 추가
        uploadedImages.forEach((imageFile, index) => {
            const fieldName = `image_${index + 1}`;
            formData.append(fieldName, imageFile);
          });

        console.log({ formData })
        //put 메서드로 게시글 수정 요청
        axios
            .put(`http://54.180.142.116:8080/api/products/${productUuid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response);
                alert('게시물이 수정되었습니다.');
                window.location.href = "/saleslist"; // 판매리스트로 리다이렉트
            })
            .catch((error) => {
                console.error(error);
                alert('게시물 수정에 실패했습니다.');
            });
};

// 금액 입력 함수 수정
const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    // const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 쉼표 추가
    // setDisplayPrice(formattedValue + "원"); // 쉼표 & 원 디폴트값
    setPrice(parseInt(value)); // 실제로 서버에 전달될 값
};
//아래는 WritePost와 유사하니 그 코드에서 확인 바람
return (
        <Writepost>
            <NavBar />
            <Wrap>
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
                        <Option value="c3314dca-327b-4187-b0ab-6f67def9fa51">Fashion</Option>
                        <Option value="339884f8-50de-429a-9f3b-543342609b21">Electronic</Option>
                        <Option value="7d2d94b9-c79f-4ce9-9904-28cc7e78df5a">Living</Option>
                        <Option value="d0daf4dc-89c8-41bf-8ec1-339d6e037b26">Book/Magazine</Option>
                        <Option value="5e342c92-75fa-41fd-af0f-867e5c83b831">Food</Option>
                    </Select>
                </Row>
                <Row>
                    <Label>옵션 선택:</Label>
                    <OptionButton buttonType="GeneralDeal" isSelected={type === "GeneralDeal"} onClick={(e) => handleTypeButtonClick(e, "GeneralDeal")}>일반거래</OptionButton>
                    <OptionButton buttonType="CoolDeal" isSelected={type === "CoolDeal"} onClick={(e) => handleTypeButtonClick(e, "CoolDeal")}>쿨거래</OptionButton>
                </Row>
                <Row>
                    <Label>금액:</Label>
                    <Input name="price" value={price} onChange={handlePriceChange} />
                </Row>
            </Form>
            <Img>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileInputChange}
                    style={{ display: "none" }}
                />
                <label htmlFor="file-upload">
                    <img src={uploadimage} alt="Upload Image" style={{ cursor: "pointer" }} />
                </label>
                {uploadedImages.map((imageFile, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        <DeleteButton onClick={() => setUploadedImages(prevState => prevState.filter(file => file !== imageFile))}>
                            X
                        </DeleteButton>
                        <UploadedImg key={index} src={URL.createObjectURL(imageFile)} alt="Uploaded Image" />
                    </div>
                ))}
            </Img>
            <TextArea name="description" value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder={`
                
      상품에 대한 설명해주세요
      -구매 시기
      -브랜드/모델명
      -제품의 상태(사용감, 하자 유무 등)
      -서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품 사진을 올려주세요
      안전하고 건전한 거래 환경을 위해 테커마켓이 함께합니다.`
                }
            />
            <Buttons>
                <UploadButton type="submit" onClick={handleSubmit}>수정완료</UploadButton>
                <ReturnButton onClick={() => (window.location.href = "/saleslist")}>돌아가기</ReturnButton>
            </Buttons>
            </Wrap>
        </Writepost>
    );
};

export default EditPost;

const Writepost = styled.div`
    display: flex;
    flex-direction: column;
    font-family:"LINESeedKRBd";
    font-style: normal;
    font-weight: 700;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3.5rem;
    padding-bottom: 6rem;
    border-bottom: 0.07rem solid #000000;
    width: 92.68rem;
    font-size: 3rem;
    line-height: 4.1rem;
    font-weight: bold;
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
const OptionButton = styled.button<{ buttonType: string, isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? "#000000" : "#EFEFEF")};
  color: ${({ isSelected }) => (isSelected ? "#FFFFFF" : "#000000")};
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
  color: #FFFFFF;
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
    font-size: 2rem;
    padding: 2rem 0 0 2rem;
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