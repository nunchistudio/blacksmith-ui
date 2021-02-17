import { CardWanderer } from './';
import { options } from '../../data/options';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Options/Cards/Adapter: wanderer',
  component: CardWanderer,
};

const Template = (args) => {
  return (
    <CardWanderer {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  options: options.data,
};
