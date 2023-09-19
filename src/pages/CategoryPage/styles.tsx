import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 50rem;
  height: 100vh;
  img {
    cursor: pointer;
  }
`;
export const Nav = styled.div`
  padding-top: 40px;
`;
export const Body = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  padding-left: 50px;
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 160px 160px 160px;
  gap: 5px;
  margin-top: 200px;
  align-items: center;
  place-content: center;
  img {
    cursor: pointer;
  }
`;
export const Item = styled.div`
  width: 80px;
  height: 100px;
  align-items: center;
  place-content: center;
  /* margin-left: 20px; */
`;
export const Text = styled.h3`
  display: flex;
  place-content: center;
  align-items: center;
  margin-top: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
`;
export const NavText = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  margin-left: 15px;

  color: #000000;
`;
export const Div = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-left: 15px;
  }
`;
export const Foot = styled.div``;
