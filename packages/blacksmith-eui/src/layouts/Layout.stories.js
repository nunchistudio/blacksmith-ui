import { Layout } from './';
import { Store } from '../scenes';
import mocks from '../scenes/store/Store.mocks';

import '../theme.scss';
import '../storybook.scss';

export default {
  title: 'Display/Layout',
  component: Layout,
  args: {
    iconNunchi: '/assets/nunchi/symbol.svg',
    iconBlacksmith: '/assets/blacksmith/symbol.svg',
  },
};

const Template = (args) => {
  return (
    <Layout {...args}></Layout>
  );
};

const TemplateWithScene = (args) => {
  return (
    <Layout activeKey="store" {...args}>
      <Store axios={mocks['Overview']} />
    </Layout>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {};

export const WithScene = TemplateWithScene.bind({});
WithScene.storyName = 'With a scene';
WithScene.args = {};
