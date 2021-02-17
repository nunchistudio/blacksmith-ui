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
  'api.fetch': 'Failed to fetch triggers from API',
  'name.not_valid': 'Allowed: alphanumeric characters, underscores, and dashes',
};

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'events.triggers': <>Where source's <strong>trigger</strong></>,
    'events.triggers_in': 'is one of:',
    'events.triggers_notin': 'is not one of:',
  },
  'jobs': {
    'events.triggers': <>From source's <strong>trigger</strong></>,
    'events.triggers_in': 'is one of:',
    'events.triggers_notin': 'is not one of:',
  },
};

/**
 * Atom component to retrieve and display triggers of a Blacksmith
 * source in the store form.
 */
export class FiltersSourcesTrigger extends React.Component {
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
     * the sources.
     */
    sources: PropTypes.array.isRequired,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    sources: [],
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: false,
    computed: {
      sources: {},
    },
    data: {
      error: null,
      triggers: [],
    },
    options: {
      triggers: [],
    },
    filters: {
      triggersIn: [],
      triggersNotIn: [],
    },
    isInvalid: {
      triggersIn: false,
      triggersNotIn: false,
    },
  };

  /**
   * When mounting the component load sources from the Blacksmith API.
   */
  async componentDidMount() {
    for (const source of this.props.sources) {
      if (!this.state.computed.sources[source.name]) {
        this.setState((prevState) => ({ ...prevState,
          isLoading: true,
        }));

        await this.loadTriggersFromSource(source);
      }
    }
  };

  /**
   * When updating the component load sources from the Blacksmith API.
   */
  async componentDidUpdate(prevProps, prevState) {
    for (const source of this.props.sources) {
      if (!this.state.computed.sources[source.name]) {
        if (this.state.isLoading === prevState.isLoading) {
          this.setState((prevState) => ({ ...prevState,
            isLoading: true,
          }));

          await this.loadTriggersFromSource(source);
        }
      }
    }
  };

  /**
   * Load triggers of a source with a request to the Blacksmith API.
   */
  async loadTriggersFromSource(source) {
    let data = {};
    let triggerList = [];
    let newError = null;

    try {
      const response = await this.props.axios.get(`/sources/${source.name}`);
      data = response.data.data;

      if (data.triggers) {
        data.triggers.forEach((trigger) => {
          triggerList.push({
            label: trigger.name,
            value: {
              sources: [source.name],
            },
          });
        });
      }
    } catch (error) {
      newError = errors['api.fetch'];
    }

    let allTriggers = this.state.options.triggers;
    triggerList.forEach((triggerInList) => {
      let alreadydExists = false;

      allTriggers.forEach((triggerRegistered) => {
        if (triggerInList.label === triggerRegistered.label) {
          alreadydExists = true;
          triggerRegistered.value.sources.push(triggerInList.value.sources[0]);
        }
      });

      if (alreadydExists === false) {
        allTriggers.push(triggerInList);
      }
    });

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      computed: { ...prevState.computed,
        sources: { ...prevState.computed.sources,
          [source.name]: true,
        },
      },
      data: { ...prevState.options,
        error: newError,
        triggers: allTriggers,
      },
    }));
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let triggersIn = [];
    this.state.filters.triggersIn.forEach((entry) => {
      triggersIn.push(entry.label);
    });

    let triggersNotIn = [];
    this.state.filters.triggersNotIn.forEach((entry) => {
      triggersNotIn.push(entry.label);
    });

    const params = {
      'events.triggers_in': triggersIn.length > 0 ? triggersIn : undefined,
      'events.triggers_notin': triggersNotIn.length > 0 ? triggersNotIn : undefined,
    };

    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate(this.state.isInvalid, this.state.filters, params);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const renderTriggers = (option, searchValue, contentClassName) => {
      let foundIn = option.value.sources.filter((label) => {
        return this.props.sources.some((source) => {
          return source.name === label;
        });
      });

      if (foundIn.length === 0) {
        option.disabled = true;
      }

      return (
        <span className={contentClassName}>
          <EuiHighlight search={searchValue}>{option.label}</EuiHighlight><br />
          <EuiTextColor color="subdued">
            <small><strong>Found in:</strong> {option.value.sources.join(', ')}</small>
          </EuiTextColor>
        </span>
      );
    };

    const addTriggerScope = (key, trigger) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          [key]: [...prevState.filters[key], {
            label: trigger,
          }],
        },
        isInvalid: { ...prevState.isInvalid,
          [key]: !isNameValid(trigger) || prevState.isInvalid.triggersIn,
        },
      }), this.filtersDidUpdate);
    };

    const changeTriggerScope = (key, selectedOptions) => {
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
            {labels[this.props.findBy]['events.triggers']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.triggers_in']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.triggersIn}
            error={[
              this.state.isInvalid.triggersIn ? errors['name.not_valid'] : undefined,
              this.state.data.error
            ]}
          >
            <EuiComboBox delimiter="," rowHeight={50} sortMatchesBy="startsWith"
              placeholder={this.props.sources.length === 0
                ? 'Comma separated list of triggers'
                : 'Select from suggested triggers'}
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.triggersNotIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.triggersIn}
              options={this.state.options.triggers}
              renderOption={renderTriggers}
              selectedOptions={this.state.filters.triggersIn}
              noSuggestions={this.props.sources.length === 0}
              onChange={(selectedOptions) => changeTriggerScope('triggersIn', selectedOptions)}
              onCreateOption={this.props.sources.length === 0
                ? (selectedOptions) => addTriggerScope('triggersIn', selectedOptions)
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.triggers_notin']}
            isInvalid={this.state.data.error !== null ? true : this.state.isInvalid.triggersNotIn}
            error={[
              this.state.isInvalid.triggersNotIn ? errors['name.not_valid'] : undefined,
              this.state.data.error
            ]}
          >
            <EuiComboBox delimiter="," rowHeight={50} sortMatchesBy="startsWith"
              placeholder={this.props.sources.length === 0
                ? 'Comma separated list of triggers'
                : 'Select from suggested triggers'}
              isLoading={this.state.isLoading}
              isDisabled={this.state.filters.triggersIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.triggersNotIn}
              options={this.state.options.triggers}
              renderOption={renderTriggers}
              selectedOptions={this.state.filters.triggersNotIn}
              noSuggestions={this.props.sources.length === 0}
              onChange={(selectedOptions) => changeTriggerScope('triggersNotIn', selectedOptions)}
              onCreateOption={this.props.sources.length === 0
                ? (selectedOptions) => addTriggerScope('triggersNotIn', selectedOptions)
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
