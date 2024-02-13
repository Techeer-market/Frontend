import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const MainDiv = styled.div`
  flex-direction: column;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const NavContainer = styled.div`
  width: 48rem;
  height: 8rem;
  background-color: white;
  z-index: 50;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  img {
    width: 20%;
    margin-left: 5%;
  }
`;

export const NavLink = styled.div`
  display: flex;
  width: 7rem;
  justify-content: space-between;
  align-items: end;
  #category {
    width: 2.5rem;
    height: 2.5rem;
  }
  #search {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const scroll = styled.div`
  /*무제한 스크롤를 위해 동적으로 계산해야함*/
  overflow-y: scroll;
  max-height: 800px;
`;

export const MainContainer = styled.div`
  flex-grow: 1;
`;

export const TextDiv = styled.div`
  width: 48rem;
  height: 121px;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(217, 217, 217, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 0rem;

  /* position 속성 추가 (그래야 위치 조정이 가능!)*/
  position: relative;
  left: 10px;
`;

export const KorText = styled.h3`
  width: 397px;
  height: 121px;
  flex-shrink: 0;

  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const MainText = styled.div`
  /* DayText의 위치 조정 */
  position: absolute;
  top: 21px;
  right: 104px;
  bottom: 61px;
  left: 111px;

  width: 182px;
  height: 19px;
  flex-shrink: 0;

  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const DayText = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  /* position 속성 추가 */
  position: absolute;
  top: 20px;
  right: 2px;
  bottom: 33px;
  left: 1px;

  /* box-sizing 설정 */
  box-sizing: border-box;
`;

export const PriceText = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  /* position 속성 추가 */
  position: absolute;
  top: 40px;
  right: 2px;
  bottom: 33px;
  left: 1px;

  /* box-sizing 설정 */
  box-sizing: border-box;
`;

export const HeartIcon = styled.img`
  width: 16px; // 원하는 크기로 조정
  height: 16px; // 원하는 크기로 조정
  margin-right: 10px; // 이미지와 텍스트 사이의 간격 조정

  position: absolute;
  top: 43px;
  right: 20px;
  bottom: 33px;
  left: 250px;
`;

export const HeartText = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  /* position 속성 추가 */
  position: absolute;
  top: 45px;
  right: 20px;
  bottom: 33px;
  left: 270px;

  /* box-sizing 설정 */
  box-sizing: border-box;
`;

export const ChatIcon = styled.img`
  width: 16px; // 원하는 크기로 조정
  height: 16px; // 원하는 크기로 조정
  margin-right: 10px; // 이미지와 텍스트 사이의 간격 조정

  position: absolute;
  top: 43px;
  right: 20px;
  bottom: 33px;
  left: 300px;
`;

export const ChatText = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  /* position 속성 추가 */
  position: absolute;
  top: 45px;
  right: 20px;
  bottom: 33px;
  left: 320px;

  /* box-sizing 설정 */
  box-sizing: border-box;
`;

export const TextLine = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  margin-left: 20px;

  border-radius: 10px;
  background: url(https://s3-alpha-sig.figma.com/img/d7f5/8241/fd15854682d7a220d74224e68809debe?Expires=1696204800&Signature=hyMaKQOmxwzuRQUK9pQ7fXcDwyMYoB4mRNka7PT57G3-gpxWrBiJApQXDwVSrC8rk~JGJr1gIUz17cJdlV-0gJr56rwOMUYyT4AQoquqFUcu9UdDFPKg-ggjAPEPbsO5llETacaY3QiZxIgGjToKWypVT8902L0whm0NNY6ekFz6TF4dSR3VHPaDTJPIEArk7dDFmkv2wB0d0lfpm9ybJTKYT~gl~NOmz6ZRRd8qDZf04FjXglGK0WA-w78LjcyH1l-duLGcnZbALhEBMEWzYr1JUYqtWBW3xBI0HlVwaBVh~L5---Fxypda0j4PV41R5Rw27ytk36ITKbAe~KEQ5w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ProductDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(1, minmax(5px, auto));
  grid-template-rows: repeat(5, 1fr);
`;

export const Style = styled(Link)`
  display: flex;
  margin-right: 3rem;
  text-decoration: none;
  color: black;
  flex-direction: column;

  align-items: center; // 홈 글자와 로고 이미지를 세로로 중앙 정렬
`;

export const Button = styled.button`
  z-index: 1;
  display: flex;
  width: 95px; // 원하는 너비로 조정
  height: 105px; // 원하는 높이로 조정
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 10%; // 하단 여백 조정
  right: 5%; // 우측 여백 조정
  background: no-repeat center center;
  background-size: contain; /* 이미지 크기에 맞게 조정 */
`;

export const ProductContainer = styled.div`
  padding: 1rem 1.6rem 0 1.6rem;
`;

export const EmptyList = styled.div`
  padding-top: 2rem;
  text-align: center;
  color: #828385;
`;
