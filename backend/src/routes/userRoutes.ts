import { FastifyInstance } from "fastify";
import UserController from "../controllers/UserController";

async function userRoutes(fastify: FastifyInstance, options: any) {
  fastify.put(
    "/create",
    {
      preValidation: [fastify.authenticate],
    },
    async (request, reply) => {
      return UserController.createUserIfNotExists(fastify, request, reply);
    }
  );
}

export default userRoutes;
