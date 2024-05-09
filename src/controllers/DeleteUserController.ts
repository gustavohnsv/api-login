import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const deleteUserService = new DeleteUserService();
        const message = await deleteUserService.execute({ id });
        reply.status(200).send(message); // talvez 202
    }
}

export { DeleteUserController };