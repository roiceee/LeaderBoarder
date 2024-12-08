import { equal } from "assert";
import { FastifyInstance, FastifyRequest } from "fastify";

class UserService {
  static async createUserIfNotExists(
    fastify: FastifyInstance,
    request: FastifyRequest
  ) {
    const userSub: string = request.user.sub;
    let user;

    user = await fastify.prisma.user.findFirst({
      where: { sub: { equals: userSub } },
    });

    if (user == undefined) {
      user = await fastify.prisma.user.create({
        data: {
          sub: userSub,
        },
      });
    }

    return user;
  }

  static async deleteUser(fastify: FastifyInstance, request: FastifyRequest) {
    const userSub: string = request.user.sub;

    const user = await fastify.prisma.user.delete({
      where: { sub: userSub },
    });

    return user;
  }
}

export default UserService;
