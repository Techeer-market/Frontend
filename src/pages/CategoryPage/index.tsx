import React from 'react';
import * as S from '@/pages/CategoryPage/styles';
import backBtn from '@/assets/backBtn.jpg';
import { useNavigate } from 'react-router-dom';
import { mainCategory, Category } from '@/constants/mainCategory';

const index = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Nav>
        <S.Div>
          <img
            id="back"
            alt="To Main"
            loading="lazy"
            src={backBtn}
            onClick={() => navigate('/')}
          ></img>
          <S.NavText>전체 서비스</S.NavText>
        </S.Div>
      </S.Nav>
      <S.Body>
        <S.Grid>
          {mainCategory.map((category: Category) => (
            <S.Item key={category.id}>
              <img
                alt={`To ${category.title}`}
                loading="lazy"
                src={category.image}
                onClick={() => {
                  fetch('/api/test');
                }}
              ></img>
              <S.Text>{category.title}</S.Text>
            </S.Item>
          ))}
        </S.Grid>
      </S.Body>
      <S.Foot></S.Foot>
    </S.Container>
  );
};

export default index;
