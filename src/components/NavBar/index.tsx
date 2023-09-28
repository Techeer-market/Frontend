import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import homeImage from '../../assets/Home.png';
import heartImage from '../../assets/Heart.png';
import chatImage from '../../assets/chat.png';
import mypageImage from '../../assets/Mypage.png';




const NavBar = () => {
  
  
  const navigate = useNavigate();


  const [showSearchModule, setShowSearchModule] = useState(false);
  const [showMyPageModule, setShowMyPageModule] = useState(false);

  // 검색 이력 상태 추가
  const [searchHistory, setSearchHistory] = useState([]);

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  

  
  const handleLogout = () => {
    fetch('http://localhost:8080/api/users/logout', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          navigate('/login');
        } else {
          console.log('logout failed');
        }
      })
      .catch(error => {
        console.log('Error  : ', error);
      })
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
    <NavbarContainer>
      {/* <LogoBackground role="button" onClick={() => navigate('/')}>
        <img id="main" src={logo} alt="홈페이지 메인으로 이동"></img>
      </LogoBackground>  */}

{/* 
      <Category>
        <StyledLink to="/category/Electronic Products">Electronic</StyledLink>
        <StyledLink to="/category/Living Products">Living</StyledLink>
        <StyledLink to="/category/Book_Magazine Products">
          Book/Magazine
        </StyledLink>
        <StyledLink to="/category/Food Products">Food</StyledLink>
        <StyledLink to="/category/Fashion Products">Fashion</StyledLink>
      </Category> */}

      <User>
        {/* <StyledLink onClick={handleSearchClick}>
          <FiSearch />
        </StyledLink> */}
        <HomeLink to="/home">
          <LogoImage src={homeImage} alt="로고 이미지" style={{margin:"0px 0px 5px 0px", width:"30px"}} />
          홈
        </HomeLink>
        {/* <StyledLink to="/home">홈</StyledLink> */}
        
        <StyledLink to="/like">
        <LogoImage src={heartImage} alt="로고 이미지" style={{margin:"0px 0px 5px 0px", width:"30px"}} />
          좋아요
        </StyledLink>
        {/* <StyledLink to="/write">글쓰기</StyledLink> */}
        {/* <StyledLink to="/login">로그인</StyledLink> */}
        <StyledLink to="/chat">
        <LogoImage src={chatImage} alt="로고 이미지" style={{margin:"0px 0px 5px 0px", width:"30px"}} />
          채팅
        </StyledLink>

        <StyledLink onClick={handleMyPageClick}>
           <LogoImage src={mypageImage} alt="로고 이미지" style={{margin:"0px 0px 8 px 0px", width:"20px"}} />
          마이페이지
        </StyledLink>
        {/* <StyledLink onClick={handleLogout}>로그아웃</StyledLink> */}
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
        showModule={showSearchModule || showMyPageModule}
        onClick={handleCloseModule}
      />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 8rem; // 필요에 따라 높이 조정
background-color: #fff; // 원하는 배경색 설정
z-index: 2; // 필요에 따라 z-index 조정
font-size: 3rem; //글씨 크기 조정

`;


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


// 이미지를 담은 컴포넌트 생성
const LogoImage = styled.img`
 
  width: 10%; // 이미지의 너비 설정
  height: 100%; // 이미지의 높이 자동 조정
  margin-right: 1rem; // 홈 글자와 로고 이미지 사이에 여백 추가
`;

const User = styled.div`
  position: fixed; /* 화면에 고정하는 값 */
  bottom: 2rem; /* 아래에 배치 */
  left: 50%; /* 가운데 정렬을 위해 왼쪽 여백을 50%로 설정 */
  transform: translateX(-48%); /* 가운데 정렬을 위한 변형 적용 */
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50rem; /* User 컴포넌트의 고정 너비 설정 */
  z-index: 2; /* 필요에 따라 z-index 조정 */
  font-size: 2rem; /* 글씨 크기 조정 */
  flex-grow: 1;
`;


const StyledLink = styled(Link)`
  display:flex;
  margin-right: 3rem;
  text-decoration: none;
  color: black;
  flex-direction:column;
  align-items: center; // 홈 글자와 로고 이미지를 세로로 중앙 정렬
`;
const HomeLink = styled(StyledLink)`
  display: flex;
  flex-direction:column;
  align-items: center; // 홈 글자와 로고 이미지를 세로로 중앙 정렬
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
  text-align: center;
`;
const Form = styled.form`
  position: relative;
`;
const SearchInput = styled.input`
  width: 50%;
  padding: 1rem;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 1.6rem;
  margin: 2rem auto 0;

  ::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
    background-color: #000000;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 22.5%;
  height: 8.5rem;
  background-color: transparent;
  color: black;
  border: none;
  font-size: 2.6rem;
  cursor: pointer;
`;

const StyledSearchResults = styled.div`
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
  padding: 5%;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 3.4rem;
  line-height: 4.1rem;

  div {
    padding-bottom: 2rem;
    border-bottom: 0.7px solid #000000;
    width: 92%;
  }
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
