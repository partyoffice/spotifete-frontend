import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './Card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: { control: 'text' },
  },
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const NoContent = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoContent.args = {
  title: 'Join Session',
};

export const DivContent = Template.bind({});

DivContent.args = {
  title: 'Join Session',
  children: <div>Hello from inside</div>,
};
