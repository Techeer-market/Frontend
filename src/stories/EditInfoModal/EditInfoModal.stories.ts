import EditInfoModal from '@/components/EditInfoModal';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Component/EditInfoModal',
  component: EditInfoModal,
  tags: ['autodocs'],
} as Meta;

type Template = StoryObj<typeof EditInfoModal>;

export const EmailModal: Template = {
  args: {
    openModal: true,
    type: 'email',
  },
};

export const PasswordModal: Template = {
  args: {
    openModal: true,
    type: 'password',
  },
};
