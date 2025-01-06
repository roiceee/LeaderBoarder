import { FastifyReply, FastifyRequest } from "fastify";
import LeaderboardEntryService from "../services/LeaderboardEntryService";
import LeaderboardService from "../services/LeaderboardService";
import UserService from "../services/UserService";

class LeaderboardEntryController {
  static async createLeaderboardEntries(
    req: FastifyRequest,
    rep: FastifyReply
  ) {
    try {
      if (!req.user) {
        return rep.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(req);
      if (!user) {
        return rep.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.getLeaderboard(req, user);
      if (!leaderboard) {
        return rep.code(404).send({ message: "Leaderboard not found" });
      }
      const updatedLeaderboard =
        await LeaderboardEntryService.createLeaderboardEntries(
          req,
          rep,
          leaderboard
        );
      rep.code(201).send(updatedLeaderboard);
    } catch (err) {
      req.log.error(err);
      rep.code(500).send(err);
    }
  }

  static async deleteLeaderboardEntries(
    req: FastifyRequest,
    rep: FastifyReply
  ) {
    try {
      if (!req.user) {
        return rep.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(req);
      if (!user) {
        return rep.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.getLeaderboard(req, user);
      if (!leaderboard) {
        return rep.code(404).send({ message: "Leaderboard not found" });
      }
      const updatedLeaderboard =
        await LeaderboardEntryService.deleteLeaderboardEntries(
          req,
          rep,
          leaderboard
        );
      rep.code(200).send(updatedLeaderboard);
    } catch (err) {
      req.log.error(err);
      rep.code(500).send(err);
    }
  }
  static async updateLeaderboardEntries(
    req: FastifyRequest,
    rep: FastifyReply
  ) {
    try {
      if (!req.user) {
        return rep.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(req);
      if (!user) {
        return rep.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.getLeaderboard(req, user);
      if (!leaderboard) {
        return rep.code(404).send({ message: "Leaderboard not found" });
      }
      const updatedLeaderboard =
        await LeaderboardEntryService.updateLeaderboardEntries(
          req,
          rep,
          leaderboard
        );
      rep.code(200).send(updatedLeaderboard);
    } catch (err) {
      req.log.error(err);
      rep.code(500).send(err);
    }
  }
  static async getLeaderboardEntries(req: FastifyRequest, rep: FastifyReply) {
    try {
      if (!req.user) {
        return rep.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(req);
      if (!user) {
        return rep.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.getLeaderboard(req, user);
      if (!leaderboard) {
        return rep.code(404).send({ message: "Leaderboard not found" });
      }
      const leaderboardWithEntries =
        await LeaderboardEntryService.getLeaderboardEntries(
          req,
          rep,
          leaderboard
        );
      rep.code(200).send(leaderboardWithEntries);
    } catch (err) {
      req.log.error(err);
      rep.code(500).send(err);
    }
  }

  static async addScoreToLeaderboardEntry(
    req: FastifyRequest,
    rep: FastifyReply
  ) {
    try {
      if (!req.user) {
        return rep.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(req);
      if (!user) {
        return rep.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.getLeaderboard(req, user);
      if (!leaderboard) {
        return rep.code(404).send({ message: "Leaderboard not found" });
      }
      const updatedLeaderboard =
        await LeaderboardEntryService.addScoreToLeaderboardEntry(
          req,
          rep,
          leaderboard
        );
      rep.code(200).send(updatedLeaderboard);
    } catch (err) {
      req.log.error(err);
      rep.code(500).send(err);
    }
  }

  static async getLeaderboardEntry(req: FastifyRequest, rep: FastifyReply) {
    try {
      if (!req.user) {
        return rep.code(401).send({ message: "Unauthorized" });
      }
      const user = await UserService.getUser(req);
      if (!user) {
        return rep.code(404).send({ message: "User not found" });
      }
      const leaderboard = await LeaderboardService.getLeaderboard(req, user);
      if (!leaderboard) {
        return rep.code(404).send({ message: "Leaderboard not found" });
      }
      const leaderboardEntry =
        await LeaderboardEntryService.getLeaderboardEntry(
          req,
          rep,
          leaderboard
        );
      rep.code(200).send(leaderboardEntry);
    } catch (err) {
      req.log.error(err);
      rep.code(500).send(err);
    }
  }
}

export default LeaderboardEntryController;
