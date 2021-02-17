import { destinations } from '../../data/destinations';

export default {
  'Overview': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: destinations.filled,
        });
      });
    },
  },

  'WithSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: destinations.filled,
        });
      });
    },
  },

  'WithNoSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: destinations.empty,
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
