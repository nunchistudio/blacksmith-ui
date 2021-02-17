import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup, EuiFlexItem,
  EuiPanel, EuiText,
} from '@elastic/eui';

/**
 * Card component for the Blacksmith Pub / Sub adapter.
 *
 * This card does not request the Blacksmith API. It is up to the user to pass
 * the environment details down to this component. If you do not want to handle
 * API requests and need a higher level of abstraction, please take a look at
 * the scene `Options`.
 *
 * **Import:**
 *
 * ```js
 * import { CardEnvironment } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CardEnvironment extends React.Component {
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
  };

  /**
   * Render the component.
   */
  render() {
    const blacksmith = this.props.options.blacksmith;
    const go = this.props.options.go;

    return (
      <EuiPanel paddingSize="m">
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={true}>
            <EuiText size="s">
              <strong>Blacksmith: </strong>
              {blacksmith.version}
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiText size="s">
              <strong>Go environment: </strong>
              {go.version} for {go.environment}
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    );
  };
};
