import { FastifyRequest, FastifyReply } from "fastify";
import { GetLoginUserService } from "../services/GetLoginUserService";

class GetLoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const getUser = new GetLoginUserService();
        const user = await getUser.execute({ id });
        reply.status(200).send(user);
    }
}

export { GetLoginUserController };