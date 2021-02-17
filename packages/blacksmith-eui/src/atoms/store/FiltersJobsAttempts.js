import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexItem,
  EuiFormRow, EuiFieldNumber,
} from '@elastic/eui';

/**
 * List of known errors that can be displayed in the component.
 */
const errors = {
  'min.not_valid': 'Can not be greater than the "max attempts" filter',
  'max.not_valid': 'Can not be lesser than the "min attempts" filter',
};

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'jobs.attempts': <>With job <strong>attempts</strong></>,
    'jobs.min_attempts': 'is equal or greater than:',
    'jobs.max_attempts': 'is equal or lesser than:',
  },
  'jobs': {
    'jobs.attempts': <>Where job <strong>attempts</strong></>,
    'jobs.min_attempts': 'is equal or greater than:',
    'jobs.max_attempts': 'is equal or lesser than:',
  },
};

/**
 * Atom component to display attempts range of a specific job managed
 * by a Blacksmith application in the store form.
 */
export class FiltersJobsAttempts extends React.Component {
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
    filters: {
      jobsMinAttempts: '',
      jobsMaxAttempts: '',
    },
    isInvalid: {
      jobsMinAttempts: false,
      jobsMaxAttempts: false,
    },
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    const params = {
      'jobs.min_attempts': this.state.filters.jobsMinAttempts,
      'jobs.max_attempts': this.state.filters.jobsMaxAttempts,
    };

    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate(this.state.isInvalid, this.state.filters, params);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const changeJobsMinAttempts = (event) => {
      event.persist();

      let value = event.target === null ? 0 : event.target.valueAsNumber;
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          jobsMinAttempts: value,
        },
        isInvalid: { ...prevState.isInvalid,
          jobsMinAttempts: typeof this.state.filters.jobsMaxAttempts === 'number' ?
            value > this.state.filters.jobsMaxAttempts : undefined,
          jobsMaxAttempts: typeof this.state.filters.jobsMaxAttempts === 'number' ?
            value > this.state.filters.jobsMaxAttempts : undefined,
        },
      }), this.filtersDidUpdate);
    };

    const changeJobsMaxAttempts = (event) => {
      event.persist();

      let value = event.target === null ? 0 : event.target.valueAsNumber;
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          jobsMaxAttempts: value,
        },
        isInvalid: { ...prevState.isInvalid,
          jobsMinAttempts: typeof this.state.filters.jobsMinAttempts === 'number' ?
            this.state.filters.jobsMinAttempts > value : undefined,
          jobsMaxAttempts: typeof this.state.filters.jobsMinAttempts === 'number' ?
            this.state.filters.jobsMinAttempts > value : undefined,
        },
      }), this.filtersDidUpdate);
    };

    return (
      <React.Fragment>
        <EuiFlexItem grow={true}>
          <span className="euiFormRow__group">
            {labels[this.props.findBy]['jobs.attempts']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.min_attempts']}
            isInvalid={this.state.isInvalid.jobsMinAttempts}
            error={this.state.isInvalid.jobsMinAttempts ? errors['min.not_valid'] : undefined}
          >
            <EuiFieldNumber value={this.state.filters.jobsMinAttempts}
              placeholder="0"
              isInvalid={this.state.isInvalid.jobsMinAttempts}
              onChange={changeJobsMinAttempts}
              min={0}
              max={typeof this.state.filters.jobsMaxAttempts === 'number'
                ? this.state.filters.jobsMaxAttempts
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.max_attempts']}
            isInvalid={this.state.isInvalid.jobsMaxAttempts}
            error={this.state.isInvalid.jobsMaxAttempts ? errors['max.not_valid'] : undefined}
          >
            <EuiFieldNumber value={this.state.filters.jobsMaxAttempts}
              isInvalid={this.state.isInvalid.jobsMaxAttempts}
              onChange={changeJobsMaxAttempts}
              min={typeof this.state.filters.jobsMinAttempts === 'number'
                ? this.state.filters.jobsMinAttempts
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
