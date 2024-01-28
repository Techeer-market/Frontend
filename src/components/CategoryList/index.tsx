import * as S from '@/pages/CategoryPage/styles';
import { useNavigate } from 'react-router-dom';
import { mainCategory, Category } from '@/constants/mainCategory';
import TopNavBar from '../TopNavBar';

const CategoryList = () => {
  const navigate = useNavigate();
  const handleCategory = (mainCategory: Category) => {
    navigate(`/category/${mainCategory.id}`);
  };
  return (
    <S.Container>
      <TopNavBar page="전체 서비스"/>
      <S.Body>
        <S.Grid>
          {mainCategory.map((category: Category) => (
            <S.Item key={category.id}>
              <img
                alt={`To ${category.title}`}
                loading="lazy"
                src={category.image}
                onClick={() => {
                  handleCategory(category);
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

export default CategoryList;
