import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexItem,
  EuiFormRow, EuiComboBox,
} from '@elastic/eui';

import { isNameValid } from './_shared';

/**
 * List of known errors that can be displayed in the component.
 */
const errors = {
  'api.fetch': 'Failed to fetch destinations from API',
};

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'jobs.destinations': <>With job's <strong>destination</strong></>,
    'jobs.destinations_in': 'is one of:',
    'jobs.destinations_notin': 'is not one of:',
  },
  'jobs': {
    'jobs.destinations': <>Where <strong>destination</strong></>,
    'jobs.destinations_in': 'is one of:',
    'jobs.destinations_notin': 'is not one of:',
  },
};

/**
 * Atom component to retrieve and display destinations of a Blacksmith
 * application in the store form.
 */
export class FiltersDestinationsName extends React.Component {
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
     * The axios instance to use for communicating with the Blacksmith API.
     */
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

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
   * Default values for the properties.
   */
  static defaultProps = {};

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    options: {
      destinations: [],
    },
    data: {
      error: null,
      destinations: [],
    },
    filters: {
      destinationsIn: [],
      destinationsNotIn: [],
    },
    isInvalid: {
      destinationsIn: false,
      destinationsNotIn: false,
    },
  };

  /**
   * When mounting the component load destinations from the Blacksmith API.
   */
  async componentDidMount() {
    await this.loadDestinations();
  };

  /**
   * Load destinations with a request to the Blacksmith API.
   */
  async loadDestinations() {
    let destinationsOptions = [];
    let destinationsData = [];
    let newError = null;

    try {
      const response = await this.props.axios.get('/destinations');
      destinationsData = response.data.data;

      response.data.data.forEach((destination) => {
        destinationsOptions.push({
          label: destination.name,
        });
      });
    } catch (error) {
      newError = errors['api.fetch'];
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      data: { ...prevState.data,
        error: newError,
        destinations: destinationsData,
      },
      options: { ...prevState.options,
        destinations: destinationsOptions,
      },
    }));
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let destinationsIn = [];
    this.state.filters.destinationsIn.forEach((entry) => {
      destinationsIn.push(entry.label);
    });

    let destinationsNotIn = [];
    this.state.filters.destinationsNotIn.forEach((entry) => {
      destinationsNotIn.push(entry.label);
    });

    const params = {
      'jobs.destinations_in': destinationsIn.length > 0 ? destinationsIn : undefined,
      'jobs.destinations_notin': destinationsNotIn.length > 0 ? destinationsNotIn : undefined,
    };

    const data = {
      destinations: [],
    };

    this.state.data.destinations.forEach((destination) => {
      if (params['jobs.destinations_in']) {
        if (params['jobs.destinations_in'].includes(destination.name)) {
          data.destinations.push(destination);
        }
      }

      if (params['jobs.destinations_notin']) {
        if (params['jobs.destinations_notin'].includes(destination.name)) {
          data.destinations.push(destination);
        }
      }
    });

    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate(this.state.isInvalid, this.state.filters, params, data);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const changeDestinationScope = (key, selectedDestinations) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          [key]: selectedDestinations,
        },
        isInvalid: { ...prevState.isInvalid,
          [key]: selectedDestinations.some((option) => !isNameValid(option.label)),
        },
      }), this.filtersDidUpdate);
    };

    return (
      <React.Fragment>
        <EuiFlexItem grow={true}>
          <span className="euiFormRow__group">
            {labels[this.props.findBy]['jobs.destinations']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.destinations_in']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.destinationsIn}
            error={this.state.data.error ? errors['api.fetch'] : undefined}
          >
            <EuiComboBox sortMatchesBy="startsWith"
              placeholder="Select from suggested destinations"
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.destinationsNotIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.destinationsIn}
              options={this.state.options.destinations}
              selectedOptions={this.state.filters.destinationsIn}
              onChange={(selectedOptions) => changeDestinationScope('destinationsIn', selectedOptions)}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.destinations_notin']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.destinationsNotIn}
            error={this.state.data.error ? errors['api.fetch'] : undefined}
          >
            <EuiComboBox sortMatchesBy="startsWith"
              placeholder="Select from suggested destinations"
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.destinationsIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.destinationsNotIn}
              options={this.state.options.destinations}
              selectedOptions={this.state.filters.destinationsNotIn}
              onChange={(selectedOptions) => changeDestinationScope('destinationsNotIn', selectedOptions)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
