import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersJobsAttempts } from './';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Atoms/Filters: Jobs\' attempts',
  component: FiltersJobsAttempts,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersJobsAttempts {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {};
