// 네비게이션 바

import * as S from '@/components/SearchBar/styles';
import useSearchThing from '@/hooks/useSearchThing';

export default function SearchBar() {
  const [thingName, handleThingName, gotoMain, onKeyDown] = useSearchThing('');
  return (
    <S.Container>
      <S.Nav>
        <S.Div>
          <S.Input
            placeholder="통합 검색"
            onChange={handleThingName}
            onKeyDown={onKeyDown}
            value={thingName}
            type="submit"
          />
        </S.Div>
      </S.Nav>
    </S.Container>
  );
}
