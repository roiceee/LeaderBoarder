import { Leaderboard, User } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../plugins/prisma";

class LeaderboardEntryService {
  static async createLeaderboardEntries(
    request: FastifyRequest,
    reply: FastifyReply,
    leaderboard: Leaderboard
  ) {
    const { entries } = request.body as { entries: { name: string }[] };
    if (!entries) {
      return reply.code(400).send({ message: "Entries are required" });
    }
    const leaderboardEntries = entries.map((entry) => ({
      name: entry.name,
      leaderboardId: leaderboard.id,
    }));

    const createdEntries =
      await request.server.prisma.leaderboardEntry.createMany({
        data: leaderboardEntries,
      });

    const leaderboardWithEntries =
      await request.server.prisma.leaderboard.findUnique({
        where: {
          id: leaderboard.id,
        },
        include: {
          leaderboardEntries: {
            orderBy: {
              id: "asc",
            },
          },
        },
      });

    return leaderboardWithEntries;
  }
  static async deleteLeaderboardEntries(
    request: FastifyRequest,
    reply: FastifyReply,
    leaderboard: Leaderboard
  ) {
    const { entries } = request.body as { entries: { id: string }[] };
    if (!entries) {
      return reply.code(400).send({ message: "Entries are required" });
    }
    const leaderboardEntries = entries.map((entry) => ({
      id: entry.id,
    }));

    await request.server.prisma.leaderboardEntry.deleteMany({
      where: {
        id: {
          in: leaderboardEntries.map((entry) => Number(entry.id)),
        },
      },
    });

    const leaderboardWithEntries =
      await request.server.prisma.leaderboard.findUnique({
        where: {
          id: leaderboard.id,
        },
        include: {
          leaderboardEntries: {
            orderBy: {
              id: "asc",
            },
          },
        },
      });

    return leaderboardWithEntries;
  }
  static async updateLeaderboardEntries(
    request: FastifyRequest,
    reply: FastifyReply,
    leaderboard: Leaderboard
  ) {
    const { entries } = request.body as {
      entries: { id: string; name: string }[];
    };
    if (!entries) {
      return reply.code(400).send({ message: "Entries are required" });
    }
    const leaderboardEntries = entries.map((entry) => ({
      id: entry.id,
      name: entry.name,
    }));

    const updatePromises = leaderboardEntries.map((entry) =>
      request.server.prisma.leaderboardEntry.update({
        where: {
          id: Number(entry.id),
        },
        data: {
          name: entry.name,
        },
      })
    );

    await request.server.prisma.$transaction(updatePromises)

    const leaderboardWithEntries =
      await request.server.prisma.leaderboard.findUnique({
        where: {
          id: leaderboard.id,
        },
        include: {
          leaderboardEntries: {
            orderBy: {
              id: "asc",
            },
          },
        },
      });

    return leaderboardWithEntries;
  }

  static async getLeaderboardEntries(
    request: FastifyRequest,
    reply: FastifyReply,
    leaderboard: Leaderboard
  ) {
    let { orderBy } = request.query as { orderBy: string };

    if (!orderBy) {
      orderBy = "id:asc";
    }

    const leaderboardWithEntries =
      await request.server.prisma.leaderboard.findUnique({
        where: {
          id: leaderboard.id,
        },
        include: {
          leaderboardEntries: {
            orderBy: {
              [orderBy.split(":")[0]]: orderBy.split(":")[1],
            },
          },
        },
      });

    return leaderboardWithEntries;
  }
}

export default LeaderboardEntryService;