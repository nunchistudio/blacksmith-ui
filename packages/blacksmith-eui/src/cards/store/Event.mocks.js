import { event } from '../../data/store';

export default {
  'Overview': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: event.filled,
        });
      });
    },
  },

  'WhenLoading': {
    get: (path) => {
      return new Promise((resolve, reject) => {});
    },
  },

  'WhenNotFound': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: {
            statusCode: 200,
            data: null,
          },
        });
      });
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
