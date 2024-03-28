import { Meta, StoryObj } from '@storybook/react';
import ProductForm from './index';
import { Product } from '@/types/product';

export default {
  title: 'Component/ProductForm',
  component: ProductForm,
  tags: ['autodocs'],
} as Meta;

type Template = StoryObj<typeof ProductForm>;

const ITEM: Product[] = [
  {
    id: 1,
    productId: 1,
    title: '노트북 팝니다',
    thumbnailURL:
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
    name: '조은주',
    price: 100000,
    createdAt: '2023-10-10',
    productState: 'SALE',
    likes: 1,
    views: 2,
  },
  {
    id: 2,
    productId: 3,
    title: '화분',
    thumbnailURL:
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
    name: '조은주',
    price: 1000,
    createdAt: '2024-1-10',
    productState: 'SALE',
    likes: 2,
    views: 2,
  },
];

export const Basic: Template = {
  args: {
    items: ITEM,
  },
};

export const WishList: Template = {
  args: {
    items: ITEM,
    location: '/wishlist',
  },
};

// 판매 중
export const SalesList_SALE: Template = {
  args: {
    items: ITEM,
    location: '/saleslist',
    state: 'SALE',
  },
};

// 거래 완료
export const SalesList_SOLD: Template = {
  args: {
    items: ITEM,
    location: '/saleslist',
    state: 'SOLD',
  },
};
