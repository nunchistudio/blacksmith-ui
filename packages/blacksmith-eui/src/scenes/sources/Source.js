import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexGrid, EuiFlexItem,
  EuiTitle, EuiToolTip, EuiText, EuiTextColor,
  EuiLink, EuiCode, EuiIcon, EuiBasicTable,
  EuiSpacer,
} from '@elastic/eui';

import { CardSource } from '../../cards';

/**
 * Function for rendering the columns based on the component's properties.
 */
const columns = (props) => [
  {
    field: 'name',
    name: 'Trigger',
    width: '35%',
    truncateText: true,
    textOnly: true,
    render: (trigger, row) => {
      let link = props.linkToTrigger.replace(':source_name', props.source_name);
      link = link.replace(':trigger_name', trigger);

      return (
        <EuiCode>
          <EuiLink href={link}>{trigger}</EuiLink>
        </EuiCode>
      );
    },
  },
  {
    field: 'mode',
    name: 'Mode',
    width: '25%',
    truncateText: true,
    textOnly: true,
    render: (_, row) => {
      switch (row.mode.mode) {
        case 'http':
          return 'HTTP';
        case 'cron':
          return 'CRON';
        case 'cdc':
          return 'CDC';
        case 'subscriber':
          return 'Subscription';
      };
    },
  },
  {
    field: 'overview',
    name: (
      <EuiToolTip content="When not set and if the mode is set to CRON, the interval is inherited from the source.">
        <span>Settings{' '}
          <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
        </span>
      </EuiToolTip>
    ),
    truncateText: true,
    textOnly: true,
    render: (_, row) => {
      switch (row.mode.mode) {
        case 'http':
          return (
            <ul>
              <li>
                <strong>Methods:</strong>
                {row.mode.http.methods
                  .map((method) => <> <EuiCode>{method}</EuiCode></>)
                  .reduce((result, item) => [result, ', ', item])
                }
              </li>
              <li>
                <strong>Path:</strong> <EuiCode>{row.mode.http.path}</EuiCode>
              </li>
            </ul>
          );

        case 'cron':
          return (
            <ul>
              <li>
                <strong>Interval:</strong>
                {row.mode.cron && row.mode.cron.interval
                  ? <><EuiCode>{row.mode.cron.interval}</EuiCode></>
                  : <><em>Inherited from source</em></>
                }
              </li>
            </ul>
          );

        case 'cdc':
          return (
            <ul>
              <li>-</li>
            </ul>
          );

        case 'subscriber':
          return (
            <ul>
              {row.mode.subscriber && row.mode.subscriber.topic &&
                <li>
                  <strong>Topic:</strong> <EuiCode>{row.mode.subscriber.topic}</EuiCode>
                </li>
              }
              {row.mode.subscriber && row.mode.subscriber.subscription &&
                <li>
                  <strong>Subscription:</strong> <EuiCode>{row.mode.subscriber.subscription}</EuiCode>
                </li>
              }
            </ul>
          );
      };
    },
  },
];

/**
 * Scene component for displaying everything about a Blacksmith source.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Source } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Source extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The source name to retrieve.
     */
    source_name: PropTypes.string.isRequired,

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
      source: {
        triggers: [],
      }
    },
  };

  /**
   * Render the component.
   */
  render() {
    const onSourceLoaded = (status, source) => {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        statusCode: status,
        data: {
          ...prevState.data,
          source: source,
        },
      }));
    };

    let source = this.state.data.source;
    if (source == null) {
      source = {
        triggers: [],
      };
    }

    return (
      <React.Fragment>
        <EuiFlexGroup alignItems="flexStart" gutterSize="xl" className="wrapped">
          <EuiFlexItem grow={false} style={{ width: '30%' }}>
            <CardSource {...this.props} hideLink={true} onSourceLoaded={onSourceLoaded} />
          </EuiFlexItem>
          <EuiFlexItem grow={true}>
            <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiIcon type="bolt" size="l" />
              </EuiFlexItem>

              <EuiFlexItem>
                <EuiTitle size="xs">
                  <h3>Triggers</h3>
                </EuiTitle>
                <EuiText size="s">
                  <p>
                    <EuiTextColor color="subdued">
                      Triggers registered for the source <EuiCode>{this.props.source_name}</EuiCode>.
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
                  columns={columns({ ...this.props, source_name: source.name })}
                  items={source.triggers}
                  noItemsMessage={this.state.isLoading
                    ? `Loading registered triggers...`
                    : `No registered triggers found`}
                />
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  };
};
