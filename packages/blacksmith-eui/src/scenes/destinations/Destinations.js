import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';

import {
  CardDestination,
} from '../../cards/destinations';

import { Loading } from '../Loading';

/**
 * Scene component to display all destinations' cards in a single page.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Destinations } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Destinations extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The axios instance to use for communicating with the Blacksmith API.
     */
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    /**
     * Do you want to hide the cards' badges?
     */
    hideBadges: PropTypes.bool,

    /**
     * Do you want to hide the cards' names?
     */
    hideNames: PropTypes.bool,

    /**
     * Front-end route to access a destination.
     *
     * **Route params:**
     *
     *   - `:destination_name`: Name of the destination.
     */
    linkToDestination: PropTypes.string,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadges: false,
    hideNames: false,
    linkToDestination: '/admin/destinations/destination.html?destination_name=:destination_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      destinations: [],
    },
  };

  /**
   * When mounting the component, do a request to the Blacksmith API.
   */
  async componentDidMount() {
    await this.request();
  };

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let newStatusCode = 500;
    let destinationsData = {};

    let response = {};
    try {
      response = await this.props.axios.get('/destinations');
      newStatusCode = response.data.statusCode;
      destinationsData = response.data.data;
    } catch (error) {
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        destinations: destinationsData,
      },
    }));
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.statusCode !== 200) {
      return (
        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={false} style={{ margin: '0 auto' }}>
            <Loading
              isLoading={this.state.isLoading}
              statusCode={this.state.statusCode}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    }

    return (
      <React.Fragment>
        {this.state.data.destinations && this.state.data.destinations.map((destination, i) => {
          return (
            <React.Fragment key={destination.name}>
              <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
                <EuiFlexItem grow={true}>
                  <CardDestination {...this.props}
                    destination={destination}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>

              <EuiSpacer size="xl" />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };
};
