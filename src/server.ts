import fastify from "fastify";

import { env } from "./env";
import { transationsRoutes } from "./routes/transations";

const app = fastify();

app.register(transationsRoutes);

app
	.listen({
		port:env.PORT,
	})
	.then(()=>{
		console.log("HTTP Server running!");
	});