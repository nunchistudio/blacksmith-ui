import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiHideFor, EuiShowFor,
  EuiHeader, EuiHeaderLogo, EuiHeaderLinks, EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiPopover, EuiKeyPadMenu, EuiKeyPadMenuItem,
  EuiIcon, EuiSpacer,
} from '@elastic/eui';

/**
 * Default layout component when creating a dashboard for Blacksmith with
 * Elastic UI.
 *
 * **Import:**
 *
 * ```js
 * import { Layout } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Layout extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Default component state.
   */
  state = {
    isKeypadOpen: false,
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * What is the active key in the header menu?
     */
    activeKey: PropTypes.oneOf([
      'store', 'wanderer',
      'sources', 'destinations',
      'options'
    ]),

    /**
     * Link to the Nunchi icon.
     */
    iconNunchi: PropTypes.string,

    /**
     * Link to the Blacksmith icon.
     */
    iconBlacksmith: PropTypes.string,

    /**
     * Link to the internal Nunchi Customer Portal in the dashboard.
     */
    linkToPortal: PropTypes.string,

    /**
     * Link to the internal Blacksmith home page in the dashboard.
     */
    linkToHome: PropTypes.string,

    /**
     * Link to the internal Blacksmith store page in the dashboard.
     */
    linkToStore: PropTypes.string,

    /**
     * Link to the internal Blacksmith wanderer page in the dashboard.
     */
    linkToWanderer: PropTypes.string,

    /**
     * Link to the internal Blacksmith sources page in the dashboard.
     */
    linkToSources: PropTypes.string,

    /**
     * Link to the internal Blacksmith destinations page in the dashboard.
     */
    linkToDestinations: PropTypes.string,

    /**
     * Link to the internal Blacksmith options page in the dashboard.
     */
    linkToOptions: PropTypes.string,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    iconNunchi: '/admin/assets/nunchi/symbol.svg',
    iconBlacksmith: '/admin/assets/blacksmith/symbol.svg',
    linkToPortal: '/admin/portal.html',
    linkToHome: '/admin/index.html',
    linkToStore: '/admin/index.html',
    linkToWanderer: '/admin/wanderer.html',
    linkToSources: '/admin/sources.html',
    linkToDestinations: '/admin/destinations.html',
    linkToOptions: '/admin/options.html',
  };

  /**
   * Render the component.
   */
  render() {
    const onMenuButtonClick = () => {
      this.setState((prevState) => ({
        isKeypadOpen: !this.state.isKeypadOpen,
      }));
    };

    const closeMenu = () => {
      this.setState((prevState) => ({
        isKeypadOpen: false,
      }));
    };

    return (
      <React.Fragment>
        <EuiHeader position="fixed" sections={[
          {
            borders: 'none',
            items: [
              <EuiHeaderLogo href={this.props.linkToHome} iconType={this.props.iconBlacksmith}></EuiHeaderLogo>,
              <EuiHideFor sizes={['xs', 's']}>
                <EuiHeaderLinks aria-label="Navigation">
                  <EuiHeaderLink href={this.props.linkToStore} isActive={this.props.activeKey === 'store'}>
                    Events & Jobs
                  </EuiHeaderLink>
                  <EuiHeaderLink href={this.props.linkToWanderer} isActive={this.props.activeKey === 'wanderer'}>
                    Migrations
                  </EuiHeaderLink>
                </EuiHeaderLinks>
              </EuiHideFor>,
            ],
          },
          {
            borders: 'none',
            items: [
              <EuiHideFor sizes={['xs', 's']}>
                <EuiHeaderLinks aria-label="Sub-Navigation">
                  <EuiHeaderLink href={this.props.linkToSources} isActive={this.props.activeKey === 'sources'}>
                    Sources
                  </EuiHeaderLink>
                  <EuiHeaderLink href={this.props.linkToDestinations} isActive={this.props.activeKey === 'destinations'}>
                    Destinations
                  </EuiHeaderLink>
                  <EuiHeaderLink href={this.props.linkToOptions} isActive={this.props.activeKey === 'options'}>
                    Configuration
                  </EuiHeaderLink>
                </EuiHeaderLinks>
                <EuiPopover
                  isOpen={this.state.isKeypadOpen}
                  anchorPosition="downLeft"
                  closePopover={closeMenu}
                  button={
                    <EuiHeaderSectionItemButton onClick={onMenuButtonClick}>
                      <EuiIcon type="apps" size="m" />
                    </EuiHeaderSectionItemButton>
                  }
                >
                  <EuiKeyPadMenu style={{ width: 'auto' }}>
                    <EuiKeyPadMenuItem label="Customer portal"
                      href={this.props.linkToPortal}
                    >
                      <EuiIcon type={this.props.iconNunchi} size="l" />
                    </EuiKeyPadMenuItem>

                    <EuiKeyPadMenuItem label="Blacksmith website"
                      href="https://nunchi.studio/blacksmith"
                      target="_blank"
                      betaBadgeLabel="External"
                      betaBadgeIconType="popout"
                    >
                      <EuiIcon type={this.props.iconBlacksmith} size="l" />
                    </EuiKeyPadMenuItem>

                    <EuiKeyPadMenuItem label="Support and services"
                      href="https://nunchi.studio/support"
                      target="_blank"
                      betaBadgeLabel="External"
                      betaBadgeIconType="popout"
                    >
                      <EuiIcon type="securitySignalResolved" size="l" />
                    </EuiKeyPadMenuItem>

                    <EuiKeyPadMenuItem label="Create a new ticket"
                      href="https://nunchi.studio/blacksmith/forms/tickets"
                      target="_blank"
                      betaBadgeLabel="External"
                      betaBadgeIconType="popout"
                    >
                      <EuiIcon type="help" size="l" />
                    </EuiKeyPadMenuItem>
                  </EuiKeyPadMenu>
                </EuiPopover>
              </EuiHideFor>,
              <EuiShowFor sizes={['xs', 's']}>
                <EuiHeaderLinks aria-label="Sub-Navigation">
                  <EuiHeaderLink href={this.props.linkToStore} isActive={this.props.activeKey === 'store'}>
                    Events & Jobs
                  </EuiHeaderLink>
                  <EuiHeaderLink href={this.props.linkToWanderer} isActive={this.props.activeKey === 'wanderer'}>
                    Migrations
                  </EuiHeaderLink>
                  <EuiHeaderLink href={this.props.linkToSources} isActive={this.props.activeKey === 'sources'}>
                    Sources
                  </EuiHeaderLink>
                  <EuiHeaderLink href={this.props.linkToDestinations} isActive={this.props.activeKey === 'destinations'}>
                    Destinations
                  </EuiHeaderLink>
                  <EuiHeaderLink href={this.props.linkToOptions} isActive={this.props.activeKey === 'options'}>
                    Configuration
                  </EuiHeaderLink>
                </EuiHeaderLinks>
              </EuiShowFor>
            ],
          },
        ]} />

        <EuiSpacer size="xxl" />
        <EuiSpacer size="xxl" />

        {this.props.children}

        <EuiSpacer size="xxl" />
      </React.Fragment>
    );
  };
};
