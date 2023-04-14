import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { whiteMoonIcon } from '@shared/font-awesome-icons';
import { Meta, StoryFn } from '@storybook/react';

import Button from 'components/ui/button';
import styles from 'components/ui/button/button.module.scss';

export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args}>{args.children}</Button>;

export const Default = Template.bind({});
Default.args = {
  children: 'Click me',
  as: 'button',
};
export const MediumSize = Template.bind({});
MediumSize.args = {
  children: 'Click me',
  size: 'medium',
  as: 'button',
};

export const RoundWithIcon = Template.bind({});
RoundWithIcon.args = {
  children: <FontAwesomeIcon icon={whiteMoonIcon} />,
  round: true,
  as: 'a',
};
