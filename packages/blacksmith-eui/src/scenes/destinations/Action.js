import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexGrid, EuiFlexItem,
  EuiTitle, EuiText, EuiTextColor,
  EuiCode, EuiBasicTable,
  EuiAccordion, EuiIcon,
} from '@elastic/eui';

import { CardAction } from '../../cards';
import { columns } from '../../cards/_shared';

/**
 * Scene component for displaying everything about a Blacksmith action.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Action } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Action extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The destination name of the action to retrieve.
     */
    destination_name: PropTypes.string.isRequired,

    /**
     * The action name to retrieve.
     */
    action_name: PropTypes.string.isRequired,

    /**
     * The axios instance to use for communicating with the Blacksmith API.
     */
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    /**
     * Front-end route to access the action.
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
    linkToAction: '/admin/destinations/action.html?destination_name=:destination_name&action_name=:action_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      action: {},
    },
  };

  /**
   * Render the component.
   */
  render() {
    const onActionLoaded = (status, action) => {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        statusCode: status,
        data: {
          ...prevState.data,
          action: action,
        },
      }));
    };

    let action = this.state.data.action;
    if (action == null) {
      action = {};
    }

    let semaphoreIcon = 'securitySignalDetected';
    let semaphoreText = (
      <>
        The <EuiCode>supervisor</EuiCode> adapter must be enabled to leverage
        a distributed semaphore.
      </>
    );

    let semaphoreItems = [];
    if (action.semaphore) {
      semaphoreIcon = 'lockOpen';
      semaphoreText = `Key for this action is currently not in use.`;

      semaphoreItems.push({
        id: 'key',
        key: 'Key',
        value: action.semaphore.key,
        isValueCode: true,
      });

      if (action.semaphore.is_acquired == true) {
        semaphoreIcon = 'lock';
        semaphoreText = 'Key for this action is currently in use.';

        semaphoreItems.push({
          id: 'session_id',
          key: 'Session ID',
          value: action.semaphore.session_id,
          isValueCode: true,
        }, {
          id: 'acquirer__',
          key: 'Acquirer',
          value: null
        }, {
          id: 'acquirer__name',
          key: 'Acquirer / Name',
          value: action.semaphore.acquirer_name,
          isValueCode: true,
        });

        if (action.semaphore.acquirer_address) {
          semaphoreItems.push({
            id: 'acquirer__address',
            key: 'Acquirer / Address',
            value: action.semaphore.acquirer_address,
            isValueCode: true,
          });
        }
      }
    }

    return (
      <React.Fragment>
        <EuiFlexGroup alignItems="flexStart" gutterSize="xl" className="wrapped">
          <EuiFlexItem grow={false} style={{ width: '30%' }}>
            <CardAction {...this.props} hideLink={true} onActionLoaded={onActionLoaded} />
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
                      <EuiIcon type={semaphoreIcon} size="l" />
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
