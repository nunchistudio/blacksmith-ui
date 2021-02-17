import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiCode, EuiLink, EuiText, EuiButton,
  EuiIcon, EuiCard,
  EuiSpacer,
} from '@elastic/eui';

import { formatDate } from '@elastic/eui/lib/services/format';
import { Loading } from '../../scenes';

/**
 * Card component for displaying basic info about a Blacksmith event.
 * It is used by the scene `Event`.
 *
 * This card requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { CardEvent } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardEvent extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The event ID to retrieve.
     */
    event_id: PropTypes.string.isRequired,

    /**
     * The axios instance to use for communicating with the Blacksmith API.
     */
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

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
     * Front-end route to access the event ID.
     *
     * **Route params:**
     *
     *   - `:event_id`: Unique ID of the event.
     */
    linkToEvent: PropTypes.string,

    /**
     * Front-end route to access a source.
     *
     * **Route params:**
     *
     *   - `:source_name`: Name of the source.
     */
    linkToSource: PropTypes.string,

    /**
     * Callback function when the event is loaded.
     *
     * @param statusCode - The HTTP status code returned by the Blacksmith API.
     * @param event - The event object returned by the Blacksmith API.
     */
    onEventLoaded: PropTypes.func,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadge: false,
    hideName: false,
    hideLink: false,
    linkToEvent: '/admin/store/event.html?id=:event_id',
    linkToSource: '/admin/source.html?name=:source_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      event: null,
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
    let eventData = {};

    let response = {};
    try {
      response = await this.props.axios.get(`/store/events/${this.props.event_id}`);
      eventData = response.data.data;
      newStatusCode = response.data.statusCode;
    } catch (error) {
      eventData = null;
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        event: eventData,
      },
    }), this.cardDidUpdate);
  };

  /**
   * Callback function used when the event us loaded.
   */
  cardDidUpdate() {
    if (this.props.onEventLoaded) {
      this.props.onEventLoaded(this.state.statusCode, this.state.data.event);
    }
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.data.event == null || this.state.data.event.id == '') {
      return (
        <EuiCard layout="horizontal" titleSize="xs"
          title=""
          description=""
          betaBadgeLabel={this.props.hideBadge == false ? 'Event' : null}
        >
          <Loading resourceKind="event"
            statusCode={this.state.statusCode}
            isLoading={this.state.isLoading}
          />
        </EuiCard>
      );
    }

    let event = this.state.data.event;
    let linkToEvent, linkToSource;
    if (event !== null) {
      linkToEvent = this.props.linkToEvent.replace(':event_id', event.id);
      linkToSource = this.props.linkToSource.replace(':source_name', event.source);
    } else {
      event = {
        context: null,
        data: null,
        jobs: [],
      };
    }

    return (
      <EuiCard layout="horizontal" titleSize="xs"
        title={this.props.hideName == false ? this.props.event_id : null}
        description=""
        betaBadgeLabel={this.props.hideBadge == false ? 'Event' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="logstashInput" color="subdued" />
          : null}
      >
        <EuiText>
          <strong>Source:</strong> <EuiCode><EuiLink href={linkToSource}>{event.source}</EuiLink></EuiCode>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiText>
          <strong>Trigger:</strong> <EuiCode>{event.trigger}</EuiCode>
        </EuiText>

          {event.version &&
            <React.Fragment>
              <EuiSpacer size="l" />
              <EuiText>
                <strong>Version:</strong> <EuiCode>{event.version}</EuiCode>
              </EuiText>
            </React.Fragment>
          }

          <EuiSpacer size="l" />

          <EuiText>
            <strong>Received at:</strong> {formatDate(event.received_at, 'longDateTime')}
          </EuiText>
          <EuiSpacer size="s" />
          <EuiText>
            <strong>Ingested at:</strong> {formatDate(event.ingested_at, 'longDateTime')}
          </EuiText>

          <EuiSpacer size="l" />

          <EuiText>
            <strong>Jobs created:</strong> {event.jobs.length}
          </EuiText>

          {this.props.hideLink === false &&
            <React.Fragment>
              <EuiSpacer size="xl" />
              <EuiButton href={linkToEvent}>View event</EuiButton>
            </React.Fragment>
          }

          <EuiSpacer size="m" />
      </EuiCard>
    );
  };
};
