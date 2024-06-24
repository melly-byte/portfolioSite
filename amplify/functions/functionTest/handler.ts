import { APIGatewayProxyHandler, Handler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
    //return "Hello World!";

    console.log("event", event);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify("Hello World!"),
    };
};
