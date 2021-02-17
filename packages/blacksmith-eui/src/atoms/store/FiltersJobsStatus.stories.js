import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersJobsStatus } from './';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Atoms/Filters: Jobs\' status',
  component: FiltersJobsStatus,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersJobsStatus {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {};
