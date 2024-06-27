import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { sayHello } from './functions/functionTest/resource';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Stack } from 'aws-cdk-lib';
import { destinyApiProxy } from './functions/destiny-api-proxy/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  //data,
  storage,
  sayHello,
  destinyApiProxy,
});

//Test stack for restAPI
const sayHelloTestStack = backend.createStack("say-hello-test-stack");

const myRestApi = new LambdaRestApi(sayHelloTestStack, "RestApi", {
  handler: backend.sayHello.resources.lambda,
  proxy: false,
  defaultCorsPreflightOptions: {
    allowOrigins: ['*'],
    allowMethods: ['GET'],
    allowHeaders: ['*'],
    },
  }
);

const helloResource = myRestApi.root.addResource('hello');
helloResource.addMethod('GET');

//Stack for destinyApiProxy
const destinyApiProxyStack = backend.createStack("destiny-api-proxy-stack");

const destinyApiProxyApi = new LambdaRestApi(destinyApiProxyStack, "DestinyApiProxy", {
  handler: backend.destinyApiProxy.resources.lambda,
  proxy: false,
  defaultCorsPreflightOptions: {
    allowOrigins: ['*'],
    allowMethods: ['GET'],
    allowHeaders: ['*'],
  },
});
const destinyResource = destinyApiProxyApi.root.addResource('getCharacter');
destinyResource.addMethod('GET');
//-------------------------
backend.addOutput({
  custom: {
    API: {
      [myRestApi.restApiName]: {
        endpoint: myRestApi.url,
        region: Stack.of(myRestApi).region,
        apiName: myRestApi.restApiName,
      },
    },
    destinyApiProxy: {
      [destinyApiProxyApi.restApiName]: {
        endpoint: destinyApiProxyApi.url,
        region: Stack.of(destinyApiProxyApi).region,
        apiName: destinyApiProxyApi.restApiName
      },
    },
  },
});
