import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexItem,
  EuiFormRow, EuiComboBox,
  EuiHealth, EuiHighlight,
} from '@elastic/eui';

/**
 * List of known jobs status, formatted for Elastic UI forms options.
 */
const jobsStatusList = [
  {
    color: '#D3DAE6',
    label: 'Acknowledged',
    value: {
      status: 'acknowledged',
    },
  },
  {
    color: '#98A2B3',
    label: 'Awaiting',
    value: {
      status: 'awaiting',
    },
  },
  {
    color: '#006BB4',
    label: 'Executing',
    value: {
      status: 'executing',
    },
  },
  {
    color: '#017D73',
    label: 'Succeeded',
    value: {
      status: 'succeeded',
    },
  },
  {
    color: '#F5A700',
    label: 'Failed',
    value: {
      status: 'failed',
    },
  },
  {
    color: '#BD271E',
    label: 'Discarded',
    value: {
      status: 'discarded',
    },
  },
  {
    color: '#000000',
    label: 'Unknown',
    value: {
      status: 'unknown',
    },
  },
];

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'jobs.status': <>With job <strong>status</strong></>,
    'jobs.status_in': 'is one of:',
    'jobs.status_notin': 'is not one of:',
  },
  'jobs': {
    'jobs.status': <>Where job <strong>status</strong></>,
    'jobs.status_in': 'is one of:',
    'jobs.status_notin': 'is not one of:',
  },
};

/**
 * Atom component to display and apply filters on the jobs status in the
 * store form.
 */
export class FiltersJobsStatus extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * Change the wording based on the "view". Are you looking for events
     * or jobs?
     */
    findBy: PropTypes.oneOf(['events', 'jobs']).isRequired,

    /**
     * Callback function when the component's state has changed. It gives
     * access to the new data present in the state of the component in
     * different formats with different kinds of details.
     *
     * @param isInvalid - Map of the labels marked as "true" is an error
     * has occured.
     * @param filters - Map of the labels formatted for Elastic UI forms.
     * @param params - Map of the labels formatted as HTTP params for
     * Blacksmith API.
     * @param data - Map of the data used in the component.
     */
    onFiltersUpdate: PropTypes.func,
  };

  /**
   * Default component state.
   */
  state = {
    data: {
      jobsStatus: jobsStatusList,
    },
    filters: {
      jobsStatusIn: [],
      jobsStatusNotIn: [],
    },
    isInvalid: {
      jobsStatusIn: false,
      jobsStatusNotIn: false,
    },
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let jobsStatusIn = [];
    this.state.filters.jobsStatusIn.forEach((entry) => {
      jobsStatusIn.push(entry.value.status);
    });

    let jobsStatusNotIn = [];
    this.state.filters.jobsStatusNotIn.forEach((entry) => {
      jobsStatusNotIn.push(entry.value.status);
    });

    const params = {
      'jobs.status_in': jobsStatusIn.length > 0 ? jobsStatusIn : undefined,
      'jobs.status_notin': jobsStatusNotIn.length > 0 ? jobsStatusNotIn : undefined,
    };

    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate(this.state.isInvalid, this.state.filters, params);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const renderStatus = (option, searchValue, contentClassName) => {
      return (
        <EuiHealth color={option.color}>
          <span className={contentClassName}>
            <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
          </span>
        </EuiHealth>
      );
    };

    const changeJobsStatusScope = (key, selectedStatus) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          [key]: selectedStatus,
        },
      }), this.filtersDidUpdate);
    };

    return (
      <React.Fragment>
        <EuiFlexItem grow={true}>
          <span className="euiFormRow__group">
            {labels[this.props.findBy]['jobs.status']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.status_in']}
            isInvalid={this.state.isInvalid.jobsStatusIn}
          >
            <EuiComboBox sortMatchesBy="startsWith"
              placeholder="Select from suggested status"
              isInvalid={this.state.isInvalid.jobsStatusIn}
              options={this.state.data.jobsStatus}
              renderOption={renderStatus}
              selectedOptions={this.state.filters.jobsStatusIn}
              onChange={(selectedOptions) => changeJobsStatusScope('jobsStatusIn', selectedOptions)}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.status_notin']}
            isInvalid={this.state.isInvalid.jobsStatusNotIn}
          >
            <EuiComboBox sortMatchesBy="startsWith"
              placeholder="Select from suggested status"
              isInvalid={this.state.isInvalid.jobsStatusNotIn}
              options={this.state.data.jobsStatus}
              renderOption={renderStatus}
              selectedOptions={this.state.filters.jobsStatusNotIn}
              onChange={(selectedOptions) => changeJobsStatusScope('jobsStatusNotIn', selectedOptions)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
