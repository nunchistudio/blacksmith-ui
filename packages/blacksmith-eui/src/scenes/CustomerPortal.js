import React from 'react';

import {
  EuiCodeBlock, EuiImage,
  EuiText, EuiLink,
} from '@elastic/eui';

/**
 * Component to display information about the Nunchi Customer Portal.
 *
 * **Import:**
 *
 * ```js
 * import { CustomerPortal } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class CustomerPortal extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Render the component.
   */
  render() {
    return (
      <EuiText>
        <p>
          You can update your subscription, billing information, and payment details
          by running:
        </p>
        <EuiCodeBlock language="bash">
          {`$ blacksmith login`}
        </EuiCodeBlock>
        <p>
          It will prompt a link to open a new session within the Nunchi Customer Portal,
          powered by <EuiLink target="_blank" href="https://stripe.com/">Stripe</EuiLink> for
          simplified billing:
        </p>
        <EuiImage alt="" url="https://nunchi.studio/images/blacksmith/portal.png" />
      </EuiText>
    );
  };
};
