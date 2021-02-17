import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiCard, EuiBasicTable, EuiIcon,
} from '@elastic/eui';

import { columns } from '../_shared';

/**
 * List of known supervisor adapters. It allows to humanize the adapter's name
 * given its identifier.
 */
const names = {
  'consul': 'Consul',
  'postgres': 'PostgreSQL',
};

/**
 * Card component for the Blacksmith supervisor adapter.
 *
 * This card does not request the Blacksmith API. It is up to the user to pass
 * the options of the adapter down to this component. If you do not want to
 * handle API requests and need a higher level of abstraction, please take a
 * look at the scene `Options`.
 *
 * **Import:**
 *
 * ```js
 * import { CardSupervisor } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardSupervisor extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The options returned by the Blacksmith API.
     */
    options: PropTypes.object,

    /**
     * Do you want to hide the card's badge?
     */
    hideBadge: PropTypes.bool,

    /**
     * Do you want to hide the card's name?
     */
    hideName: PropTypes.bool,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadge: false,
    hideName: false,
  };

  /**
   * Render the component.
   */
  render() {
    const supervisor = this.props.options.supervisor;
    const items = [
      {
        id: 'enabled',
        key: 'Enabled',
        value: supervisor ? true : false,
      },
    ];

    if (supervisor) {
      items.push({
        id: 'adapter',
        key: 'Adapter',
        value: names[supervisor.from],
      }, {
        id: 'node__',
        key: 'Node Joined',
        value: null,
      }, {
        id: 'node__name',
        key: 'Node Joined / Name',
        value: supervisor.node.name,
        isValueCode: true,
      }, {
        id: 'node__address',
        key: 'Node Joined / Address',
        value: supervisor.node.address,
        isValueCode: true,
      }, {
        id: 'node__tags',
        key: 'Node Joined / Tags',
        value: supervisor.node.tags,
        isValueCode: true,
      }, {
        id: 'node__meta',
        key: 'Node Joined / Meta',
        value: supervisor.node.meta,
        isValueCode: true,
      });
    }

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? 'Supervisor' : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Adapter' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="securitySignalResolved" color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />
      </EuiCard>
    );
  };
};
