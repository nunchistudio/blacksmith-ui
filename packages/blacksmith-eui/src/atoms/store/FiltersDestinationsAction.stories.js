import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersDestinationsAction } from './';
import mocks from './FiltersDestinationsAction.mocks';

import '../../theme.scss';
import '../../storybook.scss';

import { destinations } from '../../data/destinations';

export default {
  title: 'Store/Atoms/Filters: Destinations\' actions',
  component: FiltersDestinationsAction,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersDestinationsAction {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  axios: mocks['Overview'],
  destinations: destinations.filled.data,
};

export const WithSuggestions = Template.bind({});
WithSuggestions.storyName = 'With suggestions';
WithSuggestions.args = {
  axios: mocks['WithSuggestions'],
  destinations: destinations.filled.data,
};

export const WithNoSuggestions = Template.bind({});
WithNoSuggestions.storyName = 'With no suggestions';
WithNoSuggestions.args = {
  axios: mocks['WithNoSuggestions'],
  destinations: destinations.empty.data,
};

export const WhenLoading = Template.bind({});
WhenLoading.storyName = 'When loading';
WhenLoading.args = {
  axios: mocks['WhenLoading'],
  destinations: destinations.filled.data,
};

export const WhenError = Template.bind({});
WhenError.storyName = 'When network error';
WhenError.args = {
  axios: mocks['WhenError'],
  destinations: destinations.filled.data,
};
