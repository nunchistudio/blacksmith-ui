import { Loading } from './';

import '../theme.scss';
import '../storybook.scss';

export default {
  title: 'Display/Loading',
  component: Loading,
};

const Template = (args) => {
  return (
    <Loading {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {};

export const WhenLoading = Template.bind({});
WhenLoading.storyName = 'When loading';
WhenLoading.args = {
  isLoading: true,
};

export const WhenNotFound = Template.bind({});
WhenNotFound.storyName = 'When resource not found';
WhenNotFound.args = {
  isLoading: false,
  statusCode: 404,
};

export const WhenNetworkError = Template.bind({});
WhenNetworkError.storyName = 'When network error';
WhenNetworkError.args = {
  isLoading: false,
  statusCode: 500,
};
