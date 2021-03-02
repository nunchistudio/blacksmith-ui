import { Layout } from '../../layouts';

import { Action } from '../';
import mocks from '../../cards/destinations/Action.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Destinations/Scenes/Action',
  component: Action,
  args: {
    destination_name: 'destination-two',
  },
};

const Template = (args) => {
  return (
    <Action {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="destinations" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Action {...args} />
    </Layout>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  axios: mocks['Overview'],
};

export const WithSemaphore = Template.bind({});
WithSemaphore.storyName = 'With semaphore';
WithSemaphore.args = {
  axios: mocks['WithSemaphore'],
};

export const WithNoSemaphore = Template.bind({});
WithNoSemaphore.storyName = 'With no semaphore';
WithNoSemaphore.args = {
  axios: mocks['WithNoSemaphore'],
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
