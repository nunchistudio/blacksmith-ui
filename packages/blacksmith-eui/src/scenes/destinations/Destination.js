import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexGrid, EuiFlexItem,
  EuiTitle, EuiToolTip, EuiText, EuiTextColor,
  EuiCode,  EuiIcon, EuiBasicTable,
  EuiSpacer,
} from '@elastic/eui';

import { CardDestination } from '../../cards';

/**
 * Function for rendering the columns based on the component's properties.
 */
const columns = (props) => [
  {
    field: 'name',
    name: 'Action',
    width: '35%',
    truncateText: true,
    textOnly: true,
    render: (name, row) => {
      return (
        <EuiCode>{name}</EuiCode>
      );
    },
  },
  {
    field: 'schedule',
    name: (
      <EuiToolTip content="When not set, a schedule option for an action is inherited from the destination.">
        <span>Overridden schedule{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    truncateText: true,
    textOnly: true,
    render: (_, row) => {
      const list = [];
      if (row.schedule) {
        if ('realtime' in row.schedule) {
          list.push(
            <li>
              <strong>Real-time load:</strong> {row.schedule === true ? 'Yes' : 'No'}
            </li>
          );
        }

        if (row.schedule.interval) {
          list.push(
            <li>
              <strong>Retries interval:</strong> <EuiCode>{row.schedule.interval}</EuiCode>
            </li>
          );
        }

        if (row.schedule.max_retries) {
          list.push(
            <li>
              <strong>Maximum retries:</strong> <EuiCode>{row.schedule.max_retries}</EuiCode>
            </li>
          );
        }
      }

      return (
        <ul>
          {list.map((li, i) => {
            return li;
          })}
        </ul>
      );
    },
  },
];

/**
 * Scene component for displaying everything about a Blacksmith destination.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Destination } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Destination extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The destination name to retrieve.
     */
    destination_name: PropTypes.string.isRequired,

    /**
     * The axios instance to use for communicating with the Blacksmith API.
     */
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      destination: {
        actions: [],
      }
    },
  };

  /**
   * Render the component.
   */
  render() {
    const onDestinationLoaded = (status, destination) => {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        statusCode: status,
        data: {
          ...prevState.data,
          destination: destination,
        },
      }));
    };

    let destination = this.state.data.destination;
    if (destination == null) {
      destination = {
        actions: [],
      };
    }

    return (
      <React.Fragment>
        <EuiFlexGroup alignItems="flexStart" gutterSize="xl" className="wrapped">
          <EuiFlexItem grow={false} style={{ width: '30%' }}>
            <CardDestination {...this.props} hideLink={true} onDestinationLoaded={onDestinationLoaded} />
          </EuiFlexItem>
          <EuiFlexItem grow={true}>
            <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiIcon type="logstashIf" size="l" />
              </EuiFlexItem>

              <EuiFlexItem>
                <EuiTitle size="xs">
                  <h3>Actions</h3>
                </EuiTitle>
                <EuiText size="s">
                  <p>
                    <EuiTextColor color="subdued">
                      Actions registered for the destination <EuiCode>{this.props.destination_name}</EuiCode>.
                    </EuiTextColor>
                  </p>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer size="xl" />

            <EuiFlexGrid columns={1} gutterSize="s">
              <EuiFlexItem grow={true}>
                <EuiBasicTable responsive={true} loading={this.state.isLoading}
                  itemId="id"
                  columns={columns({ ...this.props, destination_name: destination.name })}
                  items={destination.actions}
                  noItemsMessage={this.state.isLoading
                    ? `Loading registered actions...`
                    : `No registered actions found`}
                />
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  };
};
