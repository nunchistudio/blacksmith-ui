import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';

import {
  CardEnvironment, CardService,
  CardStore, CardPubSub,
  CardSupervisor, CardWanderer,
} from '../../cards/options';

import { Loading } from '../Loading';

/**
 * Scene component to display all options' cards in a single page.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Options } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Options extends React.Component {
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
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    hideBadges: false,
    hideNames: false,
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: true,
    statusCode: 0,
    data: {
      options: {},
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
    let optionsData = {};

    let response = {};
    try {
      response = await this.props.axios.get('/options');
      newStatusCode = response.data.statusCode;
      optionsData = response.data.data;
    } catch (error) {
      newStatusCode = error.response
        ? error.response.status
        : 500;
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      statusCode: newStatusCode,
      data: { ...prevState.data,
        options: optionsData,
      },
    }));
  };

  /**
   * Render the component.
   */
  render() {
    if (this.state.statusCode !== 200 || this.state.data.options == null) {
      return (
        <EuiFlexGroup gutterSize="xl" className="wrapped">
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
        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={true}>
            <CardEnvironment options={this.state.data.options} />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />

        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={true}>
            <CardService service="gateway"
              hideBadge={this.props.hideBadges}
              hideName={this.props.hideNames}
              options={this.state.data.options} />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />

        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={true}>
            <CardService service="scheduler"
              hideBadge={this.props.hideBadges}
              hideName={this.props.hideNames}
              options={this.state.data.options} />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />

        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={true}>
            <CardStore
              hideBadge={this.props.hideBadges}
              hideName={this.props.hideNames}
              options={this.state.data.options} />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />

        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={true}>
            <CardPubSub
              hideBadge={this.props.hideBadges}
              hideName={this.props.hideNames}
              options={this.state.data.options} />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />

        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={true}>
            <CardSupervisor
              hideBadge={this.props.hideBadges}
              hideName={this.props.hideNames}
              options={this.state.data.options} />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />

        <EuiFlexGroup gutterSize="xl" className="wrapped-tight">
          <EuiFlexItem grow={true}>
            <CardWanderer
              hideBadge={this.props.hideBadges}
              hideName={this.props.hideNames}
              options={this.state.data.options} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  };
};
