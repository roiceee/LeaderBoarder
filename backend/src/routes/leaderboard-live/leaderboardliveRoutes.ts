import { FastifyInstance } from "fastify";

async function leaderboardLiveRoutes(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request, response) => {
    return "leaderboard\n";
  });
}

export default leaderboardLiveRoutes;
