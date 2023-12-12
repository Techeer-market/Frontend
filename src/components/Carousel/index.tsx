import * as S from './styles';
import { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [current, setCurrent] = useState<number>(0);

  const handleClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <S.Container>
      <S.CarouselContainer
        length={images.length}
        style={{ transform: `translateX(-${current * 100}%` }}
      >
        {images.map((url, index) => (
          <S.ImageWrapper key={index}>
            {index === current && <S.Image src={url} alt="Product" />}
          </S.ImageWrapper>
        ))}
      </S.CarouselContainer>

      <S.ButtonWrapper>
        {images.map((_, index) => (
          <S.Button
            key={index}
            onClick={() => handleClick(index)}
            className={index === current ? 'active' : ''}
          />
        ))}
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default Carousel;
