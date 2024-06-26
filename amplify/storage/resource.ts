import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: 'portSiteFBucket',
    access: (allow) => ({
        'resume/*': [
            allow.guest.to(['read'])
        ],
        'destDb/*': [
            allow.guest.to(['read'])
        ]
    })
});