import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiCode, EuiLink, EuiText, EuiButton,
  EuiIcon, EuiCard, EuiHealth,
  EuiSpacer,
} from '@elastic/eui';

import { formatDate } from '@elastic/eui/lib/services/format';
import { Loading } from '../../scenes';

/**
 * Card component for displaying basic info about a Blacksmith job.
 * It is used by the scene `Job`.
 *
 * This card requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { CardJob } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardJob extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The job ID to retrieve.
     */
    job_id: PropTypes.string.isRequired,

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
     * Do you want to hide the link to the job?
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
     * Front-end route to access the job ID.
     *
     * **Route params:**
     *
     *   - `:job_id`: Unique ID of the job.
     */
    linkToJob: PropTypes.string,

    /**
     * Front-end route to access a destination.
     *
     * **Route params:**
     *
     *   - `:destination_name`: Name of the destination.
     */
    linkToDestination: PropTypes.string,

    /**
     * Callback function when the job is loaded.
     *
     * @param statusCode - The HTTP status code returned by the Blacksmith API.
     * @param job - The job object returned by the Blacksmith API.
     */
    onJobLoaded: PropTypes.func,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadge: false,
    hideName: false,
    hideLink: false,
    linkToEvent: '/admin/store/event.html?id=:event_id',
    linkToJob: '/admin/store/job.html?id=:job_id',
    linkToDestination: '/admin/destination.html?name=:destination_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      job: null,
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
    let jobData = {};

    let response = {};
    try {
      response = await this.props.axios.get(`/store/jobs/${this.props.job_id}`);
      jobData = response.data.data;
      newStatusCode = response.data.statusCode;
    } catch (error) {
      jobData = null;
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        job: jobData,
      },
    }), this.cardDidUpdate);
  };

  /**
   * Callback function used when the job us loaded.
   */
  cardDidUpdate() {
    if (this.props.onJobLoaded) {
      this.props.onJobLoaded(this.state.statusCode, this.state.data.job);
    }
  };

  /**
   * Render the component.
   */
  render() {
    const renderStatus = (status) => {
      switch (status) {
        case 'acknowledged':
          return <EuiHealth color="#D3DAE6">Acknowledged</EuiHealth>;
        case 'awaiting':
          return <EuiHealth color="#98A2B3">Awaiting</EuiHealth>;
        case 'executing':
          return <EuiHealth color="#006BB4">Executing</EuiHealth>;
        case 'succeeded':
          return <EuiHealth color="#017D73">Succeeded</EuiHealth>;
        case 'failed':
          return <EuiHealth color="#F5A700">Failed</EuiHealth>;
        case 'discarded':
          return <EuiHealth color="#BD271E">Discarded</EuiHealth>;
        default:
          return <EuiHealth color="#000000">Unknown</EuiHealth>;
      };
    };

    if (this.state.data.job == null || this.state.data.job.id == '') {
      return (
        <EuiCard layout="horizontal" titleSize="xs"
          title=""
          description=""
          betaBadgeLabel={this.props.hideBadge == false ? 'Job' : null}
        >
          <Loading resourceKind="job"
            statusCode={this.state.statusCode}
            isLoading={this.state.isLoading}
          />
        </EuiCard>
      );
    }

    let job = this.state.data.job;
    let linkToEvent, linkToJob, linkToParentJob, linkToDestination;
    if (job !== null) {
      linkToEvent = this.props.linkToEvent.replace(':event_id', job.event_id);
      linkToJob = this.props.linkToJob.replace(':job_id', job.id);
      linkToParentJob = this.props.linkToJob.replace(':job_id', job.parent_job_id);
      linkToDestination = this.props.linkToDestination.replace(':destination_name', job.destination);
    } else {
      job = {
        context: null,
        data: null,
        transitions: [],
      };
    }

    return (
      <EuiCard layout="horizontal" titleSize="xs"
        title={this.props.hideName == false ? this.props.job_id : null}
        description=""
        betaBadgeLabel={this.props.hideBadge == false ? 'Job' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="logstashOutput" color="subdued" />
          : null}
      >
        <EuiText>
          <strong>Destination:</strong> <EuiCode><EuiLink href={linkToDestination}>{job.destination}</EuiLink></EuiCode>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiText>
          <strong>Action:</strong> <EuiCode>{job.action}</EuiCode>
        </EuiText>

          {job.version &&
            <React.Fragment>
              <EuiSpacer size="l" />
              <EuiText>
                <strong>Version:</strong> <EuiCode>{job.version}</EuiCode>
              </EuiText>
            </React.Fragment>
          }

          <EuiSpacer size="l" />

          <EuiText>
            <strong>Created at:</strong> {formatDate(job.created_at, 'longDateTime')}
          </EuiText>

          <EuiSpacer size="l" />

          <EuiText>
            <strong>Attempts:</strong> {job.transitions[0].attempt}
          </EuiText>
          <EuiSpacer size="s" />
          <EuiText>
            <strong>Status:</strong> {renderStatus(job.transitions[0].state_after)}
          </EuiText>

          <EuiSpacer size="l" />

          <EuiText>
            <strong>Event ID:</strong> <EuiLink href={linkToEvent}>{job.event_id}</EuiLink>
          </EuiText>
          {job.parent_job_id &&
            <React.Fragment>
              <EuiSpacer size="s" />
              <EuiText>
                <strong>Parent job ID:</strong> <EuiLink href={linkToParentJob}>{job.parent_job_id}</EuiLink>
              </EuiText>
            </React.Fragment>
          }

          {this.props.hideLink === false &&
            <React.Fragment>
              <EuiSpacer size="xl" />
              <EuiButton href={linkToJob}>View job</EuiButton>
            </React.Fragment>
          }

          <EuiSpacer size="m" />
      </EuiCard>
    );
  };
};
