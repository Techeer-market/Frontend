import { Meta, StoryObj } from '@storybook/react';
import TopNavBar from './index';

export default {
  title: 'Navbar/TopNavBar',
  component: TopNavBar,
  tags: ['autodocs'],
} as Meta;

type Template = StoryObj<typeof TopNavBar>;

export const Basic: Template = {
  args: {
    page: '페이지',
    onNavBack: () => {},
  },
};
