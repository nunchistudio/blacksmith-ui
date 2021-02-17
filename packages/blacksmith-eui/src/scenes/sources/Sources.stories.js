import { Layout } from '../../layouts';

import { Sources } from '../';
import mocks from './Sources.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Sources/Scenes/Sources',
  component: Sources,
};

const Template = (args) => {
  return (
    <Sources {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="sources" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Sources {...args} />
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
