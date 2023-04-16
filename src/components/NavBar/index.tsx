import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <Navbar>
            <LogoBackground role="button" onClick={() => navigate('/')}>
            <img id="main" src={logo} alt="홈페이지 메인으로 이동"></img>
            </LogoBackground>

            <Category>
                <StyledLink to="/electronic">Electronic</StyledLink>
                <StyledLink to="/living">Living</StyledLink>
                <StyledLink to="/book">Book/Magazine</StyledLink>
                <StyledLink to="/food">Food</StyledLink>
                <StyledLink to="/fashion">Fashion</StyledLink>
            </Category>
            
            <User>
                <StyledLink><FiSearch/></StyledLink>
                <StyledLink to="/sell">판매하기</StyledLink>
                <StyledLink to="/login">로그인</StyledLink>
                <StyledLink to="/chat">채팅</StyledLink>
                <StyledLink>마이페이지</StyledLink>
            </User>
        </Navbar>
    );
};

export default NavBar;

const Navbar = styled.div`
    margin: 2rem;
    display: flex;
    width: 100%;
    height: 6.384rem;
    justify-content: space-between;

    font-family:"LINESeedKRBd";
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
    margin-top: 1.5rem;
`;

const User = styled.div`
    margin-left: 31rem;
    margin-top: 1.5rem;
`;

const StyledLink = styled.div`
    margin-right: 3rem;
    text-decoration: none;
    color: black;
`;