import { Meta, StoryObj } from '@storybook/react';
import Carousel from '../../components/Carousel/index';

export default {
  title: 'Component/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} as Meta;

type Template = StoryObj<typeof Carousel>;

export const Empty: Template = {
  args: {
    images: [],
  },
};

export const Basic: Template = {
  args: {
    images: [
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
    ],
  },
};

export const Multiple: Template = {
  args: {
    images: [
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
    ],
  },
};
