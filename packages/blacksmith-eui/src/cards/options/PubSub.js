import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiCard, EuiBasicTable, EuiIcon,
} from '@elastic/eui';

import { columns } from '../_shared';

/**
 * List of known Pub / Sub adapters. It allows to humanize the adapter's name
 * given its identifier.
 */
const names = {
  'aws/snssqs': 'AWS SNS / SQS',
  'azure/servicebus': 'Azure Service Bus',
  'google/pubsub': 'Google Pub / Sub',
  'kafka': 'Apache Kafka',
  'nats': 'NATS',
  'rabbitmq': 'RabbitMQ',
};

/**
 * Card component for the Blacksmith Pub / Sub adapter.
 *
 * This card does not request the Blacksmith API. It is up to the user to pass
 * the options of the adapter down to this component. If you do not want to
 * handle API requests and need a higher level of abstraction, please take a
 * look at the scene `Options`.
 *
 * **Import:**
 *
 * ```js
 * import { CardPubSub } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardPubSub extends React.Component {
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
    const pubsub = this.props.options.pubsub;
    const items = [
      {
        id: 'enabled',
        key: 'Enabled',
        value: pubsub ? true : false,
      },
    ];

    if (pubsub) {
      items.push({
        id: 'adapter',
        key: 'Adapter',
        value: names[pubsub.from],
      }, {
        id: 'settings__',
        key: 'Settings',
        value: null,
      }, {
        id: 'settings__topic',
        key: 'Settings / Topic',
        value: pubsub.topic,
        isValueCode: true,
      }, {
        id: 'settings__subscription',
        key: 'Settings / Subscription',
        value: pubsub.subscription,
        isValueCode: true,
      });
    }

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? 'Pub / Sub' : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Adapter' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="merge" color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />
      </EuiCard>
    );
  };
};
