# aws-iot-core-js-mqtt-wss-demo
A demo showcasing how to connect to the AWS IoT Core message broker from a JS app running on the browser, using MQTT over WSS and temporary credentials provided by Amazon Cognito Identity Pools.

**Important:** this demo uses _unauthenticated identites_. In a real production application you probably want to use _authenticated identities_ and to follow the principle of least privilege. This repository is only intended for demonstration purposes.

## Prerequisites

This demo requires a Cognito Identity Pool configured with an IAM role for unauthenticated identities. The IAM role must allow access to IoT Core.

## How to use

Run the following commands in your terminal:

```
git clone https://github.com/carlosafonso/aws-iot-core-js-mqtt-wss-demo.git

cd aws-iot-core-js-mqtt-wss-demo

npm install

npm run build

npx serve
```

Then visit `localhost:5000` and follow the instructions.
