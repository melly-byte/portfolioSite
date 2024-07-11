import * as ddb from '@aws-appsync/utils/dynamodb';

export function request(ctx) {
    return ddb.get({ key: { itemHash: ctx.arguments.itemHash}})
}
export const response = (ctx) => ctx.result;