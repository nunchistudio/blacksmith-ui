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

  'WithSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: sources.filled,
        });
      });
    },
  },

  'WithNoSuggestions': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: sources.empty,
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
