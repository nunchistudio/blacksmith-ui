import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  EuiFlexItem,
  EuiFormRow, EuiDatePicker,
} from '@elastic/eui';

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'jobs.created': <>With job <strong>creation</strong></>,
    'jobs.created_after': 'is after:',
    'jobs.created_before': 'is before:',
  },
  'jobs': {
    'jobs.created': <>Where job <strong>creation</strong></>,
    'jobs.created_after': 'is after:',
    'jobs.created_before': 'is before:',
  },
};

/**
 * Atom component to display and apply a time range for the job creation
 * date in the store form.
 */
export class FiltersJobsCreation extends React.Component {
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
      jobsCreatedAfter: null,
      jobsCreatedBefore: null,
    },
    isInvalid: {
      jobsCreatedAfter: false,
      jobsCreatedAfter: false,
    },
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let jobsCreatedAfter = undefined;
    if (this.state.filters.jobsCreatedAfter != null) {
      jobsCreatedAfter = this.state.filters.jobsCreatedAfter.format('YYYY-MM-DD hh:mm:ss');
    }

    let jobsCreatedBefore = undefined;
    if (this.state.filters.jobsCreatedBefore != null) {
      jobsCreatedBefore = this.state.filters.jobsCreatedBefore.format('YYYY-MM-DD hh:mm:ss');
    }

    const params = {
      'jobs.created_after': jobsCreatedAfter,
      'jobs.created_before': jobsCreatedBefore,
    };

    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate(this.state.isInvalid, this.state.filters, params);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const changeEventsReceivedAfter = (date) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          jobsCreatedAfter: date,
        },
        isInvalid: { ...prevState.isInvalid,
          jobsCreatedBefore: moment(date).isAfter(this.state.filters.jobsCreatedBefore),
          jobsCreatedAfter: moment(date).isAfter(this.state.filters.jobsCreatedBefore),
        },
      }), this.filtersDidUpdate);
    };

    const changeEventsReceivedBefore = (date) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          jobsCreatedBefore: date,
        },
        isInvalid: { ...prevState.isInvalid,
          jobsCreatedBefore: moment(this.state.filters.jobsCreatedAfter).isAfter(date),
          jobsCreatedAfter: moment(this.state.filters.jobsCreatedAfter).isAfter(date),
        },
      }), this.filtersDidUpdate);
    };

    return (
      <React.Fragment>
        <EuiFlexItem grow={true}>
          <span className="euiFormRow__group">
            {labels[this.props.findBy]['jobs.created']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.created_after']}
            isInvalid={this.state.isInvalid.jobsCreatedAfter}
            error={this.state.isInvalid.jobsCreatedAfter ? 'Can not be later than the "before" filter' : undefined}
          >
            <EuiDatePicker showTimeSelect popoverPlacement="top-end"
              isInvalid={this.state.isInvalid.jobsCreatedAfter}
              selected={this.state.filters.jobsCreatedAfter}
              onChange={changeEventsReceivedAfter}
              onClear={() => changeEventsReceivedAfter(null)}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.created_before']}
            isInvalid={this.state.isInvalid.jobsCreatedBefore}
            error={this.state.isInvalid.jobsCreatedBefore ? 'Can not be earlier than the "after" filter' : undefined}
          >
            <EuiDatePicker showTimeSelect popoverPlacement="top-end"
              isInvalid={this.state.isInvalid.jobsCreatedBefore}
              selected={this.state.filters.jobsCreatedBefore}
              onChange={changeEventsReceivedBefore}
              onClear={() => changeEventsReceivedBefore(null)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
