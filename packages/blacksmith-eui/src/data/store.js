export const events = {
  empty: {
    "statusCode": 200,
    "message": "Successful",
    "meta": {
      "count": 0,
      "pagination": {
        "current": 1,
        "previous": null,
        "next": null,
        "first": 1,
        "last": 1
      },
      "where": {
        "offset": 0,
        "limit": 100
      }
    },
    "data": []
  },

  filled: {
    "statusCode": 200,
    "message": "Successful",
    "meta": {
      "count": 776,
      "pagination": {
        "current": 1,
        "previous": null,
        "next": 2,
        "first": 1,
        "last": 8
      },
      "where": {
        "offset": 0,
        "limit": 100
      }
    },
    "data": [
      {
        "id": "1mxubDPc6cDcix4MJ5fUtJbu0jd",
        "source": "source-one",
        "trigger": "trigger-one",
        "version": "2020-10-27",
        "jobs": [
          {
            "id": "1mxubEivyP6jQfyTv6RlWKKMFRk",
            "destination": "destination-one",
            "action": "action-three",
            "version": "2020-10-27",
            "transitions": [
              {
                "id": "1mxubDvpIkvK4HgZjYiPjKZ7jKp",
                "attempt": 1,
                "state_before": "executing",
                "state_after": "failed",
                "error": {
                  "statusCode": 401,
                  "message": "Not authorized",
                  "validations": [
                    {
                      "message": "Email address not authorized",
                      "path": [
                        "request",
                        "payload",
                        "data",
                        "email"
                      ]
                    }
                  ]
                },
                "created_at": "2021-01-12T10:33:52.059767Z",
                "event_id": "1mxubDPc6cDcix4MJ5fUtJbu0jd",
                "job_id": "1mxubEivyP6jQfyTv6RlWKKMFRk"
              }
            ],
            "created_at": "2021-01-12T10:33:52.023127Z",
            "event_id": "1mxubDPc6cDcix4MJ5fUtJbu0jd",
            "parent_job_id": ""
          }
        ],
        "received_at": "2021-01-12T10:33:52.001827Z",
        "ingested_at": "2021-01-12T10:33:52.011251Z"
      },
      {
        "id": "1mxubEVrIegfBbIsQk7uLjot3S3",
        "source": "source-two",
        "trigger": "trigger-one",
        "version": "2020-10-27",
        "jobs": [
          {
            "id": "1mxubEVfOlC2EKzLGH0EVwwsmW0",
            "destination": "destination-one",
            "action": "action-three",
            "version": "2020-10-27",
            "transitions": [
              {
                "id": "1mxubIzI5Fpu3zW4hfuPFcxbWaS",
                "attempt": 1,
                "state_before": "executing",
                "state_after": "failed",
                "error": {
                  "statusCode": 401,
                  "message": "Not authorized",
                  "validations": [
                    {
                      "message": "Email address not authorized",
                      "path": [
                        "request",
                        "payload",
                        "data",
                        "email"
                      ]
                    }
                  ]
                },
                "created_at": "2021-01-12T10:33:52.087749Z",
                "event_id": "1mxubEVrIegfBbIsQk7uLjot3S3",
                "job_id": "1mxubEVfOlC2EKzLGH0EVwwsmW0"
              }
            ],
            "created_at": "2021-01-12T10:33:52.059609Z",
            "event_id": "1mxubEVrIegfBbIsQk7uLjot3S3",
            "parent_job_id": ""
          }
        ],
        "received_at": "2021-01-12T10:33:52.001625Z",
        "ingested_at": "2021-01-12T10:33:52.043896Z"
      }
    ]
  },
};

export const event = {
  empty: {
    "statusCode": 200,
    "message": "Successful",
    "data": {
      "id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
      "source": "source-one",
      "trigger": "trigger-two",
      "version": "2020-10-27",
      "context": {
        "ip": "127.0.0.1",
        "language": "fr-FR",
        "country": "France"
      },
      "data": {
        "first_name": "John",
        "last_name": "Doe"
      },
      "jobs": [],
      "received_at": "2021-01-13T14:07:56.929478Z",
      "ingested_at": "2021-01-13T14:07:56.930742Z"
    }
  },

  filled: {
    "statusCode": 200,
    "message": "Successful",
    "data": {
      "id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
      "source": "source-one",
      "trigger": "trigger-two",
      "version": "2020-10-27",
      "context": {
        "ip": "127.0.0.1",
        "language": "fr-FR",
        "country": "France"
      },
      "data": {
        "first_name": "John",
        "last_name": "Doe"
      },
      "jobs": [
        {
          "id": "1n19l2sbZCqAhKpQrZAGRB2rG08",
          "destination": "destination-two",
          "action": "action-three",
          "version": "2020-10-27",
          "context": {
            "language": "fr-FR",
            "country": "France"
          },
          "data": {
            "name": "John DOE"
          },
          "transitions": [
            {
              "id": "1n1AmVOlNmGyMWniPWbRsvqO042",
              "attempt": 3,
              "state_before": "executing",
              "state_after": "succeeded",
              "created_at": "2021-01-13T14:16:21.628794Z",
              "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
              "job_id": "1n19l2sbZCqAhKpQrZAGRB2rG08"
            }
          ],
          "created_at": "2021-01-13T14:07:56.929968Z",
          "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
          "parent_job_id": ""
        }
      ],
      "received_at": "2021-01-13T14:07:56.929478Z",
      "ingested_at": "2021-01-13T14:07:56.930742Z"
    }
  },
};

export const jobs = {
  empty: {
    "statusCode": 200,
    "message": "Successful",
    "meta": {
      "count": 0,
      "pagination": {
        "current": 1,
        "previous": null,
        "next": null,
        "first": 1,
        "last": 1
      },
      "where": {
        "offset": 0,
        "limit": 100
      }
    },
    "data": []
  },

  filled: {
    "statusCode": 200,
    "message": "Successful",
    "meta": {
      "count": 1440,
      "pagination": {
        "current": 1,
        "previous": null,
        "next": 2,
        "first": 1,
        "last": 15
      },
      "where": {
        "offset": 0,
        "limit": 100
      }
    },
    "data": [
      {
        "id": "1mxubEivyP6jQfyTv6RlWKKMFRk",
        "destination": "destination-one",
        "action": "action-three",
        "version": "2020-10-27",
        "transitions": [
          {
            "id": "1mxubDvpIkvK4HgZjYiPjKZ7jKp",
            "attempt": 1,
            "state_before": "executing",
            "state_after": "failed",
            "error": {
              "statusCode": 401,
              "message": "Not authorized",
              "validations": [
                {
                  "message": "Email address not authorized",
                  "path": [
                    "request",
                    "payload",
                    "data",
                    "email"
                  ]
                }
              ]
            },
            "created_at": "2021-01-12T10:43:45.059767Z",
            "event_id": "1mxubDPc6cDcix4MJ5fUtJbu0jd",
            "job_id": "1mxubEivyP6jQfyTv6RlWKKMFRk"
          }
        ],
        "created_at": "2021-01-12T10:43:45.023127Z",
        "event_id": "1mxubDPc6cDcix4MJ5fUtJbu0jd",
        "parent_job_id": ""
      },
      {
        "id": "1mxubEVfOlC2EKzLGH0EVwwsmW0",
        "destination": "destination-one",
        "action": "action-three",
        "version": "2020-10-27",
        "transitions": [
          {
            "id": "1mxubIzI5Fpu3zW4hfuPFcxbWaS",
            "attempt": 1,
            "state_before": "executing",
            "state_after": "succeeded",
            "created_at": "2021-01-12T10:33:52.087749Z",
            "event_id": "1mxubEVrIegfBbIsQk7uLjot3S3",
            "job_id": "1mxubEVfOlC2EKzLGH0EVwwsmW0"
          }
        ],
        "created_at": "2021-01-12T10:33:52.059609Z",
        "event_id": "1mxubEVrIegfBbIsQk7uLjot3S3",
        "parent_job_id": ""
      }
    ]
  },
};

export const job = {
  filled: {
    "statusCode": 200,
    "message": "Successful",
    "data": {
      "id": "1n19l2sbZCqAhKpQrZAGRB2rG08",
      "destination": "destination-two",
      "action": "action-three",
      "version": "2020-10-27",
      "context": {
        "language": "fr-FR",
        "country": "France"
      },
      "data": {
        "name": "John DOE"
      },
      "transitions": [
        {
          "id": "1n1AmVOlNmGyMWniPWbRsvqO042",
          "attempt": 2,
          "state_before": "executing",
          "state_after": "succeeded",
          "created_at": "2021-01-13T14:16:21.628794Z",
          "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
          "job_id": "1n19l2sbZCqAhKpQrZAGRB2rG08"
        }
      ],
      "created_at": "2021-01-13T14:07:56.929968Z",
      "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
      "parent_job_id": ""
    }
  },
};

export const transitions = {
  filled: {
    "statusCode": 200,
    "message": "Successful",
    "data": [
      {
        "id": "1nIRKor7CoTalUEDCGkHYLT63eC",
        "attempt": 2,
        "state_before": "executing",
        "state_after": "succeeded",
        "created_at": "2021-01-19T13:45:22.059208Z",
        "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
        "job_id": "1n19l2sbZCqAhKpQrZAGRB2rG08"
      },
      {
        "id": "1nIRKnvA3CgqVlS7sLqDWriSCiv",
        "attempt": 2,
        "state_before": "failed",
        "state_after": "executing",
        "created_at": "2021-01-19T13:45:21.059208Z",
        "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
        "job_id": "1n19l2sbZCqAhKpQrZAGRB2rG08"
      },
      {
        "id": "1nIRKo6iq3xg2pKTkOKyKtFnKzy",
        "attempt": 1,
        "state_before": "executing",
        "state_after": "failed",
        "error": {
          "statusCode": 429,
          "message": "Too many requests",
          "validations": [
            {
              "message": "Request-rate limit exceeded",
            }
          ]
        },
        "created_at": "2021-01-19T13:35:21.059208Z",
        "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
        "job_id": "1n19l2sbZCqAhKpQrZAGRB2rG08"
      },
      {
        "id": "1nIRKplQcgrKTSnWH0UMJNW29Ze",
        "attempt": 1,
        "state_before": "acknowledged",
        "state_after": "executing",
        "created_at": "2021-01-19T13:35:20.059208Z",
        "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
        "job_id": "1n19l2sbZCqAhKpQrZAGRB2rG08"
      },
      {
        "id": "1nIRKjzGCWfKphRtEFTFP9YDOF6",
        "attempt": 0,
        "state_before": null,
        "state_after": "acknowledged",
        "created_at": "2021-01-19T13:35:20.059208Z",
        "event_id": "1n19l3OSbhUMtjMlkZnxiR3I9KZ",
        "job_id": "1n19l2sbZCqAhKpQrZAGRB2rG08"
      },
    ]
  },
};
