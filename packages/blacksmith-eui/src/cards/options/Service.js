import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiCard, EuiBasicTable, EuiIcon,
} from '@elastic/eui';

import { columns } from '../_shared';

/**
 * List of known services. It allows to humanize the service's name given
 * its identifier.
 */
const names = {
  'gateway': 'Gateway',
  'scheduler': 'Scheduler',
};

/**
 * List of icons to use depending on the service.
 */
const icons = {
  'gateway': 'logstashInput',
  'scheduler': 'logstashOutput',
};

/**
 * Card component for a Blacksmith service. This shall be used either for
 * the gateway or scheduler service.
 *
 * This card does not request the Blacksmith API. It is up to the user to pass
 * the options of the service down to this component. If you do not want to
 * handle API requests and need a higher level of abstraction, please take a
 * look at the scene `Options`.
 *
 * **Import:**
 *
 * ```js
 * import { CardService } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardService extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * Name of the service to display.
     */
    service: PropTypes.oneOf(['gateway', 'scheduler']).isRequired,

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
    const service = this.props.options[this.props.service];
    const items = [
      {
        id: 'address',
        key: 'Address',
        value: service.address,
        isValueCode: true,
      },
      {
        id: 'admin__',
        key: 'Admin',
        value: null,
      },
      {
        id: 'admin__enabled',
        key: 'Admin / Enabled',
        value: service.admin.enabled,
      },
      {
        id: 'admin__dashboard',
        key: 'Admin / Built-in dashboard',
        value: service.admin.dashboard,
      },
    ];

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? names[this.props.service] : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Service' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type={icons[this.props.service]} color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />
      </EuiCard>
    );
  };
};
