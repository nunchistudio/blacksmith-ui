export const options = {
  "statusCode": 200,
  "message": "Successful",
  "data": {
    "supervisor": {
      "from": "consul"
    },
    "wanderer": {
      "from": "postgres"
    },
    "store": {
      "from": "postgres"
    },
    "pubsub": {
      "from": "nats",
      "topic": "blacksmith",
      "subscription": "blacksmith"
    },
    "gateway": {
      "address": ":9090",
      "admin": {
        "enabled": false,
        "dashboard": false
      }
    },
    "scheduler": {
      "address": ":9091",
      "admin": {
        "enabled": true,
        "dashboard": true
      }
    },
    "blacksmith": {
      "version": "0.15.1"
    },
    "go": {
      "version": "1.16",
      "environment": "darwin/amd64"
    }
  }
};
