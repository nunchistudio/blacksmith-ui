import { destination } from '../../data/destinations';

export default {
  'Overview': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: destination.filled,
        });
      });
    },
  },

  'WithSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: destination.filled,
        });
      });
    },
  },

  'WithNoSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: destination.empty,
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
