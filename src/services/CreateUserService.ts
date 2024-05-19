import prismaClient from "../prisma";
import { CryptService } from '../toCrypt';

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
    photoID: number;
}

class CreateUserService {
    async execute({ name, email, password, photoID}: CreateUserProps) {
        if (!name || !email || !password) {
            throw new Error("Informações faltando!");
        }
        const cryptService = new CryptService();
        const { hashedPassword } = await cryptService.execute({ password });
        const user = await prismaClient.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
                photoID
            }
        });
        return user;
    }
}

export { CreateUserService }