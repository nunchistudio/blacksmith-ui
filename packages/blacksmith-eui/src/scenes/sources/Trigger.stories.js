import { Layout } from '../../layouts';

import { Trigger } from '../';
import mocks from '../../cards/sources/Trigger.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Sources/Scenes/Trigger',
  component: Trigger,
  args: {
    source_name: 'source-two',
  },
};

const Template = (args) => {
  return (
    <Trigger {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="sources" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Trigger {...args} />
    </Layout>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  axios: mocks['Overview'],
};

export const WithSemaphoreApplicable = Template.bind({});
WithSemaphoreApplicable.storyName = 'With semaphore applicable';
WithSemaphoreApplicable.args = {
  axios: mocks['WithSemaphoreApplicable'],
};

export const WithSemaphoreNotApplicable = Template.bind({});
WithSemaphoreNotApplicable.storyName = 'With semaphore not applicable';
WithSemaphoreNotApplicable.args = {
  axios: mocks['WithSemaphoreNotApplicable'],
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
