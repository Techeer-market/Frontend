import * as S from './styles';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from 'react-icons/sl';

interface TopNavBarProps {
  page: React.ReactNode;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ page }) => {
  const navigate = useNavigate();
  return (
    <S.BarContainer>
      <S.ClickArea onClick={() => navigate(-1)}>
        <SlArrowLeft style={{ width: '25px', height: '25px' }} />
      </S.ClickArea>
      <S.NavText>{page}</S.NavText>
    </S.BarContainer>
  );
};

export default TopNavBar;
