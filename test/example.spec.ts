import {afterAll, beforeAll, expect, test} from "vitest";
import request from "supertest";
import {app} from "../src/app";

beforeAll(async () =>{
	await app.ready();
});

afterAll(async () =>{
	await app.close();
});
test("O usuario consegue criar uma nova transação", async() =>{
	//fazer uma chamada HTTP p/ criar uma nova transaçao

	const response = await request(app.server)
		.post("/transations")
		.send({
			title: "New transations",
			amount: 5000,
			type: "credit"
		})
		.expect(201);


});