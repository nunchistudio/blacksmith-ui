import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {
  EuiCard, EuiIcon, EuiButton,
  EuiBasicTable, EuiCode,
  EuiSpacer,
} from '@elastic/eui';

import { columns } from '../_shared';
import { Loading } from '../../scenes';

/**
 * Card component for a Blacksmith destination. It is used by the scene
 * `Destination`.
 *
 * This card can handle the request to the Blacksmith API. It is up to the user
 * to either pass the `axios` instance to use with the destination name to
 * retrieve, or pass the destination object already known.
 *
 * **Import:**
 *
 * ```js
 * import { CardDestination } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardDestination extends React.Component {
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
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /**
     * The destination name to retrieve with the Blacksmith API.
     */
    destination_name: PropTypes.string,

    /**
     * The destination object returned by the Blacksmith API. If none is
     * provided, the card will do a request to the API using the `axios` instance
     * and the provided destination name.
     */
    destination: PropTypes.object,

    /**
     * Do you want to hide the card's badge?
     */
    hideBadge: PropTypes.bool,

    /**
     * Do you want to hide the card's name?
     */
    hideName: PropTypes.bool,

    /**
     * Do you want to hide the link to the event?
     */
    hideLink: PropTypes.bool,

    /**
     * Front-end route to access a destination.
     *
     * **Route params:**
     *
     *   - `:destination_name`: Name of the destination.
     */
    linkToDestination: PropTypes.string,

    /**
     * Callback function when the destination is loaded.
     *
     * @param statusCode - The HTTP status code returned by the Blacksmith API.
     * @param destination - The destination object returned by the Blacksmith API.
     */
    onDestinationLoaded: PropTypes.func,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadge: false,
    hideName: false,
    hideLink: false,
    linkToDestination: '/admin/destination.html?name=:destination_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      destination: null,
    },
  };

  /**
   * When mounting the component, do a request to the Blacksmith API if needed.
   * Otherwise update the state with some of the properties.
   */
  async componentDidMount() {
    if (!this.props.destination) {
      await this.request();
    } else {
      this.setState((prevState) => ({ ...prevState,
        isLoading: false,
        statusCode: 200,
        data: { ...prevState.data,
          destination: this.props.destination,
        }
      }), this.cardDidUpdate)
    }
  }

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let newStatusCode = 500;
    let destinationData = {};

    let response = {};
    try {
      response = await this.props.axios.get(`/destinations/${this.props.destination_name}`);
      destinationData = response.data.data;
      newStatusCode = response.data.statusCode;
    } catch (error) {
      destinationData = null;
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        destination: destinationData,
      },
    }), this.cardDidUpdate);
  };

  /**
   * Callback function used when the destination us loaded.
   */
  cardDidUpdate() {
    if (this.props.onDestinationLoaded) {
      this.props.onDestinationLoaded(this.state.statusCode, this.state.data.destination);
    }
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.data.destination == null || this.state.data.destination.name == '') {
      return (
        <EuiCard layout="horizontal" titleSize="xs"
          title=""
          description=""
          betaBadgeLabel={this.props.hideBadge == false ? 'Destination' : null}
        >
          <Loading resourceKind="destination"
            statusCode={this.state.statusCode}
            isLoading={this.state.isLoading}
          />
        </EuiCard>
      );
    }

    const destination = this.state.data.destination;
    let linkToDestination;
    if (destination !== null) {
      linkToDestination = this.props.linkToDestination.replace(':destination_name', destination.name);
    }

    const items = [
      {
        id: 'defaults__',
        key: 'Defaults',
        value: null
      }, {
        id: 'defaults__realtime',
        key: 'Defaults / Real-time load',
        value: destination.options.schedule.realtime,
      }, {
        id: 'defaults__schedule_interval',
        key: 'Defaults / Retries interval',
        value: destination.options.schedule.interval,
        isValueCode: true,
      }, {
        id: 'defaults__max_retries',
        key: 'Defaults / Maximum retries',
        value: destination.options.schedule.max_retries,
        isValueCode: true,
      },
    ];

    if (destination.options.versions) {
      if (destination.options.default_version) {
        items.push({
          id: 'defaults__version',
          key: 'Defaults / Version',
          value: destination.options.default_version,
          isValueCode: true,
        });
      }

      items.push({
        id: 'versions__',
        key: 'Versions',
        value: null,
      });

      Object.keys(destination.options.versions).map((k, i) => {
        items.push({
          id: `versions__${k}`,
          key: `Versions / ${k}`,
          value: moment.parseZone(destination.options.versions[k]).utc().format('DD MMMM YYYY HH:mm:ss'),
          isKeyCode: true,
          isValueCode: true,
        });
      });
    }

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? <EuiCode>{destination.name}</EuiCode> : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Destination' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="exportAction" color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />

        {this.props.hideLink === false &&
          <React.Fragment>
            <EuiSpacer size="xl" />
            <EuiButton href={linkToDestination}>View destination</EuiButton>
          </React.Fragment>
        }

        <EuiSpacer size="m" />
      </EuiCard>
    );
  };
};
