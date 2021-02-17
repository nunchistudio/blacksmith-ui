export const destination = {
  empty: {
    "statusCode": 200,
    "message": "Successful",
    "data": {
      "name": "destination-one",
      "options": {
        "versions": {
          "2020-10-27": "0001-01-01T00:00:00Z",
          "2019-08-14": "2021-01-27T00:00:00Z"
        },
        "default_version": "2020-10-27",
        "schedule": {
          "realtime": true,
          "interval": "@every 10s",
          "max_retries": 50
        }
      },
      "actions": []
    }
  },

  filled: {
    "statusCode": 200,
    "message": "Successful",
    "data": {
      "name": "destination-one",
      "options": {
        "versions": {
          "2020-10-27": "0001-01-01T00:00:00Z",
          "2019-08-14": "2021-01-27T00:00:00Z"
        },
        "default_version": "2020-10-27",
        "schedule": {
          "realtime": true,
          "interval": "@every 10s",
          "max_retries": 50
        }
      },
      "actions": [
        {
          "name": "action-one",
          "schedule": null
        },
        {
          "name": "action-two",
          "schedule": {
            "realtime": false,
            "interval": "@every 12h",
            "max_retries": 10
          }
        },
      ]
    }
  },
};

export const destinations = {
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
        "name": "destination-one",
        "options": {
          "versions": {
            "2020-10-27": "0001-01-01T00:00:00Z",
            "2019-08-14": "2021-01-27T00:00:00Z"
          },
          "default_version": "2020-10-27",
          "schedule": {
            "realtime": true,
            "interval": "@every 10s",
            "max_retries": 10
          }
        }
      },
      {
        "name": "destination-two",
        "options": {
          "versions": {
            "2020-10-27": "0001-01-01T00:00:00Z",
            "2019-08-14": "2021-01-27T00:00:00Z"
          },
          "default_version": "2020-10-27",
          "schedule": {
            "realtime": false,
            "interval": "@every 1h",
            "max_retries": 50
          }
        }
      },
      {
        "name": "destination-three",
        "options": {
          "schedule": {
            "realtime": false,
            "interval": "@every 6h",
            "max_retries": 20
          }
        }
      }
    ]
  },
};
