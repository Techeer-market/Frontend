import NavBar from '@/components/NavBar';
// import ProductList from '@/components/ProductList';
import * as S from './styles';
import Logo from '@/components/Logo';
import logo from '../../assets/logo.svg';
import heartImage from '../../assets/Heart2.png'; // heart.png 이미지 파일의 경로를 정확하게 지정해야 합니다.
import chatImage from '../../assets/Chat_Circle_Chats.png';
import plusImage from '../../assets/plus.png';






const index = () => {
  return (
  
    <S.MainDiv>
      <S.NavContainer>
        <S.Nav>
          <S.Div>
            <img
              id="main_logo"
              alt="To Main"
              loading="lazy"
              src={logo}>            
            </img>

        
          </S.Div>
        </S.Nav>
      </S.NavContainer>
    
      <NavBar />

        <S.MainContainer className="list">
          <S.scroll className="scroll"> 

          <S.ProductDiv className="list-item">

              <S.Button>
              <img src={plusImage} alt="ㄴ" />
              </S.Button>
                <S.TextDiv>
                <S.TextLine />
                  <S.KorText>
                    <S.MainText>갤럭시Z폴드4 512G SS급
                      <S.DayText>홍다연 3일전
                        <S.PriceText>
                          440,000원
                        </S.PriceText>
                        <S.HeartIcon src={heartImage} alt="Heart Icon" />
                        <S.HeartText>  
                          8
                        </S.HeartText>

                        <S.ChatIcon src={chatImage} alt="chat Icon" />
                        <S.ChatText>
                          5
                        </S.ChatText>
                      </S.DayText>
                    </S.MainText>
                  </S.KorText>
                </S.TextDiv>

                <S.TextDiv>
                <S.TextLine />
                  <S.KorText>
                    <S.MainText>갤럭시Z폴드4 512G SS급
                      <S.DayText>홍다연 3일전
                        <S.PriceText>
                          440,000원
                        </S.PriceText>
                        <S.HeartIcon src={heartImage} alt="Heart Icon" />
                        <S.HeartText>  
                          8
                        </S.HeartText>

                        <S.ChatIcon src={chatImage} alt="chat Icon" />
                        <S.ChatText>
                          5
                        </S.ChatText>
                      </S.DayText>
                    </S.MainText>
                  </S.KorText>
                </S.TextDiv>

                <S.TextDiv>
                <S.TextLine />
                  <S.KorText>
                    <S.MainText>갤럭시Z폴드4 512G SS급
                      <S.DayText>홍다연 3일전
                        <S.PriceText>
                          440,000원
                        </S.PriceText>
                        <S.HeartIcon src={heartImage} alt="Heart Icon" />
                        <S.HeartText>  
                          8
                        </S.HeartText>

                        <S.ChatIcon src={chatImage} alt="chat Icon" />
                        <S.ChatText>
                          5
                        </S.ChatText>
                      </S.DayText>
                    </S.MainText>
                  </S.KorText>
                </S.TextDiv>

                <S.TextDiv>
                <S.TextLine />
                  <S.KorText>
                    <S.MainText>갤럭시Z폴드4 512G SS급
                      <S.DayText>홍다연 3일전
                        <S.PriceText>
                          440,000원
                        </S.PriceText>
                        <S.HeartIcon src={heartImage} alt="Heart Icon" />
                        <S.HeartText>  
                          8
                        </S.HeartText>

                        <S.ChatIcon src={chatImage} alt="chat Icon" />
                        <S.ChatText>
                          5
                        </S.ChatText>                       
                      </S.DayText>
                    </S.MainText>
                  </S.KorText>
                </S.TextDiv>

                <S.TextDiv>
                <S.TextLine />
                  <S.KorText>
                    <S.MainText>갤럭시Z폴드4 512G SS급
                      <S.DayText>홍다연 3일전
                        <S.PriceText>
                          440,000원
                        </S.PriceText> 

                        <S.HeartIcon src={heartImage} alt="Heart Icon" />
                        <S.HeartText>  
                          8
                        </S.HeartText>

                        <S.ChatIcon src={chatImage} alt="chat Icon" />
                        <S.ChatText>
                          5
                        </S.ChatText>
                      </S.DayText>
                    </S.MainText>
                  </S.KorText>
                </S.TextDiv>

                <S.TextDiv>
                <S.TextLine />
                  <S.KorText>
                    <S.MainText>갤럭시Z폴드4 512G SS급
                      <S.DayText>홍다연 3일전
                        <S.PriceText>
                          440,000원
                        </S.PriceText>
                        
                      </S.DayText>
                    </S.MainText>
                  </S.KorText>
                </S.TextDiv>


               
            </S.ProductDiv>
          </S.scroll>
      
        </S.MainContainer>

      <S.MainContainer className="list">
        <S.TextDiv>
          <S.KorText>방금 올라온 상품이에요 !</S.KorText>
          <S.TextLine />
        </S.TextDiv>
        <S.ProductDiv className="list-item"></S.ProductDiv>
      </S.MainContainer>

    </S.MainDiv>
  );
};

export default index;






