import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; //스타일드 컴포넌트를 통해 스타일링
import NavBar from '@/components/NavBar'; //네비게이션바 불러옴
import uploadimage from '../../assets/uploadimage.svg'; // 이미지 업로더용 그림
import axios from 'axios'; //연동

const WritePost = () => {
    // 상태변수들을 정의
    // 순서대로 업로드된 이미지, 제목, 카테고리 UUID, 거래 타입, 가격, 설명, 사용자 UUID에 대한 상태를 관리
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [title, setTitle] = useState("");
    const [categoryUuid, setCategoryUuid] = useState("");
    const [type, setType] = useState("GeneralDeal");
    const [price, setPrice] = useState(0);  // 실제 서버에 전달될 price
    const [description, setDescription] = useState("");
    const [userUuid, setUserUuid] = useState("");
    // const [displayPrice, setDisplayPrice] = useState(""); // price 쉼표 및 "원" 기호 표기용 (수정하여 사용권장)

    //성한님 코드 : 로컬 스토리지에서 사용자 UUID를 가져와 userUuid 상태를 설정
    useEffect(() => {
        const uuid = localStorage.getItem('uuid');
        console.log({uuid})
        if(uuid){ 
            setUserUuid(uuid);
        }else{
            console.log("uuid 가 없습니다.")
        }
    }, []);

    // 버튼 클릭 시 거래 타입을 변경하는 함수 (일반거래 vs 쿨거래 택1)
    const handleTypeButtonClick = (event: React.MouseEvent, newType: "GeneralDeal" | "CoolDeal") => {
        event.preventDefault();
        setType(newType);
    };

    // 파일 입력 변경을 처리하는 함수 (최대 4개의 이미지만 업로드 가능)
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

    // 제출 버튼을 클릭했을 때 호출되는 함수
    const handleSubmit = () => {
        // 유효성 검사로 필요한 모든 정보가 입력되었는지 확인, 하나라도 입력 안되어 있으면 경고
        if (!title || !categoryUuid || !type || price === 0 || !description || uploadedImages.length === 0) {
            alert("모든 항목을 입력해주세요.");
            return;
        }
        // 모든 정보가 입력되면, 서버에 폼 데이터를 POST 요청하여 게시물을 등록
        // FormData 인스턴스를 생성 ('키',값) 쌍을 이용
        const formData = new FormData();

        formData.append('userUuid', userUuid);
        formData.append('title', title);
        formData.append('categoryUuid', categoryUuid);
        formData.append('tradeType', type);
        formData.append('price', price.toString());
        formData.append('description', description);

        // 각 업로드된 이미지를 formData에 추가하길 반복
        uploadedImages.forEach((imageFile, index) => {
            const fieldName = `image_${index + 1}`;
            formData.append(fieldName, imageFile);
          });

        console.log({ formData })
        // axios를 사용하여 서버에 POST 요청
        axios
        .post('http://54.180.142.116:8080/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response);
            alert('게시물이 등록되었습니다.');
            window.location.href = "/"; // 등록 성공시 자동으로 메인 페이지로 리다이렉트
        })
        .catch((error) => {
            console.error(error);
            alert('게시물 등록에 실패했습니다.'); //실패시 경고
        });
};

    // 금액 입력 함수 (가격 변경 핸들러), 서버에 전달될 값을 설정
    // 수정하여 사용권장
    // 쉼표가 생기는 시점부터 backspacebar로 지워서 수정하는게 불가하여 주석처리 시킴 
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
        // const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 쉼표 추가
        // setDisplayPrice(formattedValue + "원"); // 쉼표 & 원 디폴트값
        setPrice(parseInt(value)); // 실제로 서버에 전달될 값

};

//전체를 묶는 Writepost
//크게 네비바(NavBar)와 본문(Wrap) 둘로 나뉨
//본문(Wrap) 안에는 페이지제목(Title), 상품정보입력란(Form), 이미지업로드란(Img), 상품설명란(TextArea), 버튼(Buttons)으로 구역을 나눔
//상품정보입력란(Form)에는 제목(입력), 카테고리(dropdownlist로 선택), 거래 옵션(버튼 2중 택1), 금액(입력)을 (Row)로 묶어 1줄씩 총 4줄로 구성되어있고, 
//(Row)안에는 소제목란(Label)과 입력란(Input))/클릭란(Select,Optionbutton)으로 나뉘어 스타일링 되어있음
//이미지업로드란(Img)에서 이미지 업로더 및 삭제버튼 구현 (자세한 로직은 주석 참고)
//상품설명란(TextArea) 별거 없고, 버튼(Buttons) 스타일링 유사하여 두 개의 버튼(UploadButton,ReturnButton) 묶음
//당시 개념부족으로 스타일링 코드 중복이 많을지 모름 필요에 따라 수정 바람
return (
        <Writepost>
            <NavBar />
            <Wrap>
            <Title>게시물 등록</Title>
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
            {/* 이미지 업로드하는 파일 입력 필드, 'display: none'으로 설정되어 안 보임. 이미지 파일을 선택시 handleFileInputChange 함수 호출 */}
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileInputChange}
                    style={{ display: "none" }}
                />
                {/*  'file-upload' id를 가진 input 엘리먼트와 연결된 라벨 */}
                {/* 라벨 내부의 이미지를 클릭시 연결된 input 필드가 선택되어 이미지를 업로드 가능 */}
                <label htmlFor="file-upload">
                    <img src={uploadimage} alt="Upload Image" style={{ cursor: "pointer" }} />
                </label>
                {/* 배열을 순회하면서 각 이미지에 대한 UploadedImg 컴포넌트를 생성 */}
                {uploadedImages.map((imageFile, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        {/* 삭제 버튼, 클릭시 현재 이미지 uploadedImages 배열에서 제거 */}
                        <DeleteButton onClick={() => setUploadedImages(prevState => prevState.filter(file => file !== imageFile))}>
                            X
                        </DeleteButton>
                        {/* 업로드된 이미지를 보여주는 컴포넌트 */}
                        {/* URL.createObjectURL(imageFile): 이미지 파일에 대한 URL을 생성해주는 메소드,업로드된 이미지 미리보기 가능 */}
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
                <UploadButton type="submit" onClick={handleSubmit}>게시글 등록</UploadButton>
                <ReturnButton onClick={() => (window.location.href = "/")}>홈화면</ReturnButton>
            </Buttons>
            </Wrap>
        </Writepost>
    );
};

export default WritePost;

const Writepost = styled.div` //전체 페이지
    display: flex;
    flex-direction: column;
    font-family:"LINESeedKRBd";
    font-style: normal;
    font-weight: 700;
`;

const Wrap = styled.div` //네브바와 본문을 묶어줌 (본문만 세로로 가운데 정렬시기기 위함)
  display: flex;
  flex-direction: column; //세로 정렬
  align-items: center; //가운데 정렬
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
const Form = styled.form` //게시글 제목,카테고리,거래옵션,금액을 묶음
    display: flex;
    flex-direction: column;
    align-items: flex-start; //가운데 아닌 좌측부터 시작
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-bottom: 0.07rem solid #000000;
    width: 92.68rem;
    margin-bottom: 3rem;
    gap: 1rem;
`;
const Row = styled.div` //게시글 제목,카테고리,거래옵션,금액을 한 줄씩 스타일링
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
`;
const Label = styled.label`//각 줄 소제목
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
const OptionButton = styled.button<{ buttonType: string, isSelected: boolean }>`//거래 유형 버튼으로, 선택된 버튼은 색반전됨
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
    flex-direction: row; //가로 나열
    justify-content: flex-start; //왼쪽부터 시작
    padding-bottom: 2rem;
    margin-left: 2rem;
    width: 92.68rem;
    gap: 2rem;
`;
const UploadedImg = styled.img` //업로드된 이미지
  width: 166px;
  height: 166px;
  border-radius: 10.5px;
`;
const DeleteButton = styled.button` //업로드된 이미지의 삭제버튼
  position: absolute;
  top: 0rem;
  right: 0rem;
  border: none;
  background: #000000;
  color: #FFFFFF;
  font-size: 1.5rem;
  cursor: pointer; //마우스 갖다대면 커서 클릭형으로 바뀜
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextArea = styled.textarea` //상품 글로 설명하는 영역
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
const Buttons = styled.div` //버튼 묶음
    margin-bottom: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const UploadButton = styled.button` //등록하기 버튼
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
const ReturnButton = styled.button` //홈화면 이동버튼
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