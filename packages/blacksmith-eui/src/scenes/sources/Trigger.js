import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexGrid, EuiFlexItem,
  EuiTitle, EuiText, EuiTextColor,
  EuiCode, EuiBasicTable,
  EuiAccordion, EuiIcon,
} from '@elastic/eui';

import { CardTrigger } from '../../cards';
import { columns } from '../../cards/_shared';

/**
 * Scene component for displaying everything about a Blacksmith trigger.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Trigger } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Trigger extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The source name of the trigger to retrieve.
     */
    source_name: PropTypes.string.isRequired,

    /**
     * The trigger name to retrieve.
     */
    trigger_name: PropTypes.string.isRequired,

    /**
     * The axios instance to use for communicating with the Blacksmith API.
     */
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    /**
     * Front-end route to access the trigger.
     *
     * **Route params:**
     *
     *   - `:source_name`: Name of the source.
     *   - `:trigger_name`: Name of the trigger.
     */
    linkToTrigger: PropTypes.string,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    linkToTrigger: '/admin/sources/trigger.html?source_name=:source_name&trigger_name=:trigger_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      trigger: {
        mode: {},
      },
    },
  };

  /**
   * Render the component.
   */
  render() {
    const onTriggerLoaded = (status, trigger) => {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        statusCode: status,
        data: {
          ...prevState.data,
          trigger: trigger,
        },
      }));
    };

    let trigger = this.state.data.trigger;
    if (trigger == null) {
      trigger = {
        mode: {},
      };
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
      case 'subscriber':
        mode = 'Subscription';
        break;
    };

    let semaphoreIcon = 'securitySignalDetected';
    let semaphoreText = (
      <>
        The <EuiCode>supervisor</EuiCode> adapter must be enabled to leverage
        a distributed semaphore.
      </>
    );

    let isApplicable, isAcquired;
    let semaphoreItems = [];
    if (trigger.semaphore) {
      semaphoreIcon = 'lockOpen';
      semaphoreText = `Distributed lock does not apply on triggers using ${mode} mode.`;

      semaphoreItems.push({
        id: 'key',
        key: 'Key',
        value: trigger.semaphore.key,
        isValueCode: true,
      });

      isApplicable = trigger.semaphore.is_applicable;
      isAcquired = trigger.semaphore.is_acquired || false;
      if (isApplicable == true) {
        semaphoreIcon = 'lockOpen';
        semaphoreText = 'Key for this trigger is currently not in use.';

        if (isAcquired == true) {
          semaphoreIcon = 'lock';
          semaphoreText = 'Key for this trigger is currently in use.';

          semaphoreItems.push({
            id: 'session_id',
            key: 'Session ID',
            value: trigger.semaphore.session_id,
            isValueCode: true,
          }, {
            id: 'acquirer__',
            key: 'Acquirer',
            value: null
          }, {
            id: 'acquirer__name',
            key: 'Acquirer / Name',
            value: trigger.semaphore.acquirer_name,
            isValueCode: true,
          });

          if (trigger.semaphore.acquirer_address) {
            semaphoreItems.push({
              id: 'acquirer__address',
              key: 'Acquirer / Address',
              value: trigger.semaphore.acquirer_address,
              isValueCode: true,
            });
          }
        }
      }
    }

    return (
      <React.Fragment>
        <EuiFlexGroup alignItems="flexStart" gutterSize="xl" className="wrapped">
          <EuiFlexItem grow={false} style={{ width: '30%' }}>
            <CardTrigger {...this.props} hideLink={true} onTriggerLoaded={onTriggerLoaded} />
          </EuiFlexItem>
          <EuiFlexItem grow={true}>
            <EuiAccordion initialIsOpen id="show_semaphore" key="show_semaphore"
              paddingSize="xl"
              className="euiAccordionForm"
              buttonClassName="euiAccordionForm__button"
              buttonContent={
                <>
                  <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
                    <EuiFlexItem grow={false}>
                      <EuiIcon type={semaphoreIcon} color={isApplicable == true ? "" : "subdued"} size="l" />
                    </EuiFlexItem>

                    <EuiFlexItem>
                      <EuiTitle size="xs">
                        <h3>Semaphore</h3>
                      </EuiTitle>
                      <EuiText size="s">
                        <p>
                          <EuiTextColor color="subdued">
                            {semaphoreText}
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
                  <EuiBasicTable responsive={true} itemId="key"
                    columns={columns}
                    items={semaphoreItems}
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
