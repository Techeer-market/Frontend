import styled from 'styled-components';

export const InfoContainer = styled.div`
  padding: 6rem 5.4rem 0 4rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
  padding-bottom: 4.4rem;
`;

export const ChangeImg = styled.img`
  z-index: 2;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  background-color: white;
  background-color: rgba(255, 255, 255, 0);
`;

export const ChangeProfile = styled.input`
  display: none;
`;

export const Name = styled.span`
  color: #000;
  font-size: 23px;
  font-weight: 700;
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3rem;
`;

export const Title = styled.span`
  display: flex;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
`;

export const InfoContent = styled.span`
  font-size: 15px;
  color: black;
`;

export const ChangeBtn = styled.button`
  width: 5rem;
  height: 3rem;
  color: #fd8944;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

export const Section2 = styled.div`
  padding-top: 4rem;
`;

export const DelBtn = styled.button`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 1rem;
  font-size: 15px;
  font-style: normal;
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
