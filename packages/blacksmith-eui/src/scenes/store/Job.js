import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexGrid, EuiFlexItem,
  EuiTitle, EuiText, EuiTextColor,
  EuiCode, EuiCodeBlock,
  EuiAccordion, EuiIcon,
} from '@elastic/eui';

import { CardJob } from '../../cards';
import { Transition } from '../../atoms/store';
import { Loading } from '../Loading';

/**
 * Scene component for displaying everything about a Blacksmith job.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Job } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Job extends React.Component {
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
     * Front-end route to access the event ID.
     *
     * **Route params:**
     *
     *   - `:event_id`: Unique ID of the event.
     */
    linkToEvent: PropTypes.string,

    /**
     * Front-end route to access a job ID.
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
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
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
      job: {
        transitions: [],
      },
    },
  };

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let newStatusCode = 500;
    let transitionsData = [];

    let response = {};
    try {
      response = await this.props.axios.get(`/store/jobs/${this.props.job_id}/transitions`, {
        params: {
          'limit': 20,
          'offset': 0,
        },
      });

      transitionsData = response.data.data;
      newStatusCode = response.data.statusCode;
    } catch (error) {
      transitionsData = null;
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        job: { ...prevState.data.job,
          transitions: transitionsData,
        },
      },
    }));
  };

  /**
   * Render the component.
   */
  render() {
    const onJobLoaded = (status, job) => {
      this.setState((prevState) => ({ ...prevState,
        statusCode: status,
        data: { ...prevState.data,
          job: job,
        },
      }), this.request);
    };

    let job = this.state.data.job;
    if (job == null) {
      job = {
        context: null,
        data: null,
        transitions: [],
      };
    }

    return (
      <React.Fragment>
        <EuiFlexGroup alignItems="flexStart" gutterSize="xl" className="wrapped">
          <EuiFlexItem grow={false} style={{ width: '30%' }}>
            <CardJob {...this.props} hideLink={true} onJobLoaded={onJobLoaded} />
          </EuiFlexItem>
          <EuiFlexItem grow={true}>
            <EuiAccordion id="show_context" key="show_context"
              paddingSize="xl"
              className="euiAccordionForm"
              buttonClassName="euiAccordionForm__button"
              buttonContent={
                <>
                  <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
                    <EuiFlexItem grow={false}>
                      <EuiIcon type="globe" size="l" />
                    </EuiFlexItem>

                    <EuiFlexItem>
                      <EuiTitle size="xs">
                        <h3>Context</h3>
                      </EuiTitle>
                      <EuiText size="s">
                        <p>
                          <EuiTextColor color="subdued">
                            JSON-formatted <EuiCode>context</EuiCode> object of the job.
                          </EuiTextColor>
                        </p>
                      </EuiText>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </>
              }
            >
              <EuiFlexGrid columns={1} gutterSize="s">
                <EuiFlexItem grow={true}>
                  <EuiCodeBlock language="json">
                    {job.context == null && 'null'}
                    {job.context != null && JSON.stringify(job.context, null, 2)}
                  </EuiCodeBlock>
                </EuiFlexItem>
              </EuiFlexGrid>
            </EuiAccordion>

            <EuiAccordion id="show_data" key="show_data"
              paddingSize="xl"
              className="euiAccordionForm"
              buttonClassName="euiAccordionForm__button"
              buttonContent={
                <>
                  <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
                    <EuiFlexItem grow={false}>
                      <EuiIcon type="document" size="l" />
                    </EuiFlexItem>

                    <EuiFlexItem>
                      <EuiTitle size="xs">
                        <h3>Data</h3>
                      </EuiTitle>
                      <EuiText size="s">
                        <p>
                          <EuiTextColor color="subdued">
                            JSON-formatted <EuiCode>data</EuiCode> object of the job.
                          </EuiTextColor>
                        </p>
                      </EuiText>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </>
              }
            >
              <EuiFlexGrid columns={1} gutterSize="s">
                <EuiFlexItem grow={true}>
                  <EuiCodeBlock language="json">
                    {job.data == null && 'null'}
                    {job.data != null && JSON.stringify(job.data, null, 2)}
                  </EuiCodeBlock>
                </EuiFlexItem>
              </EuiFlexGrid>
            </EuiAccordion>

            <EuiAccordion initialIsOpen id="show_jobs" key="show_jobs"
              paddingSize="xl"
              className="euiAccordionForm"
              buttonClassName="euiAccordionForm__button"
              buttonContent={
                <>
                  <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
                    <EuiFlexItem grow={false}>
                      <EuiIcon type="apmTrace" size="l" />
                    </EuiFlexItem>

                    <EuiFlexItem>
                      <EuiTitle size="xs">
                        <h3>Status</h3>
                      </EuiTitle>
                      <EuiText size="s">
                        <p>
                          <EuiTextColor color="subdued">
                            Latest transitions of the job.
                          </EuiTextColor>
                        </p>
                      </EuiText>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </>
              }
            >
              <EuiFlexGrid columns={1} gutterSize="s">
                <EuiFlexItem grow={true}>
                  {this.state.isLoading === true &&
                    <Loading
                      isLoading={this.state.isLoading}
                      statusCode={this.state.statusCode}
                    />
                  }

                  {this.state.isLoading === false && job.transitions &&
                    job.transitions.map((transition, i) => {
                      return <Transition transition={transition} key={transition.id} />;
                    })
                  }
                </EuiFlexItem>
              </EuiFlexGrid>
            </EuiAccordion>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  };
};
