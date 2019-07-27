import "reflect-metadata";
import "dotenv/config";

import { GraphQLServer } from "graphql-yoga";
import { genschema } from "./utils/generateSchema";

export const startServer = async () => {
    // Graphql Server
    const server = new GraphQLServer({
        schema: genschema(),
        context: ({ request }) => ({
            url: request.protocol + "://" + request.get("host"),
            req: request
        })
    });

    // CREATE TYPEORM CONNECTION BASED ON PROCCESS.ENV{SETUP TEST DEV DB}
    // const conn: Connection =
    // 	process.env.NODE_ENV === "test"
    // 		? await createTestConn(true)
    // 		: await creatTypeormConnection();

    const app = await server.start({
        port: process.env.NODE_ENV === "test" ? 0 : 4000
    });
    console.log("Server is running on localhost:4000");
    return app;
};
