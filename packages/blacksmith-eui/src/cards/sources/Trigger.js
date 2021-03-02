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
 * Card component for a Blacksmith trigger. It is used by the scene `Trigger`.
 *
 * This card can handle the request to the Blacksmith API. It is up to the user
 * to either pass the `axios` instance to use with the source and trigger names
 * to retrieve, or pass the trigger object already known.
 *
 * **Import:**
 *
 * ```js
 * import { CardTrigger } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardTrigger extends React.Component {
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
     * The source name of the trigger to retrieve with the Blacksmith API.
     */
    source_name: PropTypes.string,

    /**
     * The trigger name to retrieve with the Blacksmith API.
     */
    trigger_name: PropTypes.string,

    /**
     * The trigger object returned by the Blacksmith API. If none is provided,
     * the card will do a request to the API using the `axios` instance and the
     * provided source and trigger names.
     */
    trigger: PropTypes.object,

    /**
     * Do you want to hide the card's badge?
     */
    hideBadge: PropTypes.bool,

    /**
     * Do you want to hide the card's name?
     */
    hideName: PropTypes.bool,

    /**
     * Do you want to hide the link to the trigger?
     */
    hideLink: PropTypes.bool,

    /**
     * Front-end route to access a source.
     *
     * **Route params:**
     *
     *   - `:source_name`: Name of the source.
     */
    linkToSource: PropTypes.string,

    /**
     * Front-end route to access a trigger.
     *
     * **Route params:**
     *
     *   - `:source_name`: Name of the source.
     *   - `:trigger_name`: Name of the trigger.
     */
    linkToTrigger: PropTypes.string,

    /**
     * Callback function when the trigger is loaded.
     *
     * @param statusCode - The HTTP status code returned by the Blacksmith API.
     * @param trigger - The trigger object returned by the Blacksmith API.
     */
    onTriggerLoaded: PropTypes.func,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadge: false,
    hideName: false,
    hideLink: false,
    linkToSource: '/admin/sources/source.html?source_name=:source_name',
    linkToTrigger: '/admin/sources/trigger.html?source_name=:source_name&trigger_name=:trigger_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      trigger: null,
    },
  };

  /**
   * When mounting the component, do a request to the Blacksmith API if needed.
   * Otherwise update the state with some of the properties.
   */
  async componentDidMount() {
    if (!this.props.trigger) {
      await this.request();
    } else {
      this.setState((prevState) => ({ ...prevState,
        isLoading: false,
        statusCode: 200,
        data: { ...prevState.data,
          trigger: this.props.trigger,
        }
      }), this.cardDidUpdate)
    }
  }

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let newStatusCode = 500;
    let triggerData = {};

    let response = {};
    try {
      response = await this.props.axios.get(`/sources/${this.props.source_name}/triggers/${this.props.trigger_name}`);
      triggerData = response.data.data;
      newStatusCode = response.data.statusCode;
    } catch (error) {
      triggerData = null;
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        trigger: triggerData,
      },
    }), this.cardDidUpdate);
  };

  /**
   * Callback function used when the trigger is loaded.
   */
  cardDidUpdate() {
    if (this.props.onTriggerLoaded) {
      this.props.onTriggerLoaded(this.state.statusCode, this.state.data.trigger);
    }
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.data.trigger == null || this.state.data.trigger.name == '') {
      return (
        <EuiCard layout="horizontal" titleSize="xs"
          title=""
          description=""
          betaBadgeLabel={this.props.hideBadge == false ? 'Trigger' : null}
        >
          <Loading resourceKind="trigger"
            statusCode={this.state.statusCode}
            isLoading={this.state.isLoading}
          />
        </EuiCard>
      );
    }

    const trigger = this.state.data.trigger;
    let linkToSource, linkToTrigger;
    if (trigger !== null) {
      linkToSource = this.props.linkToSource.replace(':source_name', this.props.source_name);
      linkToTrigger = this.props.linkToTrigger.replace(':source_name', this.props.source_name);
      linkToTrigger = linkToTrigger.replace(':trigger_name', trigger.name);
    }

    let mode;
    switch (trigger.mode.mode) {
      case 'http':
        mode = 'HTTP';
        break;
      case 'cron':
        mode = 'CRON';
        break;
      case 'cdc':
        mode = 'CDC';
        break;
      case 'subscription':
        mode = 'Subscription';
        break;
    };

    const items = [
      {
        id: 'source',
        key: 'Source',
        value: this.props.source_name,
        isValueCode: true,
        withValueLink: linkToSource,
      },
      {
        id: 'mode',
        key: 'Mode',
        value: mode,
      },
    ];

    switch (trigger.mode.mode) {
      case 'http':
        items.push({
          id: 'settings__',
          key: 'Settings',
          value: null,
        }, {
          id: 'settings__http_methods',
          key: 'Settings / Methods',
          value: trigger.mode.http.methods,
          isValueCode: true,
        }, {
          id: 'settings__http_path',
          key: 'Settings / Path',
          value: trigger.mode.http.path,
          isValueCode: true,
        }, {
          id: 'settings__show_meta',
          key: 'Settings / Show Meta',
          value: trigger.mode.http.show_meta,
        }, {
          id: 'settings__show_data',
          key: 'Settings / Show Data',
          value: trigger.mode.http.show_data,
        });
        break;

      case 'cron':
        items.push({
          id: 'settings__',
          key: 'Settings',
          value: null,
        }, {
          id: 'settings__interval',
          key: 'Settings / Interval',
          value: trigger.mode.cron ? trigger.mode.cron.interval : 'Inherited from source',
          isValueCode: trigger.mode.cron ? true : false,
        });
        break;

      case 'subscription':
        items.push({
          id: 'settings__',
          key: 'Settings',
          value: null,
        }, {
          id: 'settings__topic',
          key: 'Settings / Topic',
          value: trigger.mode.subscription.topic,
          isValueCode: true,
        }, {
          id: 'settings__subscription',
          key: 'Settings / Subscription',
          value: trigger.mode.subscription.subscription,
          isValueCode: true,
        });
        break;
    };

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? <EuiCode>{trigger.name}</EuiCode> : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Trigger' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="bolt" color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />

        {this.props.hideLink === false &&
          <React.Fragment>
            <EuiSpacer size="xl" />
            <EuiButton href={linkToTrigger}>View trigger</EuiButton>
          </React.Fragment>
        }

        <EuiSpacer size="m" />
      </EuiCard>
    );
  };
};
