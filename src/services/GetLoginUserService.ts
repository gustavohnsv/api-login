import prismaClient from "../prisma";

interface GetLoginUserProps {
    id: string;
}

class GetLoginUserService {
    async execute({ id }: GetLoginUserProps) {
        if (!id) {
            throw new Error("ID inválido.");
        }
        const user = await prismaClient.users.findFirst({
            where: {
                id
            },
            select: {
                name: true,
                email: true,
                create_at: true,
                update_at: true
            }
        });
        return user;
    }
}

export { GetLoginUserService }