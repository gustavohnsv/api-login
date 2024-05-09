import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserService } from "../services/LoginUserService";
import { CryptService } from '../toCrypt';

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string, password: string };
        const cryptService = new CryptService();
        const { hashedPassword } = await cryptService.execute({ password });
        const loginUser = new LoginUserService();
        const data = await loginUser.execute({ email, hashedPassword });
        reply.status(200).send({ message: "Usuário encontrado com sucesso!", data});
    }
}

export { LoginUserController };
