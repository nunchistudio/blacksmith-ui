import { sources } from '../../data/sources';

export default {
  'Overview': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: sources.filled,
        });
      });
    },
  },

  'WhenLoading': {
    get: (path) => {
      return new Promise((resolve, reject) => {});
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
