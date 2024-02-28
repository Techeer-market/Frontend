import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8rem; // 필요에 따라 높이 조정
  background: #fff; // 원하는 배경색 설정
  z-index: 2; // 필요에 따라 z-index 조정
  font-size: 3rem; //글씨 크기 조정
`;

export const User = styled.div`
  border-bottom: 0.07rem solid #ffffff;

  // border-bottom: 0.07rem solid #000000;

  position: fixed; /* 화면에 고정하는 값 */
  bottom: 0%; /* 아래에 배치 */
  left: 49%; /* 가운데 정렬을 위해 왼쪽 여백을 50%로 설정 */
  transform: translateX(-48%); /* 가운데 정렬을 위한 변형 적용 */
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 55rem; /* User 컴포넌트의 고정 너비 설정 */
  z-index: 2; /* 필요에 따라 z-index 조정 */
  font-size: 2rem; /* 글씨 크기 조정 */
  flex-grow: 1;
  background-color: #ffffff;
  padding-bottom: 2rem;
`;

export const Button = styled.button`
  display: flex;
  color: black;
  border: none;
  background-color: white;
  text-decoration: none;
  flex-direction: column;
  align-items: center; // 홈 글자와 로고 이미지를 세로로 중앙 정렬
`;

// 이미지를 담은 컴포넌트 생성
export const LogoImage = styled.img`
  width: 10%; // 이미지의 너비 설정
  height: 100%; // 이미지의 높이 자동 조정
  margin-right: 1rem; // 홈 글자와 로고 이미지 사이에 여백 추가
`;

export const LogoBackground = styled.div`
  display: flex;
  margin: 0rem 4rem;
  width: 16.704rem;
  height: 6.384rem;
`;

export const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;
