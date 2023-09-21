import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";

interface TopNavBarProps {
    page: string;
}
  
const TopNavBar: React.FC<TopNavBarProps> = ({ page }) => {
    const navigate = useNavigate();
    return(
        <BarContainer>
            <ClickArea onClick={() => navigate(-1)}>
                <SlArrowLeft style={{width: "25px", height: "25px"}}/>
            </ClickArea>
            <NavText>{page}</NavText>
        </BarContainer>
    )
}

const BarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 7.4rem;
    background: #FFF;
`

const ClickArea = styled.div`
    width: 25px;
    heigth: 25px;
    &:hover {
        cursor: pointer;
        color: #828385;
    }
`

const NavText = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  padding-left: 20px;
  color: #000000;
`;

export default TopNavBar;