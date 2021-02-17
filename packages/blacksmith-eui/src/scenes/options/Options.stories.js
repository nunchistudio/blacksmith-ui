import { Layout } from '../../layouts';

import { Options } from '../';
import mocks from './Options.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Options/Scenes/Options',
  component: Options,
};

const Template = (args) => {
  return (
    <Options {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="options" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Options {...args} />
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
