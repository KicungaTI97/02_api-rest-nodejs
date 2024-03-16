
//compreendendo o funcionamento do zod
import { z } from "zod";

const schema = z.object({
	nome: z.string().min(3).max(255),
	email: z.string().email(),
	idade: z.number().min(18).max(120)
});

const dados = {
	nome: "João Kicunga",
	email: "kicungati@gmail.com",
	idade:25,
};

const resultado = schema.parse(dados);
console.log(resultado);