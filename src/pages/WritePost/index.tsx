import React, { useState, useEffect, useCallback } from 'react';
// import imageCompression from 'browser-image-compression';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import uploadimage from '../../assets/uploadimg.svg';
import categoryBar from '../../assets/categoryBar.svg';
import searchBtn from '../../assets/Search.svg';
import KakaoMap from '@/components/KakaoMap';
import { debounce } from 'lodash';
import { restFetcher } from '@/queryClient';
import NoImg from '../../assets/noImg.svg';

import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [price, setPrice] = useState(0); // 실제 서버에 전달될 price
  const [productImages, setProductImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [representativeImage, setRepresentativeImage] = useState<File | null>(null); //대표이미지 선택

  const [files, setFiles] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (productImages.length >= 4) {
        alert('사진은 최대 4장까지 업로드 가능합니다.');
        return;
      }
      // 선택된 이미지가 대표 이미지면 해제
      if (representativeImage === file) {
        setRepresentativeImage(null);
      }

      if (productImages.length === 0) {
        setRepresentativeImage(file);
      }
      setProductImages((prevState) => [...prevState, file]);
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
    if (!title || !categoryName || price === 0 || !content || !location) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('categoryName', categoryName);
    formData.append('price', price.toString());

    // 사진이 있는 경우
    if (productImages.length > 0) {
      productImages.forEach((imageFile, index) => {
        formData.append('productImages', imageFile);
      });

      productImages.forEach((imageFile, index) => {
        const fieldName = `image_${index + 1}`;
        formData.append(fieldName, imageFile);
      });

      // 대표 이미지 설정
      if (representativeImage) {
        formData.append('representativeImage', representativeImage);
      }
    }

    // 사진이 없는 경우
    if (productImages.length === 0) {
      const noImgBlob = await fetch(NoImg).then((res) => res.blob());
      formData.append('productImages', noImgBlob);
    }
    // 조건 처리 해주기

    // formData.append('productImages', new Blob());

    // productImages.forEach((imageFile, index) => {
    //   formData.append('productImages', imageFile);
    // });

    // productImages.forEach((imageFile, index) => {
    //   const fieldName = `image_${index + 1}`;
    //   formData.append(fieldName, imageFile);
    // });
    formData.append('location', location);

    console.log('a');

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
      console.log('aa', error);
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
      <S.NavContainer className="Nav">
        <TopNavBar page="게시물 작성"></TopNavBar>
        <S.Nav>
          <S.ClickArea>
            <Link to="/category">
              <RxHamburgerMenu style={{ width: '25px', height: '25px' }} />

              {/* <img id="category" alt="To category" src={categoryBar}></img> */}
            </Link>
          </S.ClickArea>
          <S.ClickArea>
            <Link to="/search">
              <IoSearchOutline style={{ width: '25px', height: '25px' }} />
              {/* <img id="search" alt="To search" src={searchBtn}></img> */}
            </Link>
          </S.ClickArea>
        </S.Nav>
      </S.NavContainer>

      <S.Wrap>
        <S.scroll className="scroll">
          <S.Img>
            <S.ImagesContainer>
              {' '}
              <label
                htmlFor="file-upload"
                className="upload-label"
                style={{ position: 'relative' }}
              >
                <span
                  className="image-count"
                  style={{
                    color: 'orange',
                    fontSize: '16px',
                  }}
                >
                  <>
                    {productImages.length}
                    <span style={{ fontSize: '16px', color: 'black' }}>/4</span>
                  </>
                </span>
                <img
                  src={uploadimage}
                  alt="Upload Image"
                  style={{ cursor: 'pointer', width: '130px', height: '130px' }}
                />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
              {productImages.map((imageFile, index) => (
                <div key={index} style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <S.DeleteButton
                    onClick={() =>
                      setProductImages((prevState) =>
                        prevState.filter((file) => file !== imageFile),
                      )
                    }
                  >
                    X
                  </S.DeleteButton>
                  <S.UploadedImg
                    key={index}
                    src={URL.createObjectURL(imageFile)}
                    alt="Uploaded Image"
                    style={{ cursor: 'pointer', width: '130px', height: '130px' }}
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
                </div>
              ))}
              {productImages.length === 0 && (
                <img src={NoImg} alt="No Image" style={{ width: '130px', height: '130px' }} />
              )}
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
                카테고리
                <S.Select
                  name="categoryUuid"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                >
                  <S.Option disabled value="">
                    카테고리 선택
                  </S.Option>
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
                  value={`${price.toLocaleString()}`}
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`신뢰할 수 있는 거래를 위해 자세히 적어주세요`}
                style={{ color: 'black', fontSize: '15px' }}
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

          <S.UploadButton type="submit" onClick={handleSubmit}>
            작성 완료
          </S.UploadButton>
        </S.scroll>
      </S.Wrap>

      <NavBar />
    </S.Writepost>
  );
};

export default WritePost;
