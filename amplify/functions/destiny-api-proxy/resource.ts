import { defineFunction } from "@aws-amplify/backend";

export const destinyApiProxy = defineFunction({
    environment: {
        BUNGIE_API_KEY: process.env.BUNGIE_API_KEY as string,
        DEST_MEMBER_ID: process.env.DEST_MEMBER_ID as string,
        HUNTER_CHAR_ID: process.env.HUNTER_CHAR_ID as string,
    },
    name: 'destinyApiService',
    entry: './handler.ts'
});