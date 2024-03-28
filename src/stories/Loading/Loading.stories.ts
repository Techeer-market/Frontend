import { Meta, StoryObj } from '@storybook/react';
import Loading from '../../components/Loading';

export default {
  title: 'Component/Loading',
  component: Loading,
  tags: ['autodocs'],
} as Meta;

type Template = StoryObj<typeof Loading>;

export const Basic: Template = {};
