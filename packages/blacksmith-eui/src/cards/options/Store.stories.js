import { CardStore } from './';
import { options } from '../../data/options';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Options/Cards/Adapter: store',
  component: CardStore,
};

const Template = (args) => {
  return (
    <CardStore {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  options: options.data,
};
