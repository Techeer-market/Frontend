import React, { useState, useEffect, useCallback } from 'react';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import uploadimage from '../../assets/uploadimage.svg';
import categoryBar from '../../assets/categoryBar.svg';
import searchBtn from '../../assets/Search.svg';
import KakaoMap from '@/components/KakaoMap';
import { debounce } from 'lodash';
import { restFetcher } from '@/queryClient';

interface WriteProps {
  title: string;
  categoryName: string;
  description: string;
  price: number;
  image_url_1: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  location: string;
}

const WritePost = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0); // 실제 서버에 전달될 price
  const [location, setLocation] = useState('');
  const [representativeImage, setRepresentativeImage] = useState<File | null>(null); //대표이미지 선택

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (uploadedImages.length >= 4) {
        alert('사진은 최대 4장까지 업로드 가능합니다.');
        return;
      }
      // 선택된 이미지가 대표 이미지면 해제
      if (representativeImage === file) {
        setRepresentativeImage(null);
      }

      if (uploadedImages.length === 0) {
        setRepresentativeImage(file);
      }
      setUploadedImages((prevState) => [...prevState, file]);
    }
  };

  const handleSetRepresentativeImage = (imageFile: File) => {
    if (representativeImage === imageFile) {
      setRepresentativeImage(null); // 이미 대표 이미지인 경우 선택 해제
    } else {
      setRepresentativeImage(imageFile); // 다른 이미지를 선택한 경우 대표 이미지 변경
    }
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (
      !title ||
      !categoryName ||
      price === 0 ||
      !description ||
      uploadedImages.length === 0 ||
      !location
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('categoryName', categoryName);
    formData.append('price', price.toString());
    formData.append('description', description);

    uploadedImages.forEach((imageFile, index) => {
      const fieldName = `image_${index + 1}`;
      formData.append(fieldName, imageFile);
    });

    try {
      await restFetcher({
        method: 'POST',
        path: '/products',
        body: formData,
      });
      alert('게시물이 등록되었습니다.');
      window.location.href = '/'; // 메인 페이지로 리다이렉트
    } catch (error) {
      alert('게시물 등록에 실패했습니다.');
      console.log(error);
    }
  };

  // 금액 입력 함수 수정
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    setPrice(parseInt(value)); // 실제로 서버에 전달될 값
  };

  const debouncedSetLocation = useCallback(
    debounce((value) => setLocation(value), 1000),
    [],
  );

  return (
    <S.Writepost>
      <S.Nav>
        <Link to="/category">
          <img id="category" alt="To category" src={categoryBar}></img>
        </Link>
        <Link to="/search">
          <img id="search" alt="To search" src={searchBtn}></img>
        </Link>
      </S.Nav>

      <TopNavBar page="게시물 작성"></TopNavBar>

      <S.Wrap>
        <S.Img>
          <S.ImagesContainer>
            {' '}
            {/* 가로 스크롤을 위한 컨테이너 */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload">
              <img src={uploadimage} alt="Upload Image" style={{ cursor: 'pointer' }} />
            </label>
            {uploadedImages.map((imageFile, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <S.DeleteButton
                  onClick={() =>
                    setUploadedImages((prevState) => prevState.filter((file) => file !== imageFile))
                  }
                >
                  X
                </S.DeleteButton>
                <S.UploadedImg
                  key={index}
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded Image"
                  onClick={() => handleSetRepresentativeImage(imageFile)} // 이미지 클릭 시 대표 이미지로 설정
                />
                <button
                  onClick={() => handleSetRepresentativeImage(imageFile)}
                  style={{
                    position: 'absolute',
                    bottom: '1.5%',
                    width: '100%',
                    height: '30%', // 이미지 아래 40% 영역 설정
                    zIndex: 1, // 버튼이 이미지 위에 나타나도록 설정
                    backgroundColor: representativeImage === imageFile ? 'black' : 'transparent', // 대표 이미지가 설정된 경우 배경색 변경
                    color: representativeImage === imageFile ? 'white' : 'black', // 대표 이미지가 설정된 경우 텍스트 색상 변경
                    border: 'none',
                    borderBottomLeftRadius: representativeImage === imageFile ? '10.5px' : '0',
                    borderBottomRightRadius: representativeImage === imageFile ? '10.5px' : '0',
                    opacity: '0.8', // 배경색에 투명도 적용 (선택사항)
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {representativeImage === imageFile ? '대표 이미지' : ''}
                </button>

                {/* {index > 0 && <span>{`${index + 1}/5`}</span>} n/갯수를 표현한 방식*/}
              </div>
            ))}
          </S.ImagesContainer>
        </S.Img>
        <S.Form>
          <S.Row>
            <S.Label>
              제목
              <S.Input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`제목`}
              />
            </S.Label>
          </S.Row>
          <S.Row>
            <S.Label>
              카테고리:
              <S.Select
                name="categoryUuid"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder={`제목`}
              >
                <S.Option value="">카테고리 선택</S.Option>
                <S.Option value="디지털기기">디지털기기</S.Option>
                <S.Option value="여성의류">여성의류</S.Option>
                <S.Option value="남성의류/잡화">남성의류/잡화</S.Option>
                <S.Option value="뷰티/미용">뷰티/미용</S.Option>
                <S.Option value="여성잡화">여성잡화</S.Option>
                <S.Option value="생활가전">생활가전</S.Option>
                <S.Option value="생활/주방">생활/주방 </S.Option>
                <S.Option value="취미/게임/음반">취미/게임/음반</S.Option>
                <S.Option value="도서">도서</S.Option>
              </S.Select>
            </S.Label>
          </S.Row>

          <S.Row>
            <S.Label>
              가격
              <S.Input
                name="price"
                value={`${price.toLocaleString()}원`}
                onChange={handlePriceChange}
              />
            </S.Label>
          </S.Row>
        </S.Form>
        <S.Form>
          <S.Label>
            자세한 설명
            <S.TextArea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`신뢰할 수 있는 거래를 위해 자세히 적어주세요`}
            />
          </S.Label>
        </S.Form>
        <S.Row>
          <S.Label>
            거래 희망 장소
            <S.Input
              type="search"
              name="location"
              placeholder="거래 희망 장소를 입력해주세요."
              // value={location}
              onChange={(e) => debouncedSetLocation(e.target.value)}
            ></S.Input>
            <S.Map>
              <KakaoMap location={location} />
            </S.Map>
          </S.Label>
        </S.Row>

        <S.Buttons>
          <S.UploadButton type="submit" onClick={handleSubmit}>
            작성 완료
          </S.UploadButton>
        </S.Buttons>
      </S.Wrap>
      <NavBar />
    </S.Writepost>
  );
};

export default WritePost;
