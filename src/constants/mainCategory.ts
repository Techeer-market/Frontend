import category1 from '@/assets/category1.jpg';
import category2 from '@/assets/category2.jpg';
import category3 from '@/assets/category3.jpg';
import category4 from '@/assets/category4.jpg';
import category5 from '@/assets/category5.jpg';
import category6 from '@/assets/category6.jpg';
import category7 from '@/assets/category7.jpg';
import category8 from '@/assets/category8.jpg';
import category9 from '@/assets/category9.jpg';

export interface Category {
  id: string;
  title: string;
  image: string;
}

export const mainCategory: Category[] = [
  {
    id: 'category1',
    title: '디지털기기',
    image: category1,
  },
  {
    id: 'category2',
    title: '여성의류',
    image: category2,
  },
  {
    id: 'category3',
    title: '남성의류/잡화',
    image: category3,
  },
  {
    id: 'category4',
    title: '뷰티/미용',
    image: category4,
  },
  {
    id: 'category5',
    title: '여성잡화',
    image: category5,
  },
  {
    id: 'category6',
    title: '생활가전',
    image: category6,
  },
  {
    id: 'category7',
    title: '생활/주방',
    image: category7,
  },
  {
    id: 'category8',
    title: '취미/게임/음반',
    image: category8,
  },
  {
    id: 'category9',
    title: '도서',
    image: category9,
  },
];
