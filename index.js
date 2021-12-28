import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
var awsIot = require('aws-iot-device-sdk');
import awsConfig from './aws-config';

// Fetch parameters from config.
const { REGION, ENDPOINT, IDENTITY_POOL_ID } = awsConfig;

// The device client ID.
const CLIENT_ID = 'foo';

// The MQTT topic we'll be subscribing to.
const TOPIC = 'my/topic';

const mqttClient = awsIot.device({
    region: REGION,
    host: ENDPOINT,
    clientId: CLIENT_ID,

    // Connect via secure WebSocket.
    protocol: 'wss',

    // The IoT SDK uses an exponential backoff algorithm to retry connection
    // attempts. Let's set a maximum of 8 seconds to avoid waitin for too long.
    maximumReconnectTimeMs: 8000,

    // Enable console debugging information.
    debug: true,

    // Credentials are not specified for now, as we'll set them once we
    // retrieve them from Cognito.
    accessKeyId: '',
    secretKey: '',
    sessionToken: ''
 });

// Retrieve temporary credentials from the Cognito Identity Pool, then update
// the MQTT client.
//
// The `fromCognitoIdentityPool()` function returns another function that
// handles the credential retrieval logic, including making requests to
// Cognito's `GetId` and `GetCredentialsForIdentity` APIs.
//
// See "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_credential_providers.html#fromcognitoidentitypool"
// for additional details.
fromCognitoIdentityPool({
    identityPoolId: IDENTITY_POOL_ID,
    clientConfig: { region: REGION }
})().then(creds => {
    console.log('Successfully retrieved credentials from Cognito Identity Pool');
    mqttClient.updateWebSocketCredentials(
        creds.accessKeyId,
        creds.secretAccessKey,
        creds.sessionToken
    );
});

const mqttClientConnectHandler = function () {
    console.log('Event: connect');
    mqttClient.subscribe(TOPIC);
    console.log('Subscribed to ' + TOPIC);
};

const mqttClientReconnectHandler = function() {
    console.log('Event: reconnect');
};

const mqttClientMessageHandler = function(topic, payload) {
    console.log('Event: message');
    console.log('message: ' + topic + ':' + payload.toString());
};

// Install connect/reconnect event handlers.
mqttClient.on('connect', mqttClientConnectHandler);
mqttClient.on('reconnect', mqttClientReconnectHandler);
mqttClient.on('message', mqttClientMessageHandler);
