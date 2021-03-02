import { triggerModeCRON, triggerModeHTTP } from '../../data/sources';

export default {
  'Overview': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: triggerModeCRON.filled,
        });
      });
    },
  },

  'WithSemaphoreApplicable': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: triggerModeCRON.filled,
        });
      });
    },
  },

  'WithSemaphoreNotApplicable': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: triggerModeHTTP.filled,
        });
      });
    },
  },

  'WithNoSemaphore': {
    get: (path) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: triggerModeCRON.empty,
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
