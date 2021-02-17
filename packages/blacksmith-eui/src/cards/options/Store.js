import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiCard, EuiBasicTable, EuiIcon,
} from '@elastic/eui';

import { columns } from '../_shared';

/**
 * List of known store adapters. It allows to humanize the adapter's name
 * given its identifier.
 */
const names = {
  'postgres': 'PostgreSQL',
};

/**
 * Card component for the Blacksmith store adapter.
 *
 * This card does not request the Blacksmith API. It is up to the user to pass
 * the options of the adapter down to this component. If you do not want to
 * handle API requests and need a higher level of abstraction, please take a
 * look at the scene `Options`.
 *
 * **Import:**
 *
 * ```js
 * import { CardStore } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardStore extends React.Component {
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
    options: PropTypes.object.isRequired,

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
    const store = this.props.options.store;
    const items = [
      {
        id: 'enabled',
        key: 'Enabled',
        value: true,
      },
      {
        id: 'adapter',
        key: 'Adapter',
        value: names[store.from],
      },
    ];

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? 'Store' : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Adapter' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="storage" color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />
      </EuiCard>
    );
  };
};
