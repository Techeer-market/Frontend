import styled from 'styled-components';
import heartImage from '../../assets/grayHeartIcon.svg';

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'LINESeedKRBd';
  font-style: normal;
`;

export const Maincontainer = styled.div`
  flex-direction: column;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  // background-color: red
  position: relative;
`;
export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
`;
export const Image = styled.div`
  width: 40rem;
  height: 20rem;
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
`;
export const ProductTitle = styled.h2`
  text-align: left;
  font-size: 2.2rem;
  margin-top: 1.25rem;
  font-weight: bold;
`;
export const Price = styled.h3`
  font-size: 3.4rem;
  margin-top: 0.5rem;
  font-weight: bold;
`;
export const TypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1.8rem;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 0.07rem solid #000000;
`;
export const NameAndDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ChangImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0.5px solid #d9d9d9;
`;

export const CameraIcom = styled.div`
  position: absolute;
  left: 33px;
  top: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: white;
  border: 0.5px solid #d9d9d9;
  border-radius: 50%;
`;

export const ChangeName = styled.img`
  z-index: 2;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  background-color: white;
  background-color: rgba(255, 255, 255, 0);
  color: black;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 1px 10px 1px rgba(124, 161, 255, 0.769);
  }
`;

export const Name = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 700;
`;

export const Category = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #646464;
  margin-top: 3rem;
  margin-right: 1rem;
`;
export const TradeType = styled.h3`
  font-size: 1.5rem;
  width: 8rem;
  height: 3rem;
  background-color: #000;
  color: #fff;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-right: 6rem;
  font-weight: bold;
`;
export const Date = styled.h3`
  font-size: 1.5rem;
  text-align: right;
  margin-top: 1rem;
  color: #222;
`;
export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 13rem;
  gap: 0.5rem;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5rem;
  width: 85%;
`;
export const ChatButton = styled.button`
  font-size: 2rem;
  font-weight: bold;
  width: 20rem;
  height: 5rem;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: #fc8600;
    color: #fff;
  }
`;
export const WishlistButton = styled.button`
  height: 5rem;
  border: none;

  background-image: url(${heartImage});
  background-repeat: no-repeat;
  background-size: contain;
  padding-left: 50px; /* 이미지와 버튼 사이의 간격을 조절할 수 있는 값으로 변경해주세요 */
  background-color: transparent;
`;

export const Value = styled.span`
  padding-left: 3px;
  color: #7e7e7e;
  font-size: 10px;
  font-weight: 400;
`;
export const Description = styled.p`
  width: 100%;
  height: 26rem;
  padding: 3rem 5rem 5rem 5rem;
  /* border-top: 0.07rem solid #000000;
  border-bottom: 0.07rem solid #000000; */
  margin-bottom: 1.25rem;
`;
export const SubTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
export const Content = styled.h4`
  font-size: 1.8rem;
`;
export const ImageItem = styled.img`
  width: 13rem;
  height: 13rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

export const ReturnButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 92.47rem;
  height: 4.2rem;
  left: 29.27rem;
  top: 167.6rem;
  color: #ffffff;
  background: #000000;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  line-height: 4.1rem;
`;
