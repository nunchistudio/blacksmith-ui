import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexItem,
  EuiFilterGroup, EuiFilterButton,
} from '@elastic/eui';

/**
 * Atom component to switch view mode of the sotre form when retrieving
 * information from the Blacksmith store.
 */
export class FiltersViewBy extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

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
      findBy: 'events',
    },
  };

  /**
   * Callback function used when the state has changed. It formats new
   * data and call the function "onFiltersUpdate" passed in the props
   * if applicable.
   */
  filtersDidUpdate() {
    if (this.props.onFiltersUpdate) {
      this.props.onFiltersUpdate({}, this.state.filters, {});
    }
  };

  /**
   * Render the component.
   */
  render() {
    const toggleFindBy = (view) => {
      this.setState((prevState) => ({ ...prevState,
        filters: { ...prevState.filters,
          findBy: view,
        },
      }), this.filtersDidUpdate);
    };

    return (
      <EuiFlexItem grow={true}>
        <EuiFilterGroup>
          <EuiFilterButton hasActiveFilters={this.state.filters.findBy === 'events'} onClick={() => toggleFindBy('events')}>
            Events
          </EuiFilterButton>
          <EuiFilterButton hasActiveFilters={this.state.filters.findBy === 'jobs'} onClick={() => toggleFindBy('jobs')}>
            Jobs
          </EuiFilterButton>
        </EuiFilterGroup>
      </EuiFlexItem>
    );
  };
};
