import { CustomerPortal } from './';

import '../theme.scss';
import '../storybook.scss';

export default {
  title: 'Pages/Customer Portal',
  component: CustomerPortal,
};

const Template = (args) => {
  return (
    <CustomerPortal {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {};
