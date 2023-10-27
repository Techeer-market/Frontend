import category1 from '@/assets/category1.jpg';
import category2 from '@/assets/category2.jpg';
import category3 from '@/assets/category3.jpg';
import category4 from '@/assets/category4.jpg';
import category5 from '@/assets/category5.jpg';
import category6 from '@/assets/category6.jpg';
import category7 from '@/assets/category7.jpg';
import category8 from '@/assets/category8.jpg';
import category9 from '@/assets/category9.jpg';
import { CategoryData } from '@/types/category';

export interface Category {
  id: number;
  title: string;
  image: string;
}

export const mainCategory: CategoryData[] = [
  {
    id: 1,
    title: '디지털기기',
    image: category1,
  },
  {
    id: 2,
    title: '여성의류',
    image: category2,
  },
  {
    id: 3,
    title: '남성의류/잡화',
    image: category3,
  },
  {
    id: 4,
    title: '뷰티/미용',
    image: category4,
  },
  {
    id: 5,
    title: '여성잡화',
    image: category5,
  },
  {
    id: 6,
    title: '생활가전',
    image: category6,
  },
  {
    id: 7,
    title: '생활/주방',
    image: category7,
  },
  {
    id: 8,
    title: '취미/게임/음반',
    image: category8,
  },
  {
    id: 9,
    title: '도서',
    image: category9,
  },
];
