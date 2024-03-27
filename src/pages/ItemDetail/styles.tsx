import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;
export const Maincontainer = styled.div`
  // width: 100%;
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.4rem;
`;
export const TypeWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  font-size: 1.6rem;
  padding: 1rem 0;
  border-bottom: 1px solid #000000;
`;
export const NameAndDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: scale 0.3s ease-in-out;
  &:hover {
    scale: 1.05;
  }
`;
export const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
export const Name = styled.span`
  color: #000;
  font-size: 18px;
  font-weight: 700;
`;
export const Date = styled.span`
  font-size: 14px;
  text-align: right;
  color: #222;
`;
export const Category = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #646464;
`;
export const ContentWrapper = styled.div`
  padding: 2.4rem 1rem 0;
`;
export const ProductTitle = styled.span`
  text-align: left;
  font-size: 2.2rem;
  font-weight: bold;
`;
export const Description = styled.div`
  padding-top: 4rem;
`;
export const Content = styled.span`
  font-size: 1.6rem;
  margin-bottom: 20rem;
`;
export const DetailWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #7e7e7e;
  font-size: 16px;
  font-weight: 400;
  padding-right: 1rem;
  gap: 4px;
`;
export const DetailName = styled.span``;
export const DetailValue = styled.span``;

export const MapWrapper = styled.div`
  padding: 5rem 0 2rem;
  margin-top: 20rem;
`;
export const MapTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  font-size: 24px;
  font-weight: 600;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.4rem;
`;
export const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
export const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
export const WishlistButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  cursor: pointer;
`;
export const ChatButton = styled.button`
  font-size: 2rem;
  font-weight: bold;
  width: 14rem;
  height: 5rem;
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #fc8600;
    color: #fff;
  }
`;
