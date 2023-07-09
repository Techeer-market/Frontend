import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import menuBar from '../../assets/menuBar.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const NavBar = () => {
  const navigate = useNavigate();

  // 검색 이력 상태 추가
  const [searchHistory, setSearchHistory] = useState([]);

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //모달창 셋 상태 설정
  const [showMenuBarModule, setShowMenuBarModule] = useState(false);
  const [showSearchModule, setShowSearchModule] = useState(false);
  const [showMyPageModule, setShowMyPageModule] = useState(false);
  
  //모달창 셋 클릭하여 열고 닫고하는 모달창 상태 변경 함수
  const handleMenuBarClick = () => {
    setShowMenuBarModule(!showMenuBarModule);
  };
  const handleMyPageClick = () => {
    setShowMyPageModule(!showMyPageModule);
  };
  const handleSearchClick = () => {
    setShowSearchModule(!showSearchModule);
  };
  const handleCloseModule = () => {
    setShowSearchModule(false);
    setShowMyPageModule(false);
    setShowMenuBarModule(false);
  };

   // 검색 함수 //수정 필수!! 상품 검색 및 링크연결 기능 구현 까먹었습니다..죄송해요 부탁드립니다!ㅠㅠ
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    const results = posts.filter(
      (post) => post.title.includes(query) || post.description.includes(query),
    );
    setSearchResults(results);

    // 검색 이력 업데이트
    setSearchHistory((prevHistory) => {
      const newHistory = [query, ...prevHistory];
      if (newHistory.length > 3) {
        newHistory.pop();
      }
      return newHistory;
    });

    setShowSearchModule(false);
  };
//Navbar전체 안에 크게 LogoBackground(좌) Category(중) User(우)로 구성. 참고로 Bars는 가로1200px이하일때만 보이도록 설정해서 설명 생략
//User(검색아이콘, 팔기, 로그인, 채팅, 마이페이지)은 가로1200px이하일 때 Bars라는 햄버거아이콘 사이드바로 대체됨.
//모듈창은 총 3개. User(우)의 검색아이콘을 누르면 나오는 상단바와 User(우)의 마이페이지를 클릭하면 나오는 사이드바와 
//화면 작아질 때 User(우)를 대체하는 Bars의 검색기능을 포함한 사이드바입니다.
  return (
    <Navbar>
      {/* 로고 이미지 클릭시 홈페이지 메인으로 이동 */}
      <LogoBackground role="button" onClick={() => navigate('/')}>
        <img id="main" src={logo} alt="홈페이지 메인으로 이동"></img>
      </LogoBackground>
      {/* 카테고리 메뉴들, 클릭 시 해당 카테고리로 이동 */}
      <Category>
        <StyledLink to="/category/Electronic">Electronic</StyledLink>
        <StyledLink to="/category/Living">Living</StyledLink>
        <StyledLink to="/category/Book_Magazine">
          Book/Magazine
        </StyledLink>
        <StyledLink to="/category/Food">Food</StyledLink>
        <StyledLink to="/category/Fashion">Fashion</StyledLink>
      </Category>
      {/* 메뉴바 햄버거아이콘, 클릭시 반응형용 사이드바 생성 */}
      <Bars onClick={handleMenuBarClick} src={menuBar} alt="사이드바 생성" />
      {/* 이 사이드바(모달창0)는 검색, 팔기, 로그인, 채팅 링크와 마이페이지의 세부 항목들의 링크 제공 */}
      {showMenuBarModule && (
        <ModuleWindow0 showModule={showMenuBarModule}>
          <Form0 onSubmit={handleSearch}>
            <SearchInput0
              name="search"
              type="text"
              placeholder="검색어를 입력하세요."
            />
            <SearchButton type="submit">
              <FiSearch />
            </SearchButton>
          </Form0>
          <Textbox>
          <ModuleLink0 to="/write">팔기</ModuleLink0>
            <ModuleLink0 to="/login">로그인</ModuleLink0>
            <ModuleLink0 to="/chat">채팅</ModuleLink0>
            <div>마이페이지</div>
            <ModuleLink to="/wishlist">위시리스트</ModuleLink>
            <ModuleLink to="/saleslist">판매중인 상품</ModuleLink>
            <ModuleLink to="/purchaselist">구매내역</ModuleLink>
          </Textbox>
        </ModuleWindow0>
      )}
      {/* 사용자 메뉴. 여기에서는 검색, 팔기, 로그인, 채팅, 마이페이지 링크를 제공, 여기서 마이페이지 클릭시 (모달창2) 펼쳐짐 */}
      <User>
        <StyledLink onClick={handleSearchClick}>
          <FiSearch />
        </StyledLink>
        <StyledLink to="/write">팔기</StyledLink>
        <StyledLink to="/login">로그인</StyledLink>
        <StyledLink to="/chat">채팅</StyledLink>
        <StyledLink onClick={handleMyPageClick}>마이페이지</StyledLink>
      </User>
      {/* 상단 검색 모달창(모달창1) */}
      {showSearchModule && (
        <ModuleWindow1 showModule={showSearchModule}>
          <Form onSubmit={handleSearch}>
            <SearchInput
              name="search"
              type="text"
              placeholder="검색어를 입력하세요."
            />
            <SearchButton type="submit">
              <FiSearch />
            </SearchButton>
          </Form>
        </ModuleWindow1>
      )}
      {searchResults.length > 0 && <SearchResults results={searchResults} />}
      {/* 위에 언급했던 마이페이지 모달창(모달창2) */}
      {showMyPageModule && (
        <ModuleWindow2 showModule={showMyPageModule}>
          <Textbox>
            <div>마이페이지</div>
            <ModuleLink to="/wishlist">위시리스트</ModuleLink>
            <ModuleLink to="/saleslist">판매중인 상품</ModuleLink>
            <ModuleLink to="/purchaselist">구매내역</ModuleLink>
          </Textbox>
        </ModuleWindow2>
      )}
      {/* // 모달창이 떴을 때, 모달창 외부 클릭하면 모든 모달창이 닫히도록 설정*/}
      <ModuleBackdrop
        showModule={showSearchModule || showMyPageModule || showMenuBarModule}
        onClick={handleCloseModule}
      />
    </Navbar>
  );
};

export default NavBar;

const Navbar = styled.div`
  margin: 2rem;
  display: flex;
  height: 6.384rem;
  justify-content: space-between;

  font-family: 'LINESeedKRBd';
  font-style: normal;
  font-weight: 700;
  font-size: 4.5rem;
  line-height: 2.9rem;
`;

const LogoBackground = styled.div`
  display: flex;
  margin: 0rem 4rem;
  width: 16.704rem;
  height: 6.384rem;
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const Bars = styled.img`
  display: none;

  @media screen and (max-width: 1200px) { //가로길이 1200px 이하면 Bars 햄버거아이콘바 보이게 구현
    display: block;
    width: 2rem;
    margin: 0.8rem 4rem;
    height: 6.384rem;
    cursor: pointer;
  }
`;

const ModuleWindow0 = styled.div`//모달창0인 반응형용 햄버거아이콘 사이드 모달창
  position: fixed; // 뷰포트에 상대적으로 고정 위치
  top: 0; // 뷰포트의 상단에서부터 0의 위치에 위치
  right: ${({ showModule }) => (showModule ? '0' : '-37rem')}; //보이거나 숨겨짐(showModule prop이 true이면 오른쪽에서 0의 위치에, 아니면 -37rem 위치에 위치)
  width: 37rem;
  height: 100%;
  background-color: #fff;
  z-index: 10;
  transition: all 0.3s ease-in-out; //부드럽게 나타나거나 사라짐 (모든 속성에 대해 0.3초 동안의 트랜지션을 적용)
`;
const Form0 = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const SearchInput0 = styled.input`
  width: 80%;
  padding: 1rem;
  font-size: 1.6rem;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;

   @media screen and (max-width: 1200px) {//1200px이하가 되면 Bars가 대체해야하니 안보이게 설정
    display: none;
  }
`;

const StyledLink = styled(Link)`
  margin-right: 3rem;
  text-decoration: none;
  color: black;
`;

const ModuleWindow1 = styled.div`
  position: fixed;
  left: 0;
  top: ${({ showModule }) => (showModule ? '0' : '-37rem')};
  width: 100%;
  height: 37rem;
  background-color: #fff;
  z-index: 2;
  transition: all 0.3s ease-in-out;
  padding-left: 10%;
  padding-right: 10%;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
`;

const SearchButton = styled.button`
  height: 5rem;
  background-color: transparent;
  border: none;
  font-size: 2.6rem;
  cursor: pointer;
`;

const SearchResults = styled.div`
  position: absolute; // 부모 요소에 상대적으로 절대 위치
  top: 100%; // 부모 요소의 상단에서부터 100% 위치에 위치 (=부모 요소 바로 아래)
  left: 0;
  width: 100%; //부모 요소의 너비와 같음
  max-height: 400px;
  overflow-y: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  z-index: 2;//모달창 펼쳤을때 어두워지지 않도록 다른 요소들 위(위일수록 숫자높게 설정)에 놓이게함(레이어링개념)

  .result-item {
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #eee;
  }
`;

const ModuleWindow2 = styled.div`
  position: fixed;
  top: 0;
  right: ${({ showModule }) => (showModule ? '0' : '-37rem')};
  width: 37rem;
  height: 100%;
  background-color: #fff;
  z-index: 2;//모달창 펼쳤을때 어두워지지 않도록 다른 요소들 위(위일수록 숫자높게 설정)에 놓이게함(레이어링개념)
  transition: all 0.3s ease-in-out;
`;

const Textbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40rem;
  padding-left: 5%;
  padding-right: 5%;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 3.4rem;
  line-height: 4.1rem;

  div {
    border-bottom: 0.7px solid #000000;
    width: 92%;
  }
`;

const ModuleLink0 = styled(Link)`
    text-decoration: none;
    color: black;
    border-bottom: 0.7px solid #000000;
    width: 92%;
`;

const ModuleLink = styled(Link)`
  text-decoration: none;
  width: 92%;
  color: black;
  background: #f7f7f7;
  border-radius: 1.5rem;
  margin-bottom: 1.3;
  margin-top: 1.3rem;
  padding-left: 1rem;
  font-size: 1.8rem;
`;

const ModuleBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: ${({ showModule }) => (showModule ? '0' : '100vw')};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 검은색 배경에 30%의 투명도 적용
  opacity: ${({ showModule }) => (showModule ? 1 : 0)};
  z-index: 1; //모달창 펼쳤을때 어두워지도록 다른 요소들(z-index: 1)보다 아래(아래일수록 숫자낮게 설정)에 놓이게 함(레이어링개념)
  transition: opacity 0.3s ease-in-out;
`;