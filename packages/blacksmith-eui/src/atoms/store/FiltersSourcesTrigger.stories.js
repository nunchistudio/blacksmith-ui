import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersSourcesTrigger } from './';
import mocks from './FiltersSourcesTrigger.mocks';

import '../../theme.scss';
import '../../storybook.scss';

import { sources } from '../../data/sources';

export default {
  title: 'Store/Atoms/Filters: Sources\' triggers',
  component: FiltersSourcesTrigger,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersSourcesTrigger {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  axios: mocks['Overview'],
  sources: sources.filled.data,
};

export const WithSuggestions = Template.bind({});
WithSuggestions.storyName = 'With suggestions';
WithSuggestions.args = {
  axios: mocks['WithSuggestions'],
  sources: sources.filled.data,
};

export const WithNoSuggestions = Template.bind({});
WithNoSuggestions.storyName = 'With no suggestions';
WithNoSuggestions.args = {
  axios: mocks['WithNoSuggestions'],
  sources: sources.empty.data,
};

export const WhenLoading = Template.bind({});
WhenLoading.storyName = 'When loading';
WhenLoading.args = {
  axios: mocks['WhenLoading'],
  sources: sources.filled.data,
};

export const WhenError = Template.bind({});
WhenError.storyName = 'When network error';
WhenError.args = {
  axios: mocks['WhenError'],
  sources: sources.filled.data,
};
