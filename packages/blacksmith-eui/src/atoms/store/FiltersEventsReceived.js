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
    'events.received': <>Where event <strong>received</strong></>,
    'events.received_after': 'is after:',
    'events.received_before': 'is before:',
  },
  'jobs': {
    'events.received': <>From event <strong>received</strong></>,
    'events.received_after': 'is after:',
    'events.received_before': 'is before:',
  },
};

/**
 * Atom component to display and apply a time range for the event reception
 * date in the store form.
 */
export class FiltersEventsReceived extends React.Component {
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
      eventsReceivedAfter: null,
      eventsReceivedBefore: null,
    },
    isInvalid: {
      eventsReceivedAfter: false,
      eventsReceivedAfter: false,
    },
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let eventsReceivedAfter = undefined;
    if (this.state.filters.eventsReceivedAfter != null) {
      eventsReceivedAfter = this.state.filters.eventsReceivedAfter.format('YYYY-MM-DD hh:mm:ss');
    }

    let eventsReceivedBefore = undefined;
    if (this.state.filters.eventsReceivedBefore != null) {
      eventsReceivedBefore = this.state.filters.eventsReceivedBefore.format('YYYY-MM-DD hh:mm:ss');
    }

    const params = {
      'events.received_after': eventsReceivedAfter,
      'events.received_before': eventsReceivedBefore,
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
          eventsReceivedAfter: date,
        },
        isInvalid: { ...prevState.isInvalid,
          eventsReceivedBefore: moment(date).isAfter(this.state.filters.eventsReceivedBefore),
          eventsReceivedAfter: moment(date).isAfter(this.state.filters.eventsReceivedBefore),
        },
      }), this.filtersDidUpdate);
    };

    const changeEventsReceivedBefore = (date) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          eventsReceivedBefore: date,
        },
        isInvalid: { ...prevState.isInvalid,
          eventsReceivedBefore: moment(this.state.filters.eventsReceivedAfter).isAfter(date),
          eventsReceivedAfter: moment(this.state.filters.eventsReceivedAfter).isAfter(date),
        },
      }), this.filtersDidUpdate);
    };

    return (
      <React.Fragment>
        <EuiFlexItem grow={true}>
          <span className="euiFormRow__group">
            {labels[this.props.findBy]['events.received']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.received_after']}
            isInvalid={this.state.isInvalid.eventsReceivedAfter}
            error={this.state.isInvalid.eventsReceivedAfter ? 'Can not be later than the "before" filter' : undefined}
          >
            <EuiDatePicker showTimeSelect popoverPlacement="top-end"
              isInvalid={this.state.isInvalid.eventsReceivedAfter}
              selected={this.state.filters.eventsReceivedAfter}
              onChange={changeEventsReceivedAfter}
              onClear={() => changeEventsReceivedAfter(null)}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.received_before']}
            isInvalid={this.state.isInvalid.eventsReceivedBefore}
            error={this.state.isInvalid.eventsReceivedBefore ? 'Can not be earlier than the "after" filter' : undefined}
          >
            <EuiDatePicker showTimeSelect popoverPlacement="top-end"
              isInvalid={this.state.isInvalid.eventsReceivedBefore}
              selected={this.state.filters.eventsReceivedBefore}
              onChange={changeEventsReceivedBefore}
              onClear={() => changeEventsReceivedBefore(null)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
