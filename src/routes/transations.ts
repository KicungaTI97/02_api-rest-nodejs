import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod"; 
import { randomUUID } from "crypto";
import { check_session_id_exists } from "../middlewares/check-session-id-exists";


export async function transationsRoutes(app: FastifyInstance){
  
	app.get("/summary",
		{
			preHandler: [check_session_id_exists]
		},
		async (request) =>{
			const {sessionId} = request.cookies;

			const summary = await knex("transations")
				.where("session_id", sessionId)
				.sum("amount", { as: "amount"})
				.first();

			return {summary};
		});

	app.get("/",
		{
			preHandler: [check_session_id_exists]
		},
		async(request, reply) =>{
		
			const { sessionId } = request.cookies;

			const transations = await knex("transations")
				.where("session_id", sessionId)
				.select();

			return { transations };
		});

	app.get("/:id",
		{
			preHandler: [check_session_id_exists]
		},	
		async(request) =>{
			const getTransationsParamsSchema = z.object({
				id:z.string().uuid(),
			});
    
			const { id } = getTransationsParamsSchema.parse(request.params);

			const { sessionId } = request.cookies;

			const transations = await knex("transations")
				.where({
					session_id: sessionId,
					id,
				})
				.first();

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

		let sessionId = request.cookies.session_id;
		console.log(sessionId);
		
		if(!sessionId){
			sessionId = randomUUID();
			
			reply.cookie("sessionId", sessionId, {
				path: "/",
				maxAge:60 * 60 * 60 * 24 * 7, // 7 dias 
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