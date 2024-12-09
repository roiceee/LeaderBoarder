import { Leaderboard, User } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { CreateLeaderboardRequestBody } from "../schema/leaderboard";
import { ulid } from "ulid";

export default class LeaderboardService {
  static async createLeaderboardDirect(
    request: FastifyRequest<{ Body: CreateLeaderboardRequestBody }>,
    user: User
  ): Promise<Leaderboard> {
    const { name } = request.body;

    const slug = ulid();
    const publicSlug = ulid();

    const leaderboard = await request.server.prisma.leaderboard.create({
      data: {
        name: name,
        sourceType: "DIRECT_INPUT",
        userId: user.id,
        slug: slug,
        publicSlug: publicSlug,
      },
    });

    return leaderboard;
  }
}
