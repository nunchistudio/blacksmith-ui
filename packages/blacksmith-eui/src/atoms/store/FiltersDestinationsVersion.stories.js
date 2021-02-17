import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersDestinationsVersion } from './';

import '../../theme.scss';
import '../../storybook.scss';

import { destinations } from '../../data/destinations';

export default {
  title: 'Store/Atoms/Filters: Destinations\' versions',
  component: FiltersDestinationsVersion,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersDestinationsVersion {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  destinations: destinations.filled.data,
};

export const WithSuggestions = Template.bind({});
WithSuggestions.storyName = 'With suggestions';
WithSuggestions.args = {
  destinations: destinations.filled.data,
};

export const WithNoSuggestions = Template.bind({});
WithNoSuggestions.storyName = 'With no suggestions';
WithNoSuggestions.args = {
  destinations: destinations.empty.data,
};
