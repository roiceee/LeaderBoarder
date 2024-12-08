import { FastifyInstance } from "fastify";
import { createLeaderboard } from "../services/leaderboardService";

async function leaderboardRoutes(fastify: FastifyInstance, options: any) {
  fastify.get(
    "/",
    {
      preValidation: [fastify.authenticate],
    },
    async (request, response) => {
      return "leaderboard\n";
    }
  );

  fastify.post(
    "/",
    {
      preValidation: [fastify.authenticate],
    },
    async (request, response) => {
      // return createLeaderboard();
    }
  );
}

export default leaderboardRoutes;
