import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import profile from '../../assets/profile.png';
import Heart from '../../assets/HeartIcon.svg'
import Store from '../../assets/StoreIcon.svg'
import Cart from '../../assets/CartIcon.svg'
import axios from 'axios';
import userID from '@/redux/userID';
import TopNavBar from '@/components/TopNavBar';

const MyPage = () => {
    const navigate = useNavigate();
    const [img, setImg] = useState(profile);

    useEffect(() => {
        const fetchUserInfo = async () => {
          try{
            const response = await axios.get(`http://localhost:8080/api/users/${userID}`);
            if(response.data.image){
                setImg(response.data.image);
            }
          } catch(error) {
            console.error(error);
          }
        };
        fetchUserInfo();
      }, []);
    return(
        <>
            <TopNavBar page="마이페이지"/>
            <S.MyPageContainer>
                <label htmlFor="Profile">
                    <S.ChangeName src={img} alt="Profile" />
                </label>
                {/* userUuid로 구현 */}
                <S.Name>(이름)</S.Name> 
            </S.MyPageContainer>

            <S.Div>
                <S.Title>나의 거래</S.Title>

                <S.ItemBox>
                    <S.ClickArea onClick={()=>navigate('/wishlist')}>
                        <img src={Heart} alt='heartIcon'/>
                        <S.Item>좋아요 목록</S.Item>
                    </S.ClickArea>
                </S.ItemBox>
                <S.ItemBox>
                    <S.ClickArea onClick={()=>navigate('/saleslist')}>
                        <img src={Store} alt='StoreIcon'/>
                        <S.Item>판매 내역</S.Item>
                    </S.ClickArea>
                </S.ItemBox>
                <S.ItemBox>
                    <S.ClickArea onClick={()=>navigate('/purchaselist')}>
                        <img src={Cart} alt='CartIcon'/>
                        <S.Item>구매 내역</S.Item>
                    </S.ClickArea>
                </S.ItemBox>

                <S.NavBtn onClick={()=>navigate('/edit_info')}>계정 / 정보 관리</S.NavBtn>
            </S.Div>
        </>
    )
}

export default MyPage;