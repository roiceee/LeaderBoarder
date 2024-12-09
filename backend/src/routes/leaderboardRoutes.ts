import { FastifyInstance, FastifyRequest } from "fastify";
import LeaderboardController from "../controllers/LeaderboardController";
import { CreateLeaderboardRequestBody } from "../schema/leaderboard";

async function leaderboardRoutes(fastify: FastifyInstance, options: any) {
  fastify.post(
    "/create/direct",
    {
      preValidation: [fastify.authenticate],
      schema: {
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              publicSlug: { type: "string" },
              slug: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: CreateLeaderboardRequestBody }>,
      reply
    ) => {
      return LeaderboardController.createLeaderboardDirect(request, reply);
    }
  );
}

export default leaderboardRoutes;
