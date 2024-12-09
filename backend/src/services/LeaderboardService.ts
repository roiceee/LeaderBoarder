import { Leaderboard, User } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { CreateLeaderboardRequestBody } from "../schema/leaderboard";
import { ulid } from "ulid";

export default class LeaderboardService {
  static async createLeaderboard(
    request: FastifyRequest<{ Body: CreateLeaderboardRequestBody }>,
    user: User
  ): Promise<Leaderboard> {
    const { name, sourceType } = request.body;

    const slug = ulid();
    const publicSlug = ulid();

    if (sourceType === "GOOGLE_SHEET") {
      throw new Error("Google Sheets not supported yet");
    }

    const leaderboard = await request.server.prisma.leaderboard.create({
      data: {
        name: name,
        sourceType: sourceType,
        userId: user.id,
        slug: slug,
        publicSlug: publicSlug,
      },
    });

    return leaderboard;
  }
}
