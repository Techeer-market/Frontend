import styled from 'styled-components';

export const Container = styled.div`
  /* 컴포넌트 높이 지정 */
`;
export const Div = styled.div`
  position: relative;
  width: 100%;
  height: 12rem;
  border-radius: 10px;
  background-color: rgba(217, 217, 217, 0.15);
  margin-bottom: 1.6rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Texts = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  display: flex;
  margin-left: 30px;
`;

export const TopText = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const NameText = styled.h3`
  color: #000;
  font-size: 20px;
  font-weight: 700;
`;
export const DayText = styled.h3`
  color: #828385;
  margin-left: 10px;
  padding-top: 5px;
`;
export const Chat = styled.div`
  display: flex;
  color: #000;
  font-size: 13px;
  margin-top: 10px;
`;
export const Icon = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 30px;
`;
export const IconImage = styled.img``;
export const ProductImage = styled.img`
  margin-right: 20px;
  width: 9rem;
  height: 9rem;
  background-size: cover;
  background-repeat: no-repeat;
`;
