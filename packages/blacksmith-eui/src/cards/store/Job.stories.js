import { CardJob } from '../';
import mocks from './Job.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Cards/Job',
  component: CardJob,
  args: {
    job_id: '1myVQXY2oD67WaKw7TNOne6nALk',
  },
};

const Template = (args) => {
  return (
    <CardJob {...args} />
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
