import { Leaderboard, User } from "@prisma/client";
import { FastifyRequest } from "fastify";
import uniqueSlug from "unique-slug";
import { CreateLeaderboardRequestBody } from "../schema/leaderboard";

export default class LeaderboardService {
  static async createLeaderboard(
    request: FastifyRequest<{ Body: CreateLeaderboardRequestBody }>,
    user: User
  ): Promise<Leaderboard> {
    const { name, sourceType } = request.body;

    const slug = uniqueSlug();
    const publicSlug = uniqueSlug();

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
