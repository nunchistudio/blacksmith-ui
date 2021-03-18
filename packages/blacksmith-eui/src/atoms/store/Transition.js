import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiComment, EuiCodeBlock, EuiIcon,
} from '@elastic/eui';

import { formatDate } from '@elastic/eui/lib/services/format';

/**
 * Atom component to display a status (also known as a "transition") of a job.
 */
export class Transition extends React.Component {
  constructor(props) {
    super(props);
  };

  /**
   * Properties needed for using the component.
   */
  static propTypes = {

    /**
     * The transition object of a job to display.
     */
    transition: PropTypes.object.isRequired,
  };

  /**
   * Render the component.
   */
  render() {
    const transition = this.props.transition;

    switch (transition.state_after) {
      case 'acknowledged':
        return (
          <EuiComment username="Job" event="is acknowledged,"
            type="update"
            key={transition.id}
            timestamp={formatDate(transition.created_at, 'longDateTime')}
            timelineIcon={
              <div className="euiCommentTimeline__icon--default euiCommentTimeline__icon--update">
                <EuiIcon size="s" type="partial" color="#D3DAE6" />
              </div>
            }
          />
        );

      case 'awaiting':
        return (
          <EuiComment username="Job" event="is awaiting,"
            type="update"
            key={transition.id}
            timestamp={formatDate(transition.created_at, 'longDateTime')}
            timelineIcon={
              <div className="euiCommentTimeline__icon--default euiCommentTimeline__icon--update">
                <EuiIcon size="s" type="clock" color="#98A2B3" />
              </div>
            }
          />
        );

      case 'executing':
        return (
          <EuiComment username="Job" event="is executing,"
            type="update"
            key={transition.id}
            timestamp={formatDate(transition.created_at, 'longDateTime')}
            timelineIcon={
              <div className="euiCommentTimeline__icon--default euiCommentTimeline__icon--update">
                <EuiIcon size="s" type="bullseye" color="#006BB4" />
              </div>
            }
          />
        );

      case 'succeeded':
        return (
          <EuiComment username="Job" event="has succeeded,"
            type="update"
            key={transition.id}
            timestamp={formatDate(transition.created_at, 'longDateTime')}
            timelineIcon={
              <div className="euiCommentTimeline__icon--default euiCommentTimeline__icon--update">
                <EuiIcon size="m" type="check" color="#017D73" />
              </div>
            }
          />
        );

      case 'failed':
        return (
          <EuiComment username="Job" event="has failed,"
            type="regular"
            key={transition.id}
            timestamp={formatDate(transition.created_at, 'longDateTime')}
            timelineIcon={
              <div className="euiCommentTimeline__icon--default euiCommentTimeline__icon--update">
                <EuiIcon size="m" type="alert" color="#F5A700" />
              </div>
            }
          >
            <EuiCodeBlock isCopyable language="json">
              {transition.error == null && 'null'}
              {transition.error != null && JSON.stringify(JSON.parse(transition.error.message), null, 2)}
            </EuiCodeBlock>
          </EuiComment>
        );

      case 'discarded':
        return (
          <EuiComment username="Job" event="is discarded,"
            type="regular"
            key={transition.id}
            timestamp={formatDate(transition.created_at, 'longDateTime')}
            timelineIcon={
              <div className="euiCommentTimeline__icon--default euiCommentTimeline__icon--update">
                <EuiIcon size="m" type="cross" color="#BD271E" />
              </div>
            }
          >
            <EuiCodeBlock isCopyable language="json">
              {transition.error == null && 'null'}
              {transition.error != null && JSON.stringify(JSON.parse(transition.error.message), null, 2)}
            </EuiCodeBlock>
          </EuiComment>
        );

      default:
        return (
          <EuiComment username="Job" event="status is unknown,"
            type="update"
            key={transition.id}
            timestamp={formatDate(transition.created_at, 'longDateTime')}
            timelineIcon={
              <div className="euiCommentTimeline__icon--default euiCommentTimeline__icon--update">
                <EuiIcon size="m" type="dot" color="#000000" />
              </div>
            }
          />
        );
    };
  };
};
