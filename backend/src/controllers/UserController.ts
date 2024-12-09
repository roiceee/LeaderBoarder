import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/UserService";

class UserController {
  static async createUserIfNotExists(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const user: User = await UserService.createUserIfNotExists(request);
      reply.code(200).send(user);
    } catch (err) {
      request.server.log.error(err);
      reply.code(500).send(err);
    }
  }

  static async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user: User = await UserService.deleteUser(request);
      reply.code(200).send(user);
    } catch (err) {
      request.server.log.error(err);
      reply.code(500).send(err);
    }
  }
}
export default UserController;
