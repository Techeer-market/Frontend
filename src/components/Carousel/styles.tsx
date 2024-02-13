import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 30rem;
  overflow: hidden;
  display: flex;
  margin-bottom: 1rem;
`;

export const CarouselContainer = styled.div<{ length: number }>`
  display: flex;
  width: calc(100% * ${(props) => props.length});
  transition: transform 0.5s ease;
`;

export const ImageWrapper = styled.div`
  flex: 0 0 100%;
  height: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 10px;
  height: 10px;
  border: none;
  margin: 0 5px;
  background-color: rgba(217, 217, 217, 0.3);
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;

  &.active {
    background-color: #d9d9d9;
  }
`;
