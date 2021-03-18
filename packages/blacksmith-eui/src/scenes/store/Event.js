import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexGrid, EuiFlexItem,
  EuiTitle, EuiText,
  EuiCode, EuiCodeBlock,
  EuiAccordion, EuiIcon, EuiTextColor,
  EuiBasicTable,
} from '@elastic/eui';

import { CardEvent } from '../../cards';

import { columns } from './_shared';

/**
 * Scene component for displaying everything about a Blacksmith event.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Event } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Event extends React.Component {
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
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    linkToEvent: '/admin/store/event.html?event_id=:event_id',
    linkToJob: '/admin/store/job.html?job_id=:job_id',
    linkToSource: '/admin/sources/source.html?source_name=:source_name',
    linkToTrigger: '/admin/sources/trigger.html?source_name=:source_name&trigger_name=:trigger_name',
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
      event: {
        jobs: [],
      },
    },
  };

  /**
   * Render the component.
   */
  render() {
    const onEventLoaded = (status, event) => {
      this.setState((prevState) => ({ ...prevState,
        isLoading: false,
        statusCode: status,
        data: { ...prevState.data,
          event: event,
        },
      }));
    };

    let event = this.state.data.event;
    if (event == null) {
      event = {
        context: null,
        data: null,
        jobs: [],
      };
    }

    return (
      <React.Fragment>
        <EuiFlexGroup alignItems="flexStart" gutterSize="xl" className="wrapped">
          <EuiFlexItem grow={false} style={{ width: '30%'}}>
            <CardEvent {...this.props} hideLink={true} onEventLoaded={onEventLoaded} />
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
                            JSON-formatted <EuiCode>context</EuiCode> object of the event.
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
                    {event.context == null && 'null'}
                    {event.context != null && JSON.stringify(event.context, null, 2)}
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
                            JSON-formatted <EuiCode>data</EuiCode> object of the event.
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
                    {event.data == null && 'null'}
                    {event.data != null && JSON.stringify(event.data, null, 2)}
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
                      <EuiIcon type="logstashOutput" size="l" />
                    </EuiFlexItem>

                    <EuiFlexItem>
                      <EuiTitle size="xs">
                        <h3>Jobs</h3>
                      </EuiTitle>
                      <EuiText size="s">
                        <p>
                          <EuiTextColor color="subdued">
                            Jobs related to the event.
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
                  <EuiBasicTable responsive={true} loading={this.state.isLoading}
                    itemId="id"
                    columns={columns['jobs'](this.props)}
                    items={event.jobs}
                    noItemsMessage={this.state.isLoading
                      ? `Loading related jobs...`
                      : `No related jobs found`}
                  />
                </EuiFlexItem>
              </EuiFlexGrid>
            </EuiAccordion>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  };
};
