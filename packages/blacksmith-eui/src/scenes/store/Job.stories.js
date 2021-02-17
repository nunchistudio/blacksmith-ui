import { Layout } from '../../layouts';

import { Job } from '../';
import mocks from '../../cards/store/Job.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Scenes/Job',
  component: Job,
  args: {
    job_id: '1myVQXY2oD67WaKw7TNOne6nALk',
  },
};

const Template = (args) => {
  return (
    <Job {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="store" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Job {...args} />
    </Layout>
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

export const WhenError = Template.bind({});
WhenError.storyName = 'When network error';
WhenError.args = {
  axios: mocks['WhenError'],
};

export const WithLayout = TemplateWithLayout.bind({});
WithLayout.storyName = 'With layout';
WithLayout.args = {
  axios: mocks['Overview'],
};
