import prismaClient from "../prisma";

interface DeleteUserProps {
    id: string;
}

class DeleteUserService {
  async execute({ id }: DeleteUserProps) {
    if (!id) {
        throw new Error("ID Invalido!");
    }
    const findUser = await prismaClient.users.findFirst({
        where: { id }
    });
    if (!findUser) {
        throw new Error("Usuario não encontrado!");
    }
    await prismaClient.users.delete({
        where: { id: findUser.id }
    });
    return { message: "Usuario deletado com sucesso!" };
  }
}

export { DeleteUserService }