import { FastifyInstance } from "fastify";

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
}

export default leaderboardRoutes;
