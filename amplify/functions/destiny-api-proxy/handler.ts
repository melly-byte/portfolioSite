/*global fetch*/
import { APIGatewayProxyHandler } from 'aws-lambda';
// Dev environment import here //
interface invItems {
    Response: {
        equipment: {
            data: {
                items: item[]
            }
        },
    }
}
interface item {
    itemHash: number,
    itemInstanceId: string,
}
export const handler: APIGatewayProxyHandler = async (event) => {

    console.log("event", event);
    console.log("oHeader", event.headers);

    try{
        const invReturn = await getCharacterInventory();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(invReturn),
        }
    } catch (error) {
        console.error('Error fetching character inventory');
    }
    return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify('Error fetching character inventory'),
    };
};

async function getCharacterInventory() {
    const apiKey = process.env.BUNGIE_API_KEY as string;
    const membershipId = process.env.DEST_MEMBER_ID as string;
    const characterId = process.env.HUNTER_CHAR_ID as string;
    /* Dev environment variables //
    const apiKey = environment.BUNGIE_API_KEY;
    const membershipId = environment.DEST_MEMBER_ID;
    const characterId = environment.HUNTER_CHAR_ID;
    */

    const path = `https://www.bungie.net/Platform/Destiny2/3/Profile/${membershipId}/Character/${characterId}/?components=205`;

    try {
        const getOp = await fetch(path, {
            method: 'GET',
            headers: {'X-API-Key': apiKey,}
        });
        return getOp.json();
    } catch (error) {
        console.error('Error fetching character inventory: ', error);
        return null;
    }
}