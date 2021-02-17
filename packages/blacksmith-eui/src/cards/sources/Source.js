import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {
  EuiCard, EuiIcon, EuiButton,
  EuiBasicTable, EuiCode,
  EuiSpacer,
} from '@elastic/eui';

import { columns } from '../_shared';
import { Loading } from '../../scenes';

/**
 * Card component for a Blacksmith source. It is used by the scene `Source`.
 *
 * This card can handle the request to the Blacksmith API. It is up to the user
 * to either pass the `axios` instance to use with the source name to retrieve,
 * or pass the source object already known.
 *
 * **Import:**
 *
 * ```js
 * import { CardSource } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardSource extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The axios instance to use for communicating with the Blacksmith API.
     */
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /**
     * The source name to retrieve with the Blacksmith API.
     */
    source_name: PropTypes.string,

    /**
     * The source object returned by the Blacksmith API. If none is provided,
     * the card will do a request to the API using the `axios` instance and the
     * provided source name.
     */
    source: PropTypes.object,

    /**
     * Do you want to hide the card's badge?
     */
    hideBadge: PropTypes.bool,

    /**
     * Do you want to hide the card's name?
     */
    hideName: PropTypes.bool,

    /**
     * Do you want to hide the link to the event?
     */
    hideLink: PropTypes.bool,

    /**
     * Front-end route to access a source.
     *
     * **Route params:**
     *
     *   - `:source_name`: Name of the source.
     */
    linkToSource: PropTypes.string,

    /**
     * Callback function when the source is loaded.
     *
     * @param statusCode - The HTTP status code returned by the Blacksmith API.
     * @param source - The source object returned by the Blacksmith API.
     */
    onSourceLoaded: PropTypes.func,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadge: false,
    hideName: false,
    hideLink: false,
    linkToSource: '/admin/source.html?name=:source_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      source: null,
    },
  };

  /**
   * When mounting the component, do a request to the Blacksmith API if needed.
   * Otherwise update the state with some of the properties.
   */
  async componentDidMount() {
    if (!this.props.source) {
      await this.request();
    } else {
      this.setState((prevState) => ({ ...prevState,
        isLoading: false,
        statusCode: 200,
        data: { ...prevState.data,
          source: this.props.source,
        }
      }), this.cardDidUpdate)
    }
  }

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let newStatusCode = 500;
    let sourceData = {};

    let response = {};
    try {
      response = await this.props.axios.get(`/sources/${this.props.source_name}`);
      sourceData = response.data.data;
      newStatusCode = response.data.statusCode;
    } catch (error) {
      sourceData = null;
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        source: sourceData,
      },
    }), this.cardDidUpdate);
  };

  /**
   * Callback function used when the source us loaded.
   */
  cardDidUpdate() {
    if (this.props.onSourceLoaded) {
      this.props.onSourceLoaded(this.state.statusCode, this.state.data.source);
    }
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.data.source == null || this.state.data.source.name == '') {
      return (
        <EuiCard layout="horizontal" titleSize="xs"
          title=""
          description=""
          betaBadgeLabel={this.props.hideBadge == false ? 'Source' : null}
        >
          <Loading resourceKind="source"
            statusCode={this.state.statusCode}
            isLoading={this.state.isLoading}
          />
        </EuiCard>
      );
    }

    const source = this.state.data.source;
    let linkToSource;
    if (source !== null) {
      linkToSource = this.props.linkToSource.replace(':source_name', source.name);
    }

    const items = [
      {
        id: 'defaults__',
        key: 'Defaults',
        value: null
      }, {
        id: 'defaults__cron_interval',
        key: 'Defaults / CRON interval',
        value: source.options.cron.interval,
        isValueCode: true,
      },
    ];

    if (source.options.versions) {
      if (source.options.default_version) {
        items.push({
          id: 'defaults__version',
          key: 'Defaults / Version',
          value: source.options.default_version,
          isValueCode: true,
        });
      }

      items.push({
        id: 'versions__',
        key: 'Versions',
        value: null,
      });

      Object.keys(source.options.versions).map((k, i) => {
        items.push({
          id: `versions__${k}`,
          key: `Versions / ${k}`,
          value: moment.parseZone(source.options.versions[k]).utc().format('DD MMMM YYYY HH:mm:ss'),
          isKeyCode: true,
          isValueCode: true,
        });
      });
    }

    return (
      <EuiCard layout="horizontal" description="" titleSize="xs"
        title={this.props.hideName == false ? <EuiCode>{source.name}</EuiCode> : null}
        betaBadgeLabel={this.props.hideBadge == false ? 'Source' : null}
        icon={this.props.hideName == false
          ? <EuiIcon size="l" type="importAction" color="subdued" />
          : null}
      >
        <EuiBasicTable responsive={false} items={items} columns={columns} />

        {this.props.hideLink === false &&
          <React.Fragment>
            <EuiSpacer size="xl" />
            <EuiButton href={linkToSource}>View source</EuiButton>
          </React.Fragment>
        }

        <EuiSpacer size="m" />
      </EuiCard>
    );
  };
};
