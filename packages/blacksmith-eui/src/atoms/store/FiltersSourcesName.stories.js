import {
  EuiFlexGrid,
} from '@elastic/eui';

import { FiltersSourcesName } from './';
import mocks from './FiltersSourcesName.mocks';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Atoms/Filters: Sources\' names',
  component: FiltersSourcesName,
  args: {
    findBy: 'events',
  },
};

const Template = (args) => {
  return (
    <EuiFlexGrid columns={3} gutterSize="xl">
      <FiltersSourcesName {...args} />
    </EuiFlexGrid>
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  axios: mocks['Overview'],
};

export const WithSuggestions = Template.bind({});
WithSuggestions.storyName = 'With suggestions';
WithSuggestions.args = {
  axios: mocks['WithSuggestions'],
};

export const WithNoSuggestions = Template.bind({});
WithNoSuggestions.storyName = 'With no suggestions';
WithNoSuggestions.args = {
  axios: mocks['WithNoSuggestions'],
};

export const WhenLoading = Template.bind({});
WhenLoading.storyName = 'When loading';
WhenLoading.args = {
  axios: mocks['WhenLoading'],
};

export const WhenError = Template.bind({});
WhenError.storyName = 'When network error';
WhenError.args = {
  axios: mocks['WhenError'],
};
