import fastify from "fastify";
import { knex } from "./database";
import { env } from "./env";

const app = fastify();

app.get("/hello", async () => {
	const transtactions = await knex("transations")
		.where("amount", 1000)
		.select("*");

	return transtactions;
});

app
	.listen({
		port:env.PORT,
	})
	.then(()=>{
		console.log("HTTP Server running!");
	});