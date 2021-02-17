import { options } from '../../data/options';

export default {
  'Overview': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: options,
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
