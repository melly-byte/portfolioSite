import { defineFunction } from "@aws-amplify/backend";
//Dev environment import //

export const destinyApiProxy = defineFunction({

    environment: {
        BUNGIE_API_KEY: process.env.BUNGIE_API_KEY as string,
        DEST_MEMBER_ID: process.env.DEST_MEMBER_ID as string,
        HUNTER_CHAR_ID: process.env.HUNTER_CHAR_ID as string,
        /* Dev Environment Variables //
        BUNGIE_API_KEY: environment.BUNGIE_API_KEY,
        DEST_MEMBER_ID: environment.DEST_MEMBER_ID,
        HUNTER_CHAR_ID: environment.HUNTER_CHAR_ID,
        */
    },
    name: 'destinyApiService',
    entry: './handler.ts'
});
