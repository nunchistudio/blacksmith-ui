import { source } from '../../data/sources';

export default {
  'Overview': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: source.filled,
        });
      });
    },
  },

  'WithSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: source.filled,
        });
      });
    },
  },

  'WithNoSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: source.empty,
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
