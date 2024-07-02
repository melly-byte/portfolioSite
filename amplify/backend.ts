import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { aws_dynamodb } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { destinyApiProxy } from './functions/destiny-api-proxy/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  destinyApiProxy,
});

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
//--------------------------------------------------------------------------------------------------

// Stack for Destiny2TableItems
const destiny2TableItemsStack = backend.createStack("destiny2-table-items-stack");

const externalTable = aws_dynamodb.Table.fromTableName(
  destiny2TableItemsStack,
  "ExternalDestiny2Table",
  "Destiny2TableItems"
);

//--------------------------------------------------------------------------------------------------

//Lambda output
backend.addOutput({
  custom: {
    API: {
      [destinyApiProxyApi.restApiName]: {
        endpoint: destinyApiProxyApi.url,
        region: Stack.of(destinyApiProxyApi).region,
        apiName: destinyApiProxyApi.restApiName
      },
    },
  },
});
// External Table output
backend.data.addDynamoDbDataSource("ExternalDestiny2Table", externalTable);