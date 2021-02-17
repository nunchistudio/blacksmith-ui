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
  'name.not_valid': 'Allowed: alphanumeric characters, underscores, and dashes',
};

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'events.versions': <>Where source's <strong>version</strong></>,
    'events.versions_in': 'is one of:',
    'events.versions_notin': 'is not one of:',
  },
  'jobs': {
    'events.versions': <>From source's <strong>version</strong></>,
    'events.versions_in': 'is one of:',
    'events.versions_notin': 'is not one of:',
  },
};

/**
 * Atom component to display sources' versions of a Blacksmith
 * application in the store form.
 */
export class FiltersSourcesVersion extends React.Component {
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
    computed: {
      sources: {},
    },
    options: {
      versions: [],
    },
    filters: {
      versionsIn: [],
      versionsNotIn: [],
    },
    isInvalid: {
      versionsIn: false,
      versionsNotIn: false,
    },
  };

  /**
   * When mounting the component load versions from the sources passed
   * as properties.
   */
  async componentDidMount() {
    for (const source of this.props.sources) {
      if (!this.state.computed.sources[source.name]) {
        if (source.options.versions) {
          if (Object.keys(source.options.versions).length > 0) {
            await this.loadVersionsFromSource(source);
          }
        }
      }
    }
  };

  /**
   * When updating the component load versions from the sources passed
   * as properties.
   */
  async componentDidUpdate(prevProps, prevState) {
    for (const source of this.props.sources) {
      if (!this.state.computed.sources[source.name]) {
        if (source.options.versions) {
          if (Object.keys(source.options.versions).length > 0) {
            await this.loadVersionsFromSource(source);
          }
        }
      }
    }
  };

  /**
   * Load versions of a source.
   */
  async loadVersionsFromSource(source) {
    let versionList = [];
    Object.keys(source.options.versions).forEach((version) => {
      versionList.push({
        label: version,
        value: {
          sources: [source.name],
        },
      });
    });

    let allVersions = this.state.options.versions;
    versionList.forEach((versionInList) => {
      let alreadydExists = false;

      allVersions.forEach((versionRegistered) => {
        if (versionInList.label === versionRegistered.label) {
          alreadydExists = true;
          versionRegistered.value.sources.push(versionInList.value.sources[0]);
        }
      });

      if (alreadydExists === false) {
        allVersions.push(versionInList);
      }
    });

    this.setState((prevState) => ({ ...prevState,
      computed: { ...prevState.computed,
        sources: { ...prevState.computed.sources,
          [source.name]: true,
        },
      },
      data: { ...prevState.options,
        versions: allVersions,
      },
    }));
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    let versionsIn = [];
    this.state.filters.versionsIn.forEach((entry) => {
      versionsIn.push(entry.label);
    });

    let versionsNotIn = [];
    this.state.filters.versionsNotIn.forEach((entry) => {
      versionsNotIn.push(entry.label);
    });

    const params = {
      'events.versions_in': versionsIn.length > 0 ? versionsIn : undefined,
      'events.versions_notin': versionsNotIn.length > 0 ? versionsNotIn : undefined,
    };

    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate(this.state.isInvalid, this.state.filters, params);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const renderVersions = (option, searchValue, contentClassName) => {
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

    const addVersionScope = (key, version) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          [key]: [...prevState.filters[key], {
            label: version,
          }],
        },
        isInvalid: { ...prevState.isInvalid,
          [key]: !isNameValid(version) || prevState.isInvalid.versionsIn,
        },
      }), this.filtersDidUpdate);
    };

    const changeVersionScope = (key, selectedOptions) => {
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
            {labels[this.props.findBy]['events.versions']}
          </span>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.versions_in']}
            isInvalid={this.state.isInvalid.versionsIn}
            error={this.state.isInvalid.versionsIn ? errors['name.not_valid'] : undefined}
          >
            <EuiComboBox delimiter="," rowHeight={50} sortMatchesBy="startsWith"
              placeholder={this.props.sources.length === 0
                ? 'Comma separated list of versions'
                : 'Select from suggested versions'}
              isDisabled={this.state.filters.versionsNotIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.versionsIn}
              options={this.state.options.versions}
              renderOption={renderVersions}
              selectedOptions={this.state.filters.versionsIn}
              noSuggestions={this.props.sources.length === 0}
              onChange={(selectedOptions) => changeVersionScope('versionsIn', selectedOptions)}
              onCreateOption={this.props.sources.length === 0
                ? (selectedOptions) => addVersionScope('versionsIn', selectedOptions)
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFormRow label={labels[this.props.findBy]['events.versions_notin']}
            isInvalid={this.state.isInvalid.versionsNotIn}
            error={this.state.isInvalid.versionsNotIn ? errors['name.not_valid'] : undefined}
          >
            <EuiComboBox delimiter="," rowHeight={50} sortMatchesBy="startsWith"
              placeholder={this.props.sources.length === 0
                ? 'Comma separated list of versions'
                : 'Select from suggested versions'}
              isDisabled={this.state.filters.versionsIn.length > 0 ? true : false}
              isInvalid={this.state.isInvalid.versionsNotIn}
              options={this.state.options.versions}
              renderOption={renderVersions}
              selectedOptions={this.state.filters.versionsNotIn}
              noSuggestions={this.props.sources.length === 0}
              onChange={(selectedOptions) => changeVersionScope('versionsNotIn', selectedOptions)}
              onCreateOption={this.props.sources.length === 0
                ? (selectedOptions) => addVersionScope('versionsNotIn', selectedOptions)
                : undefined}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </React.Fragment>
    );
  };
};
