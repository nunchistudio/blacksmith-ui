import React from 'react';
import PropTypes from 'prop-types';

import qs from 'qs';
import {
  EuiFlexGroup, EuiFlexGrid, EuiFlexItem,
  EuiTitle, EuiText, EuiButton,
  EuiForm, EuiBasicTable,
  EuiAccordion, EuiIcon, EuiTextColor,
  EuiSpacer,
} from '@elastic/eui';

import {
  FiltersViewBy,
  FiltersSourcesName, FiltersSourcesTrigger, FiltersSourcesVersion,
  FiltersEventsReceived,
  FiltersDestinationsName, FiltersDestinationsAction, FiltersDestinationsVersion,
  FiltersJobsStatus, FiltersJobsCreation, FiltersJobsAttempts,
} from '../../atoms/store';

import { columns } from './_shared';

/**
 * Labels to display useful information in the form based on the active view.
 */
const labels = {
  'events': {
    'events': 'Retrieve events from specific filters.',
    'jobs': 'Retrieve events from filters applied on their related jobs.',
  },
  'jobs': {
    'events': 'Retrieve jobs from filters applied on their related events.',
    'jobs': 'Retrieve jobs from specific filters.',
  },
};

/**
 * Scene component to retrieve events and jobs from the Blacksmith store.
 *
 * This scene requests the Blacksmith API and handles errors when necessary.
 *
 * **Import:**
 *
 * ```js
 * import { Store } from '@nunchistudio/blacksmith-eui';
 * ```
 */
export class Store extends React.Component {
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
     * Front-end route to access the event ID.
     *
     * **Route params:**
     *
     *   - `:event_id`: Unique ID of the event.
     */
    linkToEvent: PropTypes.string,

    /**
     * Front-end route to access a job ID.
     *
     * **Route params:**
     *
     *   - `:job_id`: Unique ID of the job.
     */
    linkToJob: PropTypes.string,

    /**
     * Front-end route to access the source.
     *
     * **Route params:**
     *
     *   - `:source_name`: Name of the source.
     */
    linkToSource: PropTypes.string,

    /**
     * Front-end route to access the destination.
     *
     * **Route params:**
     *
     *   - `:destination_name`: Name of the destination.
     */
    linkToDestination: PropTypes.string,
  };

  /**
   * Default values for the properties.
   */
  static defaultProps = {
    linkToEvent: '/admin/store/event.html?id=:event_id',
    linkToJob: '/admin/store/job.html?id=:job_id',
    linkToSource: '/admin/source.html?name=:source_name',
    linkToDestination: '/admin/destination.html?name=:destination_name',
  };

  /**
   * Default component state.
   */
  state = {
    isLoading: false,
    isSuccess: false,
    response: {
      meta: {
        pagination: {},
        where: {},
      },
      data: [],
    },
    view: 'events',
    filters: {
      findBy: 'events',
    },
    canSubmit: true,
    isInvalid: {},
    params: {},
    data: {
      sources: [],
      destinations: [],
    },
    pagination: {
      pageIndex: 0,
      pageSize: 100,
      totalItemCount: 0,
      pageSizeOptions: [100, 250, 500, 1000],
      hidePerPageOptions: false,
    },
  };

  /**
   * Make a request to the Blacksmith API.
   */
  async request() {
    let response = {};
    try {
      response = await this.props.axios.get(`/store/${this.state.view}`, {
        params: { ...this.state.params,
          'limit': this.state.pagination.pageSize,
          'offset': this.state.pagination.pageSize * this.state.pagination.pageIndex,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, {
            arrayFormat: 'repeat',
          });
        },
      });
    } catch (error) {
      this.setState((prevState) => ({ ...prevState,
        isLoading: false,
        isSuccess: false,
      }));

      return;
    }

    if (response.data.data === null) {
      response.data.data = [];
    }

    this.setState((prevState) => ({ ...prevState,
      isLoading: false,
      isSuccess: true,
      response: response.data,
      pagination: { ...prevState.pagination,
        pageIndex: response.data.meta.pagination.current - 1,
        pageSize: response.data.meta.where.limit,
        totalItemCount: response.data.meta.count,
      },
    }));
  };

  /**
   * Render the component.
   */
  render() {
    const applyFilters = (isInvalid, newFilters, newParams, newData) => {
      const data = {
        sources: this.state.data.sources,
        destinations: this.state.data.destinations,
      };

      if (newData) {
        if (newData.sources) {
          data.sources = newData.sources;
        }

        if (newData.destinations) {
          data.destinations = newData.destinations;
        }
      }

      let canSubmit = true;
      const allIsInvalid = Object.assign(this.state.isInvalid, isInvalid);
      Object.keys(allIsInvalid).forEach((key) => {
        if (allIsInvalid[key] === true) {
          canSubmit = false;
          return;
        }
      });

      this.setState((prevState) => ({ ...prevState,
        filters: Object.assign(prevState.filters, newFilters),
        params: Object.assign(prevState.params, newParams),
        isInvalid: Object.assign(prevState.isInvalid, isInvalid),
        data: data,
        canSubmit: canSubmit,
      }));
    };

    const onTableChange = ({ page = {} }) => {
      this.setState((prevState) => ({ ...prevState,
        isLoading: true,
        isSuccess: false,
        response: {
          meta: {
            pagination: {},
            where: {},
          },
          data: [],
        },
        pagination: { ...prevState.pagination,
          pageIndex: page.index,
          pageSize: page.size,
        },
      }), this.request);
    };

    const clickOnApply = async () => {
      this.setState((prevState) => ({ ...prevState,
        isLoading: true,
        isSuccess: false,
        view: prevState.filters.findBy,
        response: {
          meta: {
            pagination: {},
            where: {},
          },
          data: [],
        },
        pagination: { ...prevState.pagination,
          pageIndex: 0,
          totalItemCount: 0,
        },
      }), this.request);
    };

    return (
      <React.Fragment>
        <EuiForm component="form">
          <EuiFlexGrid columns={3} gutterSize="xl" className="wrapped">
            <EuiFlexItem grow={true}>
              <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
                <EuiFlexItem grow={false}>
                  <EuiIcon style={{ marginLeft: '1.95em' }} type="inspect" size="l" />
                </EuiFlexItem>

                <EuiFlexItem>
                  <EuiTitle size="xs">
                    <h3>View</h3>
                  </EuiTitle>
                  <EuiText size="s">
                    <p>
                      <EuiTextColor color="subdued">
                        What are you looking for?
                      </EuiTextColor>
                    </p>
                  </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>

            <FiltersViewBy onFiltersUpdate={applyFilters} />
          </EuiFlexGrid>

          <EuiFlexGroup gutterSize="xl" className="wrapped" style={{ marginTop: '-15px' }}>
            <EuiFlexItem grow={true}>
              <EuiAccordion id="filters_events" key="filters_events"
                paddingSize="xl"
                className="euiAccordionForm"
                buttonClassName="euiAccordionForm__button"
                buttonContent={
                  <>
                    <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
                      <EuiFlexItem grow={false}>
                        <EuiIcon type="logstashInput" size="l" />
                      </EuiFlexItem>

                      <EuiFlexItem>
                        <EuiTitle size="xs">
                          <h3>Filters at the event level</h3>
                        </EuiTitle>
                        <EuiText size="s">
                          <p>
                            <EuiTextColor color="subdued">
                              {labels[this.state.filters.findBy]['events']}
                            </EuiTextColor>
                          </p>
                        </EuiText>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </>
                }>
                <EuiFlexGrid columns={3} gutterSize="xl">
                  <FiltersSourcesName findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters}
                    axios={this.props.axios} />

                  <FiltersSourcesTrigger findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters}
                    axios={this.props.axios}
                    sources={this.state.data.sources} />

                  <FiltersSourcesVersion findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters}
                    sources={this.state.data.sources} />

                  <FiltersEventsReceived findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters} />
                </EuiFlexGrid>
              </EuiAccordion>

              <EuiAccordion id="filters_jobs" key="filters_jobs"
                paddingSize="xl"
                className="euiAccordionForm"
                buttonClassName="euiAccordionForm__button"
                buttonContent={
                  <>
                    <EuiFlexGroup gutterSize="l" alignItems="center" responsive={false}>
                      <EuiFlexItem grow={false}>
                        <EuiIcon type="logstashOutput" size="l" />
                      </EuiFlexItem>

                      <EuiFlexItem>
                        <EuiTitle size="xs">
                          <h3>Filters at the job level</h3>
                        </EuiTitle>
                        <EuiText size="s">
                          <p>
                            <EuiTextColor color="subdued">
                              {labels[this.state.filters.findBy]['jobs']}
                            </EuiTextColor>
                          </p>
                        </EuiText>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </>
                }
              >
                <EuiFlexGrid columns={3} gutterSize="xl">
                  <FiltersDestinationsName findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters}
                    axios={this.props.axios} />

                  <FiltersDestinationsAction findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters}
                    axios={this.props.axios}
                    destinations={this.state.data.destinations} />

                  <FiltersDestinationsVersion findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters}
                    destinations={this.state.data.destinations} />

                  <FiltersJobsCreation findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters} />

                  <FiltersJobsAttempts findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters} />

                  <FiltersJobsStatus findBy={this.state.filters.findBy} onFiltersUpdate={applyFilters} />
                </EuiFlexGrid>
              </EuiAccordion>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup gutterSize="xl" className="wrapped">
            <EuiFlexItem grow={false}>
              <EuiButton iconSide="left"
                isLoading={this.state.isLoading}
                isDisabled={!this.state.canSubmit}
                onClick={clickOnApply}
              >
                {this.state.isLoading ? 'Searching' : 'Apply & Search'}
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>

        <EuiSpacer size="xl" />

        <EuiFlexGroup gutterSize="xl" className="wrapped">
          <EuiFlexItem grow={true}>
            <EuiBasicTable responsive={true} loading={this.state.isLoading}
              itemId="id"
              columns={columns[this.state.view](this.props)}
              items={this.state.response.data}
              pagination={this.state.pagination}
              onChange={onTableChange}
              noItemsMessage={this.state.isLoading
                ? `Searching for ${this.state.view}...`
                : `No ${this.state.view} found` }
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  };
};
