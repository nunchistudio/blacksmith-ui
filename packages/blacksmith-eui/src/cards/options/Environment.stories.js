import { CardEnvironment } from './';
import { options } from '../../data/options';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Options/Cards/Environment',
  component: CardEnvironment,
};

const Template = (args) => {
  return (
    <CardEnvironment {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  options: options.data,
};
