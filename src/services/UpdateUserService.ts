import prismaClient from "../prisma";

interface UpdateUserProps {
    id: string;
    name: string;
    hashedEmail: string;
    hashedPassword: string;

}

class UpdateUserService {
    async execute({ id, name, hashedEmail, hashedPassword }: UpdateUserProps) {
        if (!id) {
            throw new Error("ID Invalido!");
        }
        const findUser = await prismaClient.users.findFirst({
            where: {
                id
            }
        });
        if (!findUser) {
            throw new Error("Usuário não encontrado!");
        }
        const email = hashedEmail;
        const password = hashedPassword;
        const updateUser = await prismaClient.users.update({
            where: {
                id
            },
            data: {
                name,
                email,
                password,
                update_at: new Date(Date.now())
            }
        });
        return updateUser;
    }
}

export  { UpdateUserService }