import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, photoID } = request.body as { name: string, email: string, password: string, photoID: number};
        const userService = new CreateUserService();
        const user = await userService.execute({ name, email, password, photoID });
        reply.status(200).send(user); // talvez 201
    }
} 

export { CreateUserController };