import { User } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/UserService";

class UserController {
  static async createUserIfNotExists(
    fastify: FastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const user: User = await UserService.createUserIfNotExists(
        fastify,
        request
      );
      reply.code(200).send(user);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send(err);
    }
  }

  static async deleteUser(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    try {
      const user: User = await UserService.deleteUser(fastify, request);
      reply.code(200).send(user);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send(err);
    }
  }
}
export default UserController;
