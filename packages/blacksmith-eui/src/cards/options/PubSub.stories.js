import { CardPubSub } from './';
import { options } from '../../data/options';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Options/Cards/Adapter: pubsub',
  component: CardPubSub,
};

const Template = (args) => {
  return (
    <CardPubSub {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  options: options.data,
};
