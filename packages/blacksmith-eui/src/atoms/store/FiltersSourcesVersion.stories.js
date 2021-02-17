import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersSourcesVersion } from './';

import '../../theme.scss';
import '../../storybook.scss';

import { sources } from '../../data/sources';

export default {
  title: 'Store/Atoms/Filters: Sources\' versions',
  component: FiltersSourcesVersion,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersSourcesVersion {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  sources: sources.filled.data,
};

export const WithSuggestions = Template.bind({});
WithSuggestions.storyName = 'With suggestions';
WithSuggestions.args = {
  sources: sources.filled.data,
};

export const WithNoSuggestions = Template.bind({});
WithNoSuggestions.storyName = 'With no suggestions';
WithNoSuggestions.args = {
  sources: sources.empty.data,
};
