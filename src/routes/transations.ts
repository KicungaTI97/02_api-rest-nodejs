import { knex } from "../database";

export async function transationsRoutes(app){
	app.get("/hello", async () => {
		const transtactions = await knex("transations")
			.where("amount", 1000)
			.select("*");
  
		return transtactions;
	});
}