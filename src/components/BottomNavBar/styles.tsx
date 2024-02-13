import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  padding: 0 2rem;
  width: 48rem;
  height: 8rem;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  z-index: 2;
`;

export const Button = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  text-decoration: none;
  flex-direction: column;
  align-items: center;
`;

export const LogoImage = styled.img`
  margin-bottom: 0.5rem;
  width: 3rem;
  height: 3rem;
`;
