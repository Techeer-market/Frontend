import styled, { keyframes } from 'styled-components';

export const Div = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(30%);
    padding-top: -12rem;
    display: none;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 12rem;
  border-radius: 10px;
  background-color: rgba(217, 217, 217, 0.15);
  margin-bottom: 1.6rem;

  &.fade-out {
    animation: ${fadeOutAnimation} 300ms forwards;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ProductContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

export const ImageDiv = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TextDiv = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 2rem;
  font-style: normal;
`;

export const TitleDiv = styled.div`
  width: 27rem;
  font-size: 13px;
  font-weight: 700;
  // 제목 넘칠 경우 ... 표시
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoDiv = styled.div`
  font-size: 10px;
  font-weight: 400;
`;

export const InfoContent = styled.span`
  padding-right: 8px;
`;

export const PriceDiv = styled.div`
  font-size: 10px;
  font-weight: 700;
`;

export const Section = styled.div`
  position: absolute;
  right: 20px;
  bottom: 16px;
  display: flex;
  align-items: center;
`;
export const Part = styled.div`
  display: flex;
  align-items: center;
  padding-right: 15px;
`;

export const Image = styled.svg`
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;

  transform: scale(1);
  transition: transform 0.3s ease-out;
  cursor: pointer;

  // 마우스 클릭 시 스케일 효과 적용
  &:active {
    transform: scale(1.2);
  }
`;

export const Value = styled.span`
  padding-left: 3px;
  color: #7e7e7e;
  font-size: 10px;
  font-weight: 400;
`;

export const MenuBar = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Circle = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: solid 1px #000;
  position: relative;

  ::before,
  ::after {
    left: -100%;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid 1px #000;
  }
  ::before {
    margin-top: -5px;
  }
  ::after {
    bottom: -5px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 10rem;
  height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 1;
`;

export const DropdownItem = styled.span`
  width: 100%;
  padding: 1rem 1rem;
  font-size: 10px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
    background-color: rgba(217, 217, 217, 0.15);
  }
`;
