import { FastifyInstance } from "fastify";

async function leaderboardRoutes(fastify: FastifyInstance, options: any) {
  fastify.get(
    "/",
    {
      onRequest: [fastify.authenticate],
    },
    async (request, response) => {
      return "leaderboard\n";
    }
  );
}

export default leaderboardRoutes;
