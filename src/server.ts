import fastify from "fastify"; 
import { knex } from "./database";
import crypto from "node:crypto";

const app = fastify();

app.get("/hello", async () => {
	const transtaction = await knex("transations")
		.insert({
			id:crypto.randomUUID(),
			title: "Transacao de teste",
			amount:1000,
		})
		.returning("*");

	return transtaction;
});

app
	.listen({
		port:3333,
	})
	.then(()=>{
		console.log("HTTP Server running!");
	});