import * as S from '@/components/SearchBar/styles';
import { SlArrowLeft } from 'react-icons/sl';
import useSearchThing from '@/hooks/useSearchThing';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [thingName, handleThingName, goToMain, onKeyDown] = useSearchThing('');
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Nav>
        <S.Div>
          <S.ClickArea onClick={() => navigate('/')}>
            <SlArrowLeft style={{ width: '25px', height: '40px', marginLeft: '-20px' }} />
          </S.ClickArea>
          <S.Input
            placeholder="통합 검색"
            onChange={handleThingName}
            onKeyDown={onKeyDown}
            value={thingName}
            type="text"
          />
        </S.Div>
      </S.Nav>
    </S.Container>
  );
}
