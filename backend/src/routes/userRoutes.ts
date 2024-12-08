import { FastifyInstance } from "fastify";
import UserController from "../controllers/UserController";

async function userRoutes(fastify: FastifyInstance, options: any) {
  fastify.put(
    "/create",
    {
      preValidation: [fastify.authenticate],
      schema: {
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              sub: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
          500: {
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return UserController.createUserIfNotExists(fastify, request, reply);
    }
  );

  fastify.delete(
    "/delete",
    {
      preHandler: [fastify.authenticate],
      schema: {
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              sub: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
          500: {
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return UserController.deleteUser(fastify, request, reply);
    }
  );
}

export default userRoutes;
