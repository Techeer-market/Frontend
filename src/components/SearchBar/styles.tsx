import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 50rem;
  /* height: 100vh; */
`;
export const Nav = styled.div`
  padding-top: 40px;
  display: flex;
  align-items: center;
  margin-left: 35px;
  padding-top: 40px;
  img {
    margin-left: 15px;
    padding-right: 10px;
    cursor: pointer;
  }
`;
export const Input = styled.input`
  margin: 0 auto;
  width: 420px;
  height: 40px;
  background-color: #ececec;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 12px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background-image: url('src/assets/searchBtn.jpg');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 10px center;
  padding-left: 40px;
`;

export const Div = styled.div`
  display: flex;
`;

export const ClickArea = styled.div`
  width: 25px;
  height: 25px;
  &:hover {
    cursor: pointer;
    color: #828385;
  }
`;
