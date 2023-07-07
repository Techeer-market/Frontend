import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import menuBar from '../../assets/menuBar.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const NavBar = () => {
  const navigate = useNavigate();

  const [showMenuBarModule, setShowMenuBarModule] = useState(false);
  const [showSearchModule, setShowSearchModule] = useState(false);
  const [showMyPageModule, setShowMyPageModule] = useState(false);

  // 검색 이력 상태 추가
  const [searchHistory, setSearchHistory] = useState([]);

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <Navbar>
      <LogoBackground role="button" onClick={() => navigate('/')}>
        <img id="main" src={logo} alt="홈페이지 메인으로 이동"></img>
      </LogoBackground>

      <Category>
        <StyledLink to="/category/Electronic Products">Electronic</StyledLink>
        <StyledLink to="/category/Living Products">Living</StyledLink>
        <StyledLink to="/category/Book_Magazine Products">
          Book/Magazine
        </StyledLink>
        <StyledLink to="/category/Food Products">Food</StyledLink>
        <StyledLink to="/category/Fashion Products">Fashion</StyledLink>
      </Category>

      <Bars onClick={handleMenuBarClick} src={menuBar} alt="측면바 생성" />
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
            <ModuleLink to="/selling">판매중인 상품</ModuleLink>
            <ModuleLink to="/purchase">구매내역</ModuleLink>
          </Textbox>
        </ModuleWindow0>
      )}

      <User>
        <StyledLink onClick={handleSearchClick}>
          <FiSearch />
        </StyledLink>
        <StyledLink to="/write">팔기</StyledLink>
        <StyledLink to="/login">로그인</StyledLink>
        <StyledLink to="/chat">채팅</StyledLink>
        <StyledLink onClick={handleMyPageClick}>마이페이지</StyledLink>
      </User>

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

      {showMyPageModule && (
        <ModuleWindow2 showModule={showMyPageModule}>
          <Textbox>
            <div>마이페이지</div>
            <ModuleLink to="/wishlist">위시리스트</ModuleLink>
            <ModuleLink to="/selling">판매중인 상품</ModuleLink>
            <ModuleLink to="/purchase">구매내역</ModuleLink>
          </Textbox>
        </ModuleWindow2>
      )}

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

  @media screen and (max-width: 1200px) {
    display: block;
    width: 2rem;
    margin: 0.8rem 4rem;
    height: 6.384rem;
    cursor: pointer;
  }
`;

const ModuleWindow0 = styled.div`
  position: fixed;
  top: 0;
  right: ${({ showModule }) => (showModule ? '0' : '-37rem')};
  width: 37rem;
  height: 100%;
  background-color: #fff;
  z-index: 1;
  transition: all 0.3s ease-in-out;
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

   @media screen and (max-width: 1200px) {
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
  z-index: 1;
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
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  z-index: 1;

  // Styles for individual search result items
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
  z-index: 1;
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
  z-index: 0;
  transition: opacity 0.3s ease-in-out;
`;