import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod"; 
import { randomUUID } from "crypto";

export async function transationsRoutes(app: FastifyInstance){
  
	app.get("/summary", async () =>{
		const summary = await knex("transations").sum("amount", { as: "amount"}).first();

		return {summary};
	});

	app.get("/", async() =>{
		const transations = await knex("transations").select();

		return {
			transations
		};
	});

	app.get("/:id", async(request) =>{
		const getTransationsParamsSchema = z.object({
			id:z.string().uuid(),
		});
    
		const { id } = getTransationsParamsSchema.parse(request.params);

		const transations = await knex("transations").where("id", id).first();

		return{ transations };
	});

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

		let sessionId = request.cookies.sessionId;
		console.log(sessionId);
		
		if(!sessionId){
			sessionId = randomUUID();
			
			reply.cookie("sessionId", sessionId, {
				path: "/",
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias 
			});
		}

		await knex("transations").insert({
			id:randomUUID(),
			title,
			amount: type === "credit" ? amount : amount * -1,
			session_id: sessionId,
		});
			
  
		return reply.status(201).send();
	});
}