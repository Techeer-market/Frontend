import { Meta, StoryObj } from '@storybook/react';
import BottomNavBar from './index';

export default {
  title: 'Navbar/BottomNavBar',
  component: BottomNavBar,
  tags: ['autodocs'],
} as Meta;

type Template = StoryObj<typeof BottomNavBar>;

export const Basic: Template = {};
