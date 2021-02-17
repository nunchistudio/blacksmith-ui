export const source = {
  empty: {
    "statusCode": 200,
    "message": "Successful",
    "data": {
      "name": "source-one",
      "options": {
        "versions": {
          "2020-10-27": "0001-01-01T00:00:00Z"
        },
        "default_version": "2020-10-27",
        "cron": {
          "interval": "@every 1h"
        }
      },
      "triggers": []
    }
  },

  filled: {
    "statusCode": 200,
    "message": "Successful",
    "data": {
      "name": "source-one",
      "options": {
        "versions": {
          "2020-10-27": "0001-01-01T00:00:00Z",
          "2019-08-14": "2021-01-27T00:00:00Z"
        },
        "default_version": "2020-10-27",
        "cron": {
          "interval": "@every 1h"
        }
      },
      "triggers": [
        {
          "name": "trigger-one",
          "mode": {
            "mode": "cron",
            "cron": {
              "interval": "@every 20s"
            }
          }
        },
        {
          "name": "trigger-two",
          "mode": {
            "mode": "http",
            "http": {
              "methods": [
                "POST"
              ],
              "path": "/endpoint",
              "show_meta": true,
              "show_data": true
            }
          }
        }
      ]
    }
  },
};

export const sources = {
  empty: {
    "statusCode": 200,
    "message": "Successful",
    "meta": {
      "count": 0
    },
    "data": []
  },

  filled: {
    "statusCode": 200,
    "message": "Successful",
    "meta": {
      "count": 2
    },
    "data": [
      {
        "name": "source-one",
        "options": {
          "versions": {
            "2020-10-27": "0001-01-01T00:00:00Z",
            "2019-08-14": "2021-01-27T00:00:00Z"
          },
          "default_version": "2020-10-27",
          "cron": {
            "interval": "@every 1h"
          }
        }
      },
      {
        "name": "source-two",
        "options": {
          "versions": {
            "2020-10-27": "0001-01-01T00:00:00Z",
            "2019-08-14": "2021-01-27T00:00:00Z"
          },
          "default_version": "2020-10-27",
          "cron": {
            "interval": "@every 24h"
          }
        }
      },
      {
        "name": "source-three",
        "options": {
          "cron": {
            "interval": "@every 30s"
          }
        }
      }
    ]
  },
};
