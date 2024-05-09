import prismaClient from "../prisma";
import jwt from "jsonwebtoken";

interface LoginUserProps {
    email: string;
    hashedPassword: string;
}

class LoginUserService {
    async execute({ email, hashedPassword }: LoginUserProps) {
        const password = hashedPassword;
        if (!email || !password) {
            throw new Error("Informações faltando!");
        }
        const findUser = await prismaClient.users.findFirst({
            where: { 
                email
            }
        });
        if (!findUser) {
            throw new Error("Usuario não encontrado!");
        }
        if (findUser.password !== password) {
            throw new Error("Senha incorreta!");
        }   
        let token: string;
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT Secret não definido!");
            }
            token = jwt.sign(
                {
                    id: findUser.id,
                },
                secret,
            );
        } catch (error: any) {
            throw new Error(error);
        }
        return { token , id: findUser.id };
    }
}

export { LoginUserService }
