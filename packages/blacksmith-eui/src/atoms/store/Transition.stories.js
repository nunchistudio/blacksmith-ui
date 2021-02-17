import { Transition } from './';

import '../../theme.scss';
import '../../storybook.scss';

export default {
  title: 'Store/Atoms/Transition',
  component: Transition,
};

const Template = (args) => {
  return (
    <Transition {...args} />
  );
};

export const Overview = Template.bind({});
Overview.storyName = 'Overview';
Overview.args = {
  transition: {
    state_after: 'failed',
    error: {
      statusCode: 401,
      message: 'Not authorized',
      validations: [
        {
          message: 'Email address not authorized',
          path: [
            'request',
            'payload',
            'data',
            'email'
          ]
        }
      ]
    },
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};

export const StatusAcknowledged = Template.bind({});
StatusAcknowledged.storyName = 'Status: Acknowledged';
StatusAcknowledged.args = {
  transition: {
    state_after: 'acknowledged',
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};

export const StatusAwaiting = Template.bind({});
StatusAwaiting.storyName = 'Status: Awaiting';
StatusAwaiting.args = {
  transition: {
    state_after: 'awaiting',
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};

export const StatusExecuting = Template.bind({});
StatusExecuting.storyName = 'Status: Executing';
StatusExecuting.args = {
  transition: {
    state_after: 'executing',
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};

export const StatusSucceeded = Template.bind({});
StatusSucceeded.storyName = 'Status: Succeeded';
StatusSucceeded.args = {
  transition: {
    state_after: 'succeeded',
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};

export const StatusFailed = Template.bind({});
StatusFailed.storyName = 'Status: Failed';
StatusFailed.args = {
  transition: {
    state_after: 'failed',
    error: {
      statusCode: 401,
      message: 'Not authorized',
      validations: [
        {
          message: 'Email address not authorized',
          path: [
            'request',
            'payload',
            'data',
            'email'
          ]
        }
      ]
    },
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};

export const StatusDiscarded = Template.bind({});
StatusDiscarded.storyName = 'Status: Discarded';
StatusDiscarded.args = {
  transition: {
    state_after: 'discarded',
    error: {
      statusCode: 401,
      message: 'Not authorized',
      validations: [
        {
          message: 'Email address not authorized',
          path: [
            'request',
            'payload',
            'data',
            'email'
          ]
        }
      ]
    },
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};

export const StatusUnknown = Template.bind({});
StatusUnknown.storyName = 'Status: Unknown';
StatusUnknown.args = {
  transition: {
    state_after: 'unknown',
    created_at: '2021-01-19T13:35:20.059208Z',
  },
};
