import { util } from '@aws-appsync/utils';

export function request(ctx) {

    return {
        operation: 'BatchGetItem',
        tables: {
            destiny2TableItems: {
                keys: ctx.args.itemHashes.map((itemHash) => util.dynamodb.toMapValues({ itemHash })),
            }
        }
    }
}
export const response = (ctx) => { return ctx.result.data.destiny2TableItems }