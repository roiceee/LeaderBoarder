import { FastifyReply, FastifyRequest } from "fastify";
import LeaderboardService from "../services/LeaderboardService";
import { CreateLeaderboardRequestBody } from "../@types/leaderboard";
import UserService from "../services/UserService";

class LeaderboardController {
  static async createLeaderboardDirect(
    request: FastifyRequest<{ Body: CreateLeaderboardRequestBody }>,
    reply: FastifyReply
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
  static async updateLeaderboard(
    request: FastifyRequest<{ Body: { name: string } }>,
    reply: FastifyReply
  ) {
    try {
      if (!request.user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(request);
      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.updateLeaderboard(
        request,
        user
      );

      reply.code(200).send(leaderboard);
    } catch (err) {
      request.log.error(err);
      reply.code(500).send(err);
    }
  }
  static async getUserLeaderboards(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      if (!request.user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(request);
      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }
      const leaderboards = await LeaderboardService.getUserLeaderboards(
        request,
        user
      );

      reply.code(200).send(leaderboards);
    } catch (err) {
      request.log.error(err);
      reply.code(500).send(err);
    }
  }
  static async deleteLeaderboard(request: FastifyRequest, reply: FastifyReply) {
    try {
      if (!request.user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(request);
      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }

      await LeaderboardService.deleteLeaderboard(request, user);

      reply.code(204).send();
    } catch (err) {
      request.log.error(err);
      reply.code(500).send(err);
    }
  }
  static async getLeaderboard(request: FastifyRequest, reply: FastifyReply) {
    try {
      if (!request.user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(request);
      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.getLeaderboard(
        request,
        user
      );

      reply.code(200).send(leaderboard);
    } catch (err) {
      request.log.error(err);
      reply.code(500).send(err);
    }
  }
}

export default LeaderboardController;
