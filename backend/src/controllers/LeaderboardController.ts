import { FastifyReply, FastifyRequest } from "fastify";
import LeaderboardService from "../services/LeaderboardService";
import { CreateLeaderboardRequestBody } from "../schema/leaderboard";
import UserService from "../services/UserService";

class LeaderboardController {
  static async createLeaderboardDirect(
    request: FastifyRequest<{ Body: CreateLeaderboardRequestBody }>,
    reply: FastifyReply,
  ) {
    try {
      if (!request.user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(request);
      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.createLeaderboardDirect(
        request,
        user
      );

      reply.code(201).send(leaderboard);
    } catch (err) {
      request.log.error(err);
      reply.code(500).send(err);
    }
  }
}

export default LeaderboardController;
