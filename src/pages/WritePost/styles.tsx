import styled from 'styled-components';

export const Writepost = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'LINESeedKRBd';
  font-style: normal;
  font-weight: 700;

  justify-content: space-around;
  margin: 0 auto;
  width: 50rem;
`;

export const Nav = styled.div`
  padding-top: 2px;
  display: flex;
  align-items: center;
  img {
    width: 20%;
    margin-left: 5%;
  }
  #category {
    margin-left: 1800%;
    width: 100%; /* 이미지의 너비를 설정하세요 */
    height: 100%; /* 이미지의 높이를 설정하세요 */
  }
  #search {
    margin-left: 1900%;
    width: 100%; /* 이미지의 너비를 설정하세요 */
    height: 100%; /* 이미지의 높이를 설정하세요 */
  }
`;
export const Wrap = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 드래그 바의 진행 상태 스타일
export const ImagesContainer = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤을 가능하게 함 */
  gap: 10px; /* 이미지 간의 간격을 조절 */
  padding: 10px; /* 좌우 여백 추가 */
`;

export const Img = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 2rem;
  margin-left: 4rem;
  width: 50rem;
  gap: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 50rem;
  margin-bottom: 3rem;
  gap: 1rem;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50rem;
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  line-height: 2.4rem;
  color: #000000;
  width: 50rem;
  margin-left: 2rem;
`;
export const Input = styled.input`
  display: flex;
  width: 95%;
  height: 43px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #828385;
  font-size: 1.5rem;
  padding-left: 1rem;
  margin-top: 1rem;
`;
export const Select = styled.select`
  display: flex;
  width: 95%;
  height: 43px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #828385;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  margin-top: 1rem;
  &:focus {
    outline: none;
    border: 0.1rem solid black;
  }
`;
export const Option = styled.option`
  color: black;
  font-size: 1.5rem;
`;

export const UploadedImg = styled.img`
  width: 166px;
  height: 166px;
  border-radius: 10.5px;
`;
export const DeleteButton = styled.button`
  position: absolute;
  top: 0rem;
  right: 0rem;
  border: none;
  background: #000000;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 40rem;
  left: 29.3rem;
  top: 73.7rem;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 1.7rem;
  border: 1px solid #828385;
  font-size: 2rem;
  padding: 2rem 0 0 2rem;
`;
export const Buttons = styled.div`
  margin-bottom: 20rem;
`;
export const UploadButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48rem;
  height: 4.2rem;
  left: 29.27rem;
  top: 160rem;
  color: #ffffff;
  background: #fd8944;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  line-height: 4.1rem;
  margin-top: 15rem;
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
  background: #efefef;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  line-height: 4.1rem;
`;
export const Map = styled.div`
  width: 95%;
`;
export const OptionButton = styled.button<{
  buttonType: string;
  isSelected: boolean;
}>`
  background-color: ${({ isSelected }) => (isSelected ? '#000000' : '#EFEFEF')};
  color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#000000')};
  border-radius: 1.05rem;
  border: none;
  cursor: pointer;
  margin-right: 1.5%;
  height: 2.4rem;
  font-size: 1.5rem;
`;
