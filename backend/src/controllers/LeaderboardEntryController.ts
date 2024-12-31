import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/UserService";
import LeaderboardService from "../services/LeaderboardService";
import LeaderboardEntryService from "../services/LeaderboardEntryService";

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
      const updatedLeaderboard = await LeaderboardEntryService.createLeaderboardEntries(
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
}

export default LeaderboardEntryController;
