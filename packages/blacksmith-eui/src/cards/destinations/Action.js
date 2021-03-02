import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiCard, EuiIcon, EuiButton,
  EuiBasicTable, EuiCode,
  EuiSpacer,
} from '@elastic/eui';

import { columns } from '../_shared';
import { Loading } from '../../scenes';

/**
 * Card component for a Blacksmith action. It is used by the scene `Action`.
 *
 * This card can handle the request to the Blacksmith API. It is up to the user
 * to either pass the `axios` instance to use with the destination and action names
 * to retrieve, or pass the action object already known.
 *
 * **Import:**
 *
 * ```js
 * import { CardAction } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardAction extends React.Component {
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
     * The destination name of the action to retrieve with the Blacksmith API.
     */
    destination_name: PropTypes.string,

    /**
     * The action name to retrieve with the Blacksmith API.
     */
    action_name: PropTypes.string,

    /**
     * The action object returned by the Blacksmith API. If none is provided,
     * the card will do a request to the API using the `axios` instance and the
     * provided destination and action names.
     */
    action: PropTypes.object,

    /**
     * Do you want to hide the card's badge?
     */
    hideBadge: PropTypes.bool,

    /**
     * Do you want to hide the card's name?
     */
    hideName: PropTypes.bool,

    /**
     * Do you want to hide the link to the action?
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
     * Front-end route to access a action.
     *
     * **Route params:**
     *
     *   - `:destination_name`: Name of the destination.
     *   - `:action_name`: Name of the action.
     */
    linkToAction: PropTypes.string,

    /**
     * Callback function when the action is loaded.
     *
     * @param statusCode - The HTTP status code returned by the Blacksmith API.
     * @param action - The action object returned by the Blacksmith API.
     */
    onActionLoaded: PropTypes.func,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadge: false,
    hideName: false,
    hideLink: false,
    linkToDestination: '/admin/destinations/destination.html?destination_name=:destination_name',
    linkToAction: '/admin/destinations/action.html?destination_name=:destination_name&action_name=:action_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      action: null,
    },
  };

  /**
   * When mounting the component, do a request to the Blacksmith API if needed.
   * Otherwise update the state with some of the properties.
   */
  async componentDidMount() {
    if (!this.props.action) {
      await this.request();
    } else {
      this.setState((prevState) => ({ ...prevState,
        isLoading: false,
        statusCode: 200,
        data: { ...prevState.data,
          action: this.props.action,
        }
      }), this.cardDidUpdate)
    }
  }

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let newStatusCode = 500;
    let actionData = {};

    let response = {};
    try {
      response = await this.props.axios.get(`/destinations/${this.props.destination_name}/actions/${this.props.action_name}`);
      actionData = response.data.data;
      newStatusCode = response.data.statusCode;
    } catch (error) {
      actionData = null;
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        action: actionData,
      },
    }), this.cardDidUpdate);
  };

  /**
   * Callback function used when the action is loaded.
   */
  cardDidUpdate() {
    if (this.props.onActionLoaded) {
      this.props.onActionLoaded(this.state.statusCode, this.state.data.action);
    }
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.data.action == null || this.state.data.action.name == '') {
      return (
        <EuiCard layout="horizontal" titleSize="xs"
          title=""
          description=""
          betaBadgeLabel={this.props.hideBadge == false ? 'Action' : null}
        >
          <Loading resourceKind="action"
            statusCode={this.state.statusCode}
            isLoading={this.state.isLoading}
          />
        </EuiCard>
      );
    }

    const action = this.state.data.action;
    let linkToDestination, linkToAction;
    if (action !== null) {
      linkToDestination = this.props.linkToDestination.replace(':destination_name', this.props.destination_name);
      linkToAction = this.props.linkToAction.replace(':destination_name', this.props.destination_name);
      linkToAction = linkToAction.replace(':action_name', action.name);
    }

    if (action.schedule == null) {
      action.schedule = {};
    }

    const items = [
      {
        id: 'destination',
        key: 'Destination',
        value: this.props.destination_name,
        isValueCode: true,
        withValueLink: linkToDestination,
      }, {
        id: 'settings__',
        key: 'Settings',
        value: null,
      }, {
        id: 'settings__realtime',
        key: 'Settings / Real-time load',
        value: typeof action.schedule.realtime === 'boolean'
          ? action.schedule.realtime
          : 'Inherited from destination',
      }, {
        id: 'defaults__schedule_interval',
        key: 'Defaults / Retries interval',
        value: action.schedule.interval || 'Inherited from destination',
        isValueCode: action.schedule.interval ? true : false,
      }, {
        id: 'defaults__max_retries',
        key: 'Defaults / Maximum retries',
        value: action.schedule.max_retries || 'Inherited from destination',
        isValueCode: action.schedule.max_retries ? true : false,
      },
    ];

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? <EuiCode>{action.name}</EuiCode> : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Action' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="logstashIf" color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />

        {this.props.hideLink === false &&
          <React.Fragment>
            <EuiSpacer size="xl" />
            <EuiButton href={linkToAction}>View action</EuiButton>
          </React.Fragment>
        }

        <EuiSpacer size="m" />
      </EuiCard>
    );
  };
};
