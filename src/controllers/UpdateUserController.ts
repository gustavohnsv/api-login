import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateUserService } from '../services/UpdateUserService'
import { CryptService } from '../toCrypt';

class UpdateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const { name, email, password } = request.body as { name: string, email: string, password: string };
        const cryptService = new CryptService();
        const { hashedEmail, hashedPassword } = await cryptService.execute({ email, password });
        const updateUserService = new UpdateUserService();
        const user = await updateUserService.execute({ id, name, hashedEmail, hashedPassword });
        reply.status(200).send(user);
    }
}

export { UpdateUserController }