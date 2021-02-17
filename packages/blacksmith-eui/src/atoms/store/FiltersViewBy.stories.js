import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersViewBy } from './';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Atoms/Filters: View mode',
  component: FiltersViewBy,
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersViewBy {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {};
