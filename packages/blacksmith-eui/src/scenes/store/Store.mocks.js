import { events, jobs } from '../../data/store';
import { sources } from '../../data/sources';
import { destinations } from '../../data/destinations';

export default {
  'Overview': {
    get: (path) => {
      switch (path) {
        case '/sources':
          return new Promise((resolve, reject) => {
            resolve({
              data: sources.filled,
            });
          });

        case '/destinations':
          return new Promise((resolve, reject) => {
            resolve({
              data: destinations.filled,
            });
          });

        case '/store/events':
          return new Promise((resolve, reject) => {
            resolve({
              data: events.filled,
            });
          });

        case '/store/jobs':
          return new Promise((resolve, reject) => {
            resolve({
              data: jobs.filled,
            });
          });

        default:
          return new Promise((resolve, reject) => {
            resolve({
              data: events.filled,
            });
          });
      }
    },
  },

  'WhenLoading': {
    get: (path) => {
      switch (path) {
        case '/sources':
          return new Promise((resolve, reject) => {
            resolve({
              data: sources.filled,
            });
          });

        case '/destinations':
          return new Promise((resolve, reject) => {
            resolve({
              data: destinations.filled,
            });
          });

        default:
          return new Promise((resolve, reject) => {});
      }
    },
  },

  'WhenError': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        reject({
          data: null
        });
      });
    },
  },
};
