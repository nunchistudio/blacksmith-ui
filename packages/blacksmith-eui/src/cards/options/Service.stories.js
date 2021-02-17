import { CardService } from './';
import { options } from '../../data/options';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Options/Cards/Service',
  component: CardService,
};

const Template = (args) => {
  return (
    <CardService {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  service: 'gateway',
  options: options.data,
};

export const WithGateway = Template.bind({});
WithGateway.storyName = 'For the gateway';
WithGateway.args = {
  service: 'gateway',
  options: options.data,
};

export const WithScheduler = Template.bind({});
WithScheduler.storyName = 'For the scheduler';
WithScheduler.args = {
  service: 'scheduler',
  options: options.data,
};
