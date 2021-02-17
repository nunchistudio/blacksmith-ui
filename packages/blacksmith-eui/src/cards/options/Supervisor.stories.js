import { CardSupervisor } from './';
import { options } from '../../data/options';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Options/Cards/Adapter: supervisor',
  component: CardSupervisor,
};

const Template = (args) => {
  return (
    <CardSupervisor {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  options: options.data,
};
