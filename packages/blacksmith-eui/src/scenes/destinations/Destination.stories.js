import { Layout } from '../../layouts';

import { Destination } from '../';
import mocks from '../../cards/destinations/Destination.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Destinations/Scenes/Destination',
  component: Destination,
  args: {
    destination_name: 'destination-one',
  },
};

const Template = (args) => {
  return (
    <Destination {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="destinations" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Destination {...args} />
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

export const WithLayout = TemplateWithLayout.bind({});
WithLayout.storyName = 'With layout';
WithLayout.args = {
  axios: mocks['Overview'],
};
