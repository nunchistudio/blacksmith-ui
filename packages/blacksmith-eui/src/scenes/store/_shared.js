import {
  EuiLink, EuiCode,
  EuiHealth,
} from '@elastic/eui';

import { formatDate } from '@elastic/eui/lib/services/format';

/**
 * Functions for rendering the table content based on the view (either "events"
 * or "jobs") and the links passed in the component's properties.
 */
export const columns = {
  'events': (props) => ([
    {
      field: 'id',
      name: 'Event ID',
      width: '25%',
      truncateText: true,
      textOnly: true,
      render: (id, row) => {
        let link = props.linkToEvent.replace(':event_id', id);

        return (
          <EuiLink href={link}>{id}</EuiLink>
        );
      },
    },
    {
      field: 'source',
      name: 'Source',
      width: '20%',
      render: (source, row) => {
        let link = props.linkToSource.replace(':source_name', source);

        return (
          <EuiCode>
            <EuiLink href={link}>{source}</EuiLink>
          </EuiCode>
        );
      },
    },
    {
      field: 'trigger',
      name: 'Trigger',
      width: '20%',
      render: (trigger, row) => {
        let link = props.linkToTrigger.replace(':source_name', row.source);
        link = link.replace(':trigger_name', trigger);

        return (
          <EuiCode>
            <EuiLink href={link}>{trigger}</EuiLink>
          </EuiCode>
        );
      },
    },
    {
      field: 'jobs',
      name: 'Jobs created',
      width: '15%',
      render: (jobs, row) => {
        if (jobs && Array.isArray(jobs)) {
          return jobs.length;
        }

        return 0;
      },
    },
    {
      field: 'received_at',
      name: 'Received at',
      width: '20%',
      truncateText: true,
      textOnly: true,
      dataType: 'date',
      render: (date) => {
        return formatDate(date, 'longDateTime');
      },
    },
  ]),
  'jobs': (props) => ([
    {
      field: 'id',
      name: 'Job ID',
      width: '25%',
      truncateText: true,
      textOnly: true,
      render: (id, row) => {
        let link = props.linkToJob.replace(':job_id', id);

        return (
          <EuiLink href={link}>{id}</EuiLink>
        );
      },
      mobileOptions: {
        truncateText: true,
      },
    },
    {
      field: 'destination',
      name: 'Destination',
      width: '20%',
      render: (destination, row) => {
        let link = props.linkToDestination.replace(':destination_name', destination);

        return (
          <EuiCode>
            <EuiLink href={link}>{destination}</EuiLink>
          </EuiCode>
        );
      },
    },
    {
      field: 'action',
      name: 'Action',
      width: '20%',
      render: (action, row) => {
        let link = props.linkToAction.replace(':destination_name', row.destination);
        link = link.replace(':action_name', action);

        return (
          <EuiCode>
            <EuiLink href={link}>{action}</EuiLink>
          </EuiCode>
        );
      },
    },
    {
      field: 'status',
      name: 'Status',
      width: '15%',
      render: (_, row) => {
        if (!row.transitions) {
          return '';
        }

        let status = row.transitions[0].state_after;
        switch (status) {
          case 'acknowledged':
            return <EuiHealth color="#D3DAE6">Acknowledged</EuiHealth>;
          case 'awaiting':
            return <EuiHealth color="#98A2B3">Awaiting</EuiHealth>;
          case 'executing':
            return <EuiHealth color="#006BB4">Executing</EuiHealth>;
          case 'succeeded':
            return <EuiHealth color="#017D73">Succeeded</EuiHealth>;
          case 'failed':
            return <EuiHealth color="#F5A700">Failed</EuiHealth>;
          case 'discarded':
            return <EuiHealth color="#BD271E">Discarded</EuiHealth>;
          default:
            return <EuiHealth color="#000000">Unknown</EuiHealth>;
        };
      },
    },
    {
      field: 'created_at',
      name: 'Created at',
      width: '20%',
      truncateText: true,
      textOnly: true,
      dataType: 'date',
      render: (date) => {
        return formatDate(date, 'longDateTime');
      },
    },
  ]),
};
