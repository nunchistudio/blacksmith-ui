import { CardEvent } from '../';
import mocks from './Event.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Cards/Event',
  component: CardEvent,
  args: {
    event_id: '1n19l3OSbhUMtjMlkZnxiR3I9KZ',
  },
};

const Template = (args) => {
  return (
    <CardEvent {...args} />
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
