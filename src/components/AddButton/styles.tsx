import styled from 'styled-components';

// export const Button = styled.button`
//   flex-grow: 10;
//   z-index: 1;
//   display: flex;
//   width: 95px; // 원하는 너비로 조정
//   height: 105px; // 원하는 높이로 조정
//   border: none;
//   cursor: pointer;
//   position: absolute;
//   bottom: 10rem; // 하단 여백 조정
//   right: 62rem; // 우측 여백 조정
//   background: no-repeat center center;
//   background-size: contain; /* 이미지 크기에 맞게 조정 */
// `;

export const Button = styled.button`
  display: flex;
  align-items: center;
  margin-left: 25rem;
  background: no-repeat center center;
  color: #2f2f2f;

  border: none;
  &:hover {
    cursor: pointer;
    color: #ff8432;
  }
`;
