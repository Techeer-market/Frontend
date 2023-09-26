import React from 'react';
import * as S from '@/pages/CategoryPage/styles';
import backBtn from '@/assets/backBtn.jpg';
import category1 from '@/assets/category1.jpg';
import category2 from '@/assets/category2.jpg';
import category3 from '@/assets/category3.jpg';
import category4 from '@/assets/category4.jpg';
import category5 from '@/assets/category5.jpg';
import category6 from '@/assets/category6.jpg';
import category7 from '@/assets/category7.jpg';
import category8 from '@/assets/category8.jpg';
import category9 from '@/assets/category9.jpg';
import { useNavigate } from 'react-router-dom';

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
          <S.Item>
            <img
              id="category1"
              alt="To digital"
              loading="lazy"
              src={category1}
              // onClick={() => navigate('')}
            ></img>
            <S.Text>디지털기기</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="category2"
              alt="To Woman"
              loading="lazy"
              src={category2}
            ></img>
            <S.Text>여성의류</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="category3"
              alt="To Man"
              loading="lazy"
              src={category3}
            ></img>
            <S.Text>남성의류/잡화</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="category4"
              alt="To cosmetics"
              loading="lazy"
              src={category4}
            ></img>
            <S.Text>뷰티/미용</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="To category5"
              alt="To Bags"
              loading="lazy"
              src={category5}
            ></img>
            <S.Text>여성잡화</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="category6"
              alt="To HomeAppliances"
              loading="lazy"
              src={category6}
            ></img>
            <S.Text>생활가전</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="category7"
              alt="To Kitchen"
              loading="lazy"
              src={category7}
            ></img>
            <S.Text>생활/주방</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="category8"
              alt="To Games"
              loading="lazy"
              src={category8}
            ></img>
            <S.Text>취미/게임/음반</S.Text>
          </S.Item>
          <S.Item>
            <img
              id="category9"
              alt="To Books"
              loading="lazy"
              src={category9}
            ></img>
            <S.Text>도서</S.Text>
          </S.Item>
        </S.Grid>
      </S.Body>
      <S.Foot></S.Foot>
    </S.Container>
  );
};

export default index;
