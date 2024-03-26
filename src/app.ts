import fastify from "fastify";
import cookie from "@fastify/cookie";


import { transationsRoutes } from "./routes/transations";

export const app = fastify();

app.register(cookie);

app.addHook("preHandler", async (request, reply) =>{
	console.log(`[${request.method}] ${request.url}`);
});

app.register(transationsRoutes, {
	prefix: "transations",
});