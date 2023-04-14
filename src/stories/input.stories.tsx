import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { whiteMoonIcon } from '@shared/font-awesome-icons';
import { Meta, StoryFn } from '@storybook/react';

import Input from 'components/ui/input';

export default {
  title: 'Input',
  component: Input,
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args}>{args.children}</Input>;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Write something...',
};

export const FullWidth = Template.bind({});
Default.args = {
  placeholder: 'Write something...',
  fullWidth: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Label',
};
