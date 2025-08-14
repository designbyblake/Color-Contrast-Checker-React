import { ComponentMeta,ComponentStory } from '@storybook/react';

import { ColorTile } from './ColorTile';

export default {
  title: 'ColorTile',
  component: ColorTile
} as ComponentMeta<typeof ColorTile>;

const Template: ComponentStory<typeof ColorTile> = (args) => (
  <ColorTile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  hexString: '#FF0000',
  rgbArray: [255, 0, 0]
};
