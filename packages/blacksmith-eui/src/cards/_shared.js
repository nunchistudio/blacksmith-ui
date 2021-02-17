import {
  EuiCode,
} from '@elastic/eui';

/**
 * Export the columns shared across all cards.
 */
export const columns = [
  {
    field: 'key',
    name: 'Option',
    render: (key, item) => {
      let parent, child;

      parent = key;
      if (key.includes(' / ')) {
        parent = key.split(' / ')[0];
        child = key.split(' / ')[1];
      }

      if (item.id.endsWith('__')) {
        return (<strong>{parent} /</strong>);
      } else if (item.id.includes('__')) {
        if (item.isKeyCode == true) {
          child = <EuiCode>{child}</EuiCode>
        }

        return (<span style={{ marginLeft: '1.5rem' }}>{child}</span>);
      }

      return (<strong>{parent}</strong>);
    },
  },
  {
    field: 'value',
    name: 'Value',
    truncateText: true,
    textOnly: true,
    render: (value, item) => {
      if (value === null) {
        return (null);
      }

      if (Array.isArray(value)) {
        return (
          <ul>
            {value && value.map((tag, i) => {
              if (item.isValueCode == true) {
                return (<li key={tag}><EuiCode>{tag}</EuiCode></li>);
              }

              return (<li key={tag}>{tag}</li>);
            })}
          </ul>
        );
      } else if (typeof value === 'object') {
        return (
          <ul>
            {value && Object.keys(value).map((k, i) => {
              if (item.isValueCode == true) {
                return (<li key={k}><EuiCode>{k}</EuiCode>: <EuiCode>{value[k]}</EuiCode></li>);
              }

              return (<li key={k}>{k}: {value[k]}</li>);
            })}
          </ul>
        );
      }

      if (value === true) {
        return ('Yes');
      } else if (value === false) {
        return ('No');
      }

      if (value === '01 January 0001 00:00:00') {
        return (<em>Not deprecated</em>);
      }

      if (item.isValueCode == true) {
        return (<EuiCode>{value.toString()}</EuiCode>);
      }

      return (value);
    },
  },
];
