import { CardTrigger } from '../';
import mocks from './Trigger.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Sources/Cards/Trigger',
  component: CardTrigger,
  args: {
    source_name: 'source-two',
  },
};

const Template = (args) => {
  return (
    <CardTrigger {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  axios: mocks['Overview'],
};

export const WhenLoading = Template.bind({});
WhenLoading.storyName = 'When loading';
WhenLoading.args = {
  axios: mocks['WhenLoading'],
};

export const WhenNotFound = Template.bind({});
WhenNotFound.storyName = 'When resource not found';
WhenNotFound.args = {
  axios: mocks['WhenNotFound'],
};

export const WhenError = Template.bind({});
WhenError.storyName = 'When network error';
WhenError.args = {
  axios: mocks['WhenError'],
};
