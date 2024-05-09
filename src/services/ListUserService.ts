import prismaClient from "../prisma";

class ListUserService {
  async execute() {
    const users = await prismaClient.users.findMany();
    return users;
  }
}

export { ListUserService };