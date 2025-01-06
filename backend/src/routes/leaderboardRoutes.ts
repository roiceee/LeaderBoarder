import { FastifyInstance, FastifyRequest } from "fastify";
import LeaderboardController from "../controllers/LeaderboardController";
import {
  createLeaderboardSchema,
  updateLeaderboardSchema,
  getUserLeaderboardsSchema,
  deleteLeaderboardSchema,
  getLeaderboardSchema,
} from "../schema/leaderboards";
import { CreateLeaderboardRequestBody } from "../@types/leaderboard";
import LeaderboardEntryController from "../controllers/LeaderboardEntryController";
import {
  addLeaderboardEntriesSchema,
  deleteLeaderboardEntriesSchema,
  updateLeaderboardEntriesSchema,
  getLeaderboardEntriesSchema,
  getLeaderboardEntrySchema,
  addScoreToLeaderboardEntrySchema,
} from "../schema/leaderboardEntries";

async function leaderboardRoutes(fastify: FastifyInstance, options: any) {
  fastify.post(
    "/create/direct",
    {
      preValidation: [fastify.authenticate],
      schema: createLeaderboardSchema,
    },
    async (
      request: FastifyRequest<{ Body: CreateLeaderboardRequestBody }>,
      reply
    ) => {
      return LeaderboardController.createLeaderboardDirect(request, reply);
    }
  );

  fastify.patch(
    "/update/:slug",
    {
      preValidation: [fastify.authenticate],
      schema: updateLeaderboardSchema,
    },
    async (request: FastifyRequest<{ Body: { name: string } }>, reply) => {
      return LeaderboardController.updateLeaderboard(request, reply);
    }
  );

  fastify.get(
    "/user",
    {
      preValidation: [fastify.authenticate],
      schema: getUserLeaderboardsSchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardController.getUserLeaderboards(request, reply);
    }
  );

  fastify.delete(
    "/delete/:slug",
    {
      preValidation: [fastify.authenticate],
      schema: deleteLeaderboardSchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardController.deleteLeaderboard(request, reply);
    }
  );

  fastify.get(
    "/:slug",
    {
      preValidation: [fastify.authenticate],
      schema: getLeaderboardSchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardController.getLeaderboard(request, reply);
    }
  );

  fastify.post(
    "/:slug/entries/create",
    {
      preValidation: [fastify.authenticate],
      schema: addLeaderboardEntriesSchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardEntryController.createLeaderboardEntries(
        request,
        reply
      );
    }
  );

  fastify.delete(
    "/:slug/entries/delete",
    {
      preValidation: [fastify.authenticate],
      schema: deleteLeaderboardEntriesSchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardEntryController.deleteLeaderboardEntries(
        request,
        reply
      );
    }
  );

  fastify.patch(
    "/:slug/entries/update",
    {
      preValidation: [fastify.authenticate],
      schema: updateLeaderboardEntriesSchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardEntryController.updateLeaderboardEntries(
        request,
        reply
      );
    }
  );

  fastify.get(
    "/:slug/entries",
    {
      preValidation: [fastify.authenticate],
      schema: getLeaderboardEntriesSchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardEntryController.getLeaderboardEntries(request, reply);
    }
  );

  //get one leaderboard entry by id

  fastify.get(
    "/:slug/entries/:id",
    {
      preValidation: [fastify.authenticate],
      schema: getLeaderboardEntrySchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardEntryController.getLeaderboardEntry(request, reply);
    }
  );

  //add score to leaderboard entry
  fastify.patch(
    "/:slug/entries/:id/addScore",
    {
      preValidation: [fastify.authenticate],
      // schema: addScoreToLeaderboardEntrySchema,
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardEntryController.addScoreToLeaderboardEntry(
        request,
        reply
      );
    }
  );
}

export default leaderboardRoutes;
