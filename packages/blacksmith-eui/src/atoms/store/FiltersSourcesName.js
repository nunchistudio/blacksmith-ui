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
  'api.fetch': 'Failed to fetch sources from API',
};

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'events.sources': <>Where <strong>source</strong></>,
    'events.sources_in': 'is one of:',
    'events.sources_notin': 'is not one of:',
  },
  'jobs': {
    'events.sources': <>From <strong>source</strong></>,
    'events.sources_in': 'is one of:',
    'events.sources_notin': 'is not one of:',
  },
};

/**
 * Atom component to retrieve and display sources of a Blacksmith
 * application in the store form.
 */
export class FiltersSourcesName extends React.Component {
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
      sources: [],
    },
    data: {
      error: null,
      sources: [],
    },
    filters: {
      sourcesIn: [],
      sourcesNotIn: [],
    },
    isInvalid: {
      sourcesIn: false,
      sourcesNotIn: false,
    },
  };

  /**
   * When mounting the component load sources from the Blacksmith API.
   */
  async componentDidMount() {
    await this.loadSources();
  };

  /**
   * Load sources with a request to the Blacksmith API.
   */
  async loadSources() {
    let sourcesOptions = [];
    let sourcesData = [];
    let newError = null;

    try {
      const response = await this.props.axios.get('/sources');
      sourcesData = response.data.data;

      response.data.data.forEach((source) => {
        sourcesOptions.push({
          label: source.name,
        });
      });
    } catch (error) {
      newError = errors['api.fetch'];
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      data: { ...prevState.data,
        error: newError,
        sources: sourcesData,
      },
      options: { ...prevState.options,
        sources: sourcesOptions,
      },
    }));
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let sourcesIn = [];
    this.state.filters.sourcesIn.forEach((entry) => {
      sourcesIn.push(entry.label);
    });

    let sourcesNotIn = [];
    this.state.filters.sourcesNotIn.forEach((entry) => {
      sourcesNotIn.push(entry.label);
    });

    const params = {
      'events.sources_in': sourcesIn.length > 0 ? sourcesIn : undefined,
      'events.sources_notin': sourcesNotIn.length > 0 ? sourcesNotIn : undefined,
    };

    const data = {
      sources: [],
    };

    this.state.data.sources.forEach((source) => {
      if (params['events.sources_in']) {
        if (params['events.sources_in'].includes(source.name)) {
          data.sources.push(source);
        }
      }

      if (params['events.sources_notin']) {
        if (params['events.sources_notin'].includes(source.name)) {
          data.sources.push(source);
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
    const changeSourceScope = (key, selectedSources) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          [key]: selectedSources,
        },
        isInvalid: { ...prevState.isInvalid,
          [key]: selectedSources.some((option) => !isNameValid(option.label)),
        },
      }), this.filtersDidUpdate);
    };

    return (
      <React.Fragment>
        <EuiFlexItem grow={true}>
          <span className="euiFormRow__group">
            {labels[this.props.findBy]['events.sources']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.sources_in']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.sourcesIn}
            error={this.state.data.error ? errors['api.fetch'] : undefined}
          >
            <EuiComboBox sortMatchesBy="startsWith"
              placeholder="Select from suggested sources"
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.sourcesNotIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.sourcesIn}
              options={this.state.options.sources}
              selectedOptions={this.state.filters.sourcesIn}
              onChange={(selectedOptions) => changeSourceScope('sourcesIn', selectedOptions)}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.sources_notin']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.sourcesNotIn}
            error={this.state.data.error ? errors['api.fetch'] : undefined}
          >
            <EuiComboBox sortMatchesBy="startsWith"
              placeholder="Select from suggested sources"
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.sourcesIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.sourcesNotIn}
              options={this.state.options.sources}
              selectedOptions={this.state.filters.sourcesNotIn}
              onChange={(selectedOptions) => changeSourceScope('sourcesNotIn', selectedOptions)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
