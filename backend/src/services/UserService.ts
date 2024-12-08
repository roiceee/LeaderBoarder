import { FastifyRequest } from "fastify";

class UserService {
  static async createUserIfNotExists(request: FastifyRequest) {
    const userSub: string = request.user.sub;
    let user;

    user = await request.server.prisma.user.findFirst({
      where: { sub: { equals: userSub } },
    });

    if (user == undefined) {
      user = await request.server.prisma.user.create({
        data: {
          sub: userSub,
        },
      });
    }

    return user;
  }

  static async deleteUser(request: FastifyRequest) {
    const userSub: string = request.user.sub;

    const user = await request.server.prisma.user.delete({
      where: { sub: userSub },
    });

    return user;
  }
}

export default UserService;
