import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiEmptyPrompt, EuiLoadingSpinner,
} from '@elastic/eui';

/**
 * Component to display status about an API request on a page.
 *
 * This component shall be used within a scene or a card for loading
 * and error handling.
 *
 * **Import:**
 *
 * ```js
 * import { Loading } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Loading extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * Is the parent scene currently waiting for the response?
     */
    isLoading: PropTypes.bool.isRequired,

    /**
     * Status code returned by the API.
     */
    statusCode: PropTypes.number,

    /**
     * The kind of resource to load. This does not have any impact
     * on other components. It is here for convenience for better
     * message error when a resource has not found.
     */
    resourceKind: PropTypes.string,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    isLoading: true,
    resourceKind: 'resource',
  };

  /**
   * Render the component.
   */
  render() {
    if (this.props.isLoading === true) {
      return (
        <EuiEmptyPrompt titleSize="xs" title={<h2>Loading...</h2>}
          body={
            <EuiLoadingSpinner size="xl" />
          }
        />
      );
    } else if (this.props.statusCode < 500) {
      return (
        <EuiEmptyPrompt iconType="unlink" iconColor={null} titleSize="xs"
          title={<h2>Resource Not Found</h2>}
          body={
            <p>
              The {this.props.resourceKind} you are looking for has not been
              found. Make sure it does exist and you have the authorization
              to request it.
            </p>
          }
        />
      );
    }

    return (
      <EuiEmptyPrompt titleSize="xs" title={<h2>Network Error</h2>}
        iconType="offline" iconColor={null}
        body={
          <React.Fragment>
            <p>
              An error occured while reaching the Blacksmith REST API.
            </p>
            <p>
              Please make sure your application is up and running, and your
              network allows this kind of connection.
            </p>
          </React.Fragment>
        }
      />
    );
  };
};
