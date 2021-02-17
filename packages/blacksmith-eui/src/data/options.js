export const options = {
  "statusCode": 200,
  "message": "Successful",
  "data": {
    "supervisor": {
      "from": "consul",
      "node": {
        "name": "node-1",
        "address": "https://consul-1.example.com",
        "tags": ["blacksmith"],
        "meta": {
          "go_version": "1.15.3",
          "blacksmith_version": "0.14.0"
        }
      }
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
      "version": "0.15.0"
    },
    "go": {
      "version": "1.16",
      "environment": "darwin/amd64"
    }
  }
};
