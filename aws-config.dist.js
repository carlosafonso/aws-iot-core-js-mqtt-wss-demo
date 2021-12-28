const awsConfig = {
    // The AWS region to use.
    REGION: 'eu-west-1',

    // The AWS IoT Core endpoint (can be obtained from "https://console.aws.amazon.com/iot/home#/settings")
    ENDPOINT: 'abcdefg1234567-ats.iot.eu-west-1.amazonaws.com',

    // The ID of the Cognito Identitiy Pool, used to retrieve temporary AWS
    // credentials to call the AWS IoT Core message broker.
    IDENTITY_POOL_ID: 'eu-west-1:aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
};

export default awsConfig;
