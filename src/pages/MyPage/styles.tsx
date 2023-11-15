import styled from 'styled-components';

export const Div = styled.div`
  padding: 6rem 3.3rem 0;
`;

export const MyPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
  padding-bottom: 5rem;
`;

export const ChangImg = styled.img`
  z-index: 2;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  background-color: white;
  background-color: rgba(255, 255, 255, 0);
`;

export const Name = styled.span`
  color: #000;
  font-size: 23px;
  font-weight: 700;
`;

export const Title = styled.span`
  display: flex;
  color: #000;
  font-size: 15px;
  font-weight: 700;
`;

export const ItemBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-top: 2rem;
`;
export const ClickArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;

  &:hover {
    cursor: pointer;
    // background-color: rgba(217, 217, 217, 0.15);
  }
`;

export const Item = styled.span`
  position: absolute;
  left: 3.4rem;
  color: #000;
  font-size: 15px;
  font-weight: 400;
`;

export const NavBtn = styled.button`
  margin-top: 6rem;
  font-size: 15px;
  font-weight: 700;
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    color: #828385;
  }
`;
