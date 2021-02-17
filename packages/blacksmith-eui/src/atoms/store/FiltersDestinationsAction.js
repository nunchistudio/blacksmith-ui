import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexItem,
  EuiFormRow, EuiComboBox,
  EuiHighlight, EuiTextColor,
} from '@elastic/eui';

import { isNameValid } from './_shared';

/**
 * List of known errors that can be displayed in the component.
 */
const errors = {
  'api.fetch': 'Failed to fetch actions from API',
  'name.not_valid': 'Allowed: alphanumeric characters, underscores, and dashes',
};

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'jobs.actions': <>With job's <strong>action</strong></>,
    'jobs.actions_in': 'is one of:',
    'jobs.actions_notin': 'is not one of:',
  },
  'jobs': {
    'jobs.actions': <>Where destination's <strong>action</strong></>,
    'jobs.actions_in': 'is one of:',
    'jobs.actions_notin': 'is not one of:',
  },
};

/**
 * Atom component to retrieve and display actions of a Blacksmith
 * destination in the store form.
 */
export class FiltersDestinationsAction extends React.Component {
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

    /**
     * Value of the `data` key given by the Blacksmith API when retrieving
     * the destinations.
     */
    destinations: PropTypes.array.isRequired,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    destinations: [],
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: false,
    computed: {
      destinations: {},
    },
    data: {
      error: null,
      actions: [],
    },
    options: {
      actions: [],
    },
    filters: {
      actionsIn: [],
      actionsNotIn: [],
    },
    isInvalid: {
      actionsIn: false,
      actionsNotIn: false,
    },
  };

  /**
   * When mounting the component load destinations from the Blacksmith API.
   */
  async componentDidMount() {
    for (const destination of this.props.destinations) {
      if (!this.state.computed.destinations[destination.name]) {
        this.setState((prevState) => ({ ...prevState,
          isLoading: true,
        }));

        await this.loadActionsFromDestination(destination);
      }
    }
  };

  /**
   * When updating the component load destinations from the Blacksmith API.
   */
  async componentDidUpdate(prevProps, prevState) {
    for (const destination of this.props.destinations) {
      if (!this.state.computed.destinations[destination.name]) {
        if (this.state.isLoading === prevState.isLoading) {
          this.setState((prevState) => ({ ...prevState,
            isLoading: true,
          }));

          await this.loadActionsFromDestination(destination);
        }
      }
    }
  };

  /**
   * Load actions of a destination with a request to the Blacksmith API.
   */
  async loadActionsFromDestination(destination) {
    let data = {};
    let actionList = [];
    let newError = null;

    try {
      const response = await this.props.axios.get(`/destinations/${destination.name}`);
      data = response.data.data;

      if (data.actions) {
        data.actions.forEach((action) => {
          actionList.push({
            label: action.name,
            value: {
              destinations: [destination.name],
            },
          });
        });
      }
    } catch (error) {
      newError = errors['api.fetch'];
    }

    let allActions = this.state.options.actions;
    actionList.forEach((actionInList) => {
      let alreadydExists = false;

      allActions.forEach((actionRegistered) => {
        if (actionInList.label === actionRegistered.label) {
          alreadydExists = true;
          actionRegistered.value.destinations.push(actionInList.value.destinations[0]);
        }
      });

      if (alreadydExists === false) {
        allActions.push(actionInList);
      }
    });

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      computed: { ...prevState.computed,
        destinations: { ...prevState.computed.destinations,
          [destination.name]: true,
        },
      },
      data: { ...prevState.options,
        error: newError,
        actions: allActions,
      },
    }));
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let actionsIn = [];
    this.state.filters.actionsIn.forEach((entry) => {
      actionsIn.push(entry.label);
    });

    let actionsNotIn = [];
    this.state.filters.actionsNotIn.forEach((entry) => {
      actionsNotIn.push(entry.label);
    });

    const params = {
      'jobs.actions_in': actionsIn.length > 0 ? actionsIn : undefined,
      'jobs.actions_notin': actionsNotIn.length > 0 ? actionsNotIn : undefined,
    };

    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate(this.state.isInvalid, this.state.filters, params);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const renderActions = (option, searchValue, contentClassName) => {
      let foundIn = option.value.destinations.filter((label) => {
        return this.props.destinations.some((destination) => {
          return destination.name === label;
        });
      });

      if (foundIn.length === 0) {
        option.disabled = true;
      }

      return (
        <span className={contentClassName}>
          <EuiHighlight search={searchValue}>{option.label}</EuiHighlight><br />
          <EuiTextColor color="subdued">
            <small><strong>Found in:</strong> {option.value.destinations.join(', ')}</small>
          </EuiTextColor>
        </span>
      );
    };

    const addActionScope = (key, action) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          [key]: [...prevState.filters[key], {
            label: action,
          }],
        },
        isInvalid: { ...prevState.isInvalid,
          [key]: !isNameValid(action) || prevState.isInvalid.actionsIn,
        },
      }), this.filtersDidUpdate);
    };

    const changeActionScope = (key, selectedOptions) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          [key]: selectedOptions,
        },
        isInvalid: { ...prevState.isInvalid,
          [key]: selectedOptions.some((option) => !isNameValid(option.label)),
        },
      }), this.filtersDidUpdate);
    };

    return (
      <React.Fragment>
        <EuiFlexItem grow={true}>
          <span className="euiFormRow__group">
            {labels[this.props.findBy]['jobs.actions']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.actions_in']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.actionsIn}
            error={[
              this.state.isInvalid.actionsIn ? errors['name.not_valid'] : undefined,
              this.state.data.error
            ]}
          >
            <EuiComboBox delimiter="," rowHeight={50} sortMatchesBy="startsWith"
              placeholder={this.props.destinations.length === 0
                ? 'Comma separated list of actions'
                : 'Select from suggested actions'}
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.actionsNotIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.actionsIn}
              options={this.state.options.actions}
              renderOption={renderActions}
              selectedOptions={this.state.filters.actionsIn}
              noSuggestions={this.props.destinations.length === 0}
              onChange={(selectedOptions) => changeActionScope('actionsIn', selectedOptions)}
              onCreateOption={this.props.destinations.length === 0
                ? (selectedOptions) => addActionScope('actionsIn', selectedOptions)
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['jobs.actions_notin']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.actionsNotIn}
            error={[
              this.state.isInvalid.actionsNotIn ? errors['name.not_valid'] : undefined,
              this.state.data.error
            ]}
          >
            <EuiComboBox delimiter="," rowHeight={50} sortMatchesBy="startsWith"
              placeholder={this.props.destinations.length === 0
                ? 'Comma separated list of actions'
                : 'Select from suggested actions'}
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.actionsIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.actionsNotIn}
              options={this.state.options.actions}
              renderOption={renderActions}
              selectedOptions={this.state.filters.actionsNotIn}
              noSuggestions={this.props.destinations.length === 0}
              onChange={(selectedOptions) => changeActionScope('actionsNotIn', selectedOptions)}
              onCreateOption={this.props.destinations.length === 0
                ? (selectedOptions) => addActionScope('actionsNotIn', selectedOptions)
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
