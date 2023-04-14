import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { whiteMoonIcon } from '@shared/font-awesome-icons';
import { Meta, StoryFn } from '@storybook/react';

import Toggle from 'components/ui/toggle';

export default {
  title: 'Toggle',
  component: Toggle,
} as Meta<typeof Toggle>;

const Template: StoryFn<typeof Toggle> = (args) => <Toggle {...args}>{args.children}</Toggle>;

export const Default = Template.bind({});
Default.args = {};

export const WithText = Template.bind({});
WithText.args = {
  text: 'Toggle me',
};
