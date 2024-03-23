import { FastifyReply, FastifyRequest } from "fastify";

export async function check_session_id_exists(
	request: FastifyRequest,
	reply: FastifyReply
){
	const sessionId = request.cookies.sessionId;

	if(!sessionId){
		return reply.status(401).send({
			error: "Unauthorized."
		});
	}

}