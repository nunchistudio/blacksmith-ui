import { job, transitions } from '../../data/store';

export default {
  'Overview': {
    get: (path) => {
      switch (path) {
        case '/store/jobs/1myVQXY2oD67WaKw7TNOne6nALk':
          return new Promise((resolve, reject) => {
            resolve({
              data: job.filled,
            });
          });

        case '/store/jobs/1myVQXY2oD67WaKw7TNOne6nALk/transitions':
          return new Promise((resolve, reject) => {
            resolve({
              data: transitions.filled,
            });
          });

        };
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
