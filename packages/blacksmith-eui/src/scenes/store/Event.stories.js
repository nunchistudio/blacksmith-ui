import { Layout } from '../../layouts';

import { Event } from '../';
import mocks from '../../cards/store/Event.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Scenes/Event',
  component: Event,
  args: {
    event_id: '1n19l3OSbhUMtjMlkZnxiR3I9KZ',
  },
};

const Template = (args) => {
  return (
    <Event {...args} />
  );
};

const TemplateWithLayout = (args) => {
  return (
    <Layout activeKey="store" iconNunchi="/assets/nunchi/symbol.svg" iconBlacksmith="/assets/blacksmith/symbol.svg">
      <Event {...args} />
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
