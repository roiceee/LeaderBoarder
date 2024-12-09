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

  static async updateLeaderboard(
    request: FastifyRequest<{ Body: { name: string } }>,
    user: User
  ): Promise<Leaderboard> {
    const { slug } = request.params as { slug: string };
    const { name } = request.body;

    const leaderboard = await request.server.prisma.leaderboard.update({
      where: {
        slug: slug,
        userId: user.id,
      },
      data: {
        name: name,
      },
    });

    return leaderboard;
  }

  static async getUserLeaderboards(
    request: FastifyRequest,
    user: User
  ): Promise<Leaderboard[]> {
    let { orderBy } = request.query as {
      orderBy:
        | "createdAt:desc"
        | "updatedAt:desc"
        | "createdAt:asc"
        | "updatedAt:asc";
    };

    request.server.log.info({ orderBy });

    if (!orderBy) {
      orderBy = "createdAt:desc";
    }

    const leaderboards = await request.server.prisma.leaderboard.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        [orderBy.split(":")[0]]: orderBy.split(":")[1],
      },
    });

    return leaderboards;
  }

  static async deleteLeaderboard(
    request: FastifyRequest,
    user: User
  ): Promise<Leaderboard> {
    const { slug } = request.params as { slug: string };

    const leaderboard = await request.server.prisma.leaderboard.delete({
      where: {
        slug: slug,
        userId: user.id,
      },
    });

    return leaderboard;
  }

  static async getLeaderboard(
    request: FastifyRequest,
    user: User
  ): Promise<Leaderboard> {
    const { slug } = request.params as { slug: string };

    const leaderboard = await request.server.prisma.leaderboard.findUnique({
      where: {
        slug: slug,
        userId: user.id,
      },
    });

    if (!leaderboard) {
      throw new Error(`Leaderboard with slug ${slug} not found`);
    }

    return leaderboard;
  }
}
