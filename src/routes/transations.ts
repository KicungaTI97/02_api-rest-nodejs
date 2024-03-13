import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod"; 
import { randomUUID } from "crypto";

export async function transationsRoutes(app: FastifyInstance){
	app.post("/", async (request, reply) => {
		//{title, amount, type: credit ou debit}

		const createTransationBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(["credit", "debit"]),
		});

		const {title, amount, type} = createTransationBodySchema.parse(
			request.body,
		);

		await knex("transations").insert({
			id:randomUUID(),
			title,
			amount: type === "credit" ? amount : amount * -1,
		});
			
  
		return reply.status(201).send();
	});
}