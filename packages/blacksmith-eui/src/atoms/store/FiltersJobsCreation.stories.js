import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersJobsCreation } from './';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Atoms/Filters: Jobs\' date range',
  component: FiltersJobsCreation,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersJobsCreation {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {};
