import { Layout } from '../../layouts';

import { Destinations } from '../';
import mocks from './Destinations.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Destinations/Scenes/Destinations',
  component: Destinations,
};

const Template = (args) => {
  return (
    <Destinations {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="destinations" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Destinations {...args} />
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
