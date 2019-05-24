import { APIGatewayProxyEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";
import * as sinon from 'sinon';
import * as AWS from "aws-sdk";
import { SinonStub } from "sinon";

export const contextMock = (): Context => ({
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: 512,
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  identity: null,
  clientContext: null,
  getRemainingTimeInMillis: () => 0,
  done: () => { },
  fail: () => { },
  succeed: () => { },
});

export const apiGatewayContext = (): APIGatewayEventRequestContext => ({
  accountId: '',
  apiId: '',
  authorizer: null,
  connectedAt: null,
  connectionId: null,
  domainName: null,
  eventType: null,
  extendedRequestId: null,
  httpMethod: '',
  identity: {
    accessKey: '',
    accountId: '',
    apiKey: '',
    apiKeyId: '',
    caller: '',
    cognitoAuthenticationProvider: '',
    cognitoAuthenticationType: '',
    cognitoIdentityId: '',
    cognitoIdentityPoolId: '',
    sourceIp: '',
    user: '',
    userAgent: '',
    userArn: '',
  },
  messageDirection: null,
  messageId: null,
  path: '',
  stage: '',
  requestId: '',
  requestTime: null,
  requestTimeEpoch: 0,
  resourceId: '',
  resourcePath: '',
  routeKey: null,
})

export const apiGatewayEventMock = (): APIGatewayProxyEvent => ({
  body: '',
  httpMethod: 'GET',
  headers: {},
  queryStringParameters: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  path: '',
  pathParameters: {},
  multiValueQueryStringParameters: {},
  stageVariables: {},
  requestContext: apiGatewayContext(),
  resource: ''
});