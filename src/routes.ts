import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserController } from "./controllers/ListUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { LoginUserController } from "./controllers/LoginUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { GetLoginUserController } from "./controllers/GetLoginUserController";
import jwt from 'jsonwebtoken';

function checkToken(request: FastifyRequest, reply: FastifyReply, next: Function) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || '';

    if (!token) {
        reply.status(401).send({ message: "Acesso negado." });
    }

    try {
        const secret = process.env.JWT_SECRET || '';
        jwt.verify(token, secret);
        next(); // Chama o próximo middleware
    } catch (error) {
        reply.status(400).send({ message: "Token invalido" });
    }

}

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Rota PRINCIPAL
    // Rota de teste de conexão
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        return { status: "Conexão bem sucedida!" };
    });

    // Rota USER
    // Rota para criar um usuário
    fastify.post('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply);
    });

    // Rota para obter os usuários
    fastify.get('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUserController().handle(request, reply);
    });

    // Rota para deletar um usuário
    fastify.delete('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply);
    });

    // Rota LOGIN
    // Rota para fazer login
    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return new LoginUserController().handle(request, reply);
    });

    // Rota para obter um usuário
    fastify.get('/login', { preHandler: checkToken } ,async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetLoginUserController().handle(request, reply);
    });

    // Rota UPDATE-USER
    // Rota para atualizar um usuário
    fastify.post('/updateuser', async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateUserController().handle(request, reply);
    });

}