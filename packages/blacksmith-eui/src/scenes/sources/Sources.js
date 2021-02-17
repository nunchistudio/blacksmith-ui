import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';

import {
  CardSource,
} from '../../cards/sources';

import { Loading } from '../Loading';

/**
 * Scene component to display all sources' cards in a single page.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Sources } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Sources extends React.Component {
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
    axios: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    /**
     * Do you want to hide the cards' badges?
     */
    hideBadges: PropTypes.bool,

    /**
     * Do you want to hide the cards' names?
     */
    hideNames: PropTypes.bool,

    /**
     * Front-end route to access a source.
     *
     * **Route params:**
     *
     *   - `:source_name`: Name of the source.
     */
    linkToSource: PropTypes.string,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadges: false,
    hideNames: false,
    linkToSource: '/admin/source.html?name=:source_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      sources: [],
    },
  };

  /**
   * When mounting the component, do a request to the Blacksmith API.
   */
  async componentDidMount() {
    await this.request();
  };

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let newStatusCode = 500;
    let sourcesData = {};

    let response = {};
    try {
      response = await this.props.axios.get('/sources');
      newStatusCode = response.data.statusCode;
      sourcesData = response.data.data;
    } catch (error) {
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        sources: sourcesData,
      },
    }));
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.statusCode !== 200) {
      return (
        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={false} style={{ margin: '0 auto' }}>
            <Loading
              isLoading={this.state.isLoading}
              statusCode={this.state.statusCode}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    }

    return (
      <React.Fragment>
        {this.state.data.sources && this.state.data.sources.map((source, i) => {
          return (
            <React.Fragment key={source.name}>
              <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
                <EuiFlexItem grow={true}>
                  <CardSource {...this.props}
                    source={source}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>

              <EuiSpacer size="xl" />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };
};
