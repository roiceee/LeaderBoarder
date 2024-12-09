import { FastifyInstance, FastifyRequest } from "fastify";
import LeaderboardController from "../controllers/LeaderboardController";
import { CreateLeaderboardRequestBody } from "../schema/leaderboard";

async function leaderboardRoutes(fastify: FastifyInstance, options: any) {
  fastify.post(
    "/create/direct",
    {
      preValidation: [fastify.authenticate],
      schema: {
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              publicSlug: { type: "string" },
              slug: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
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
      schema: {
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              publicSlug: { type: "string" },
              slug: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest<{ Body: { name: string } }>, reply) => {
      return LeaderboardController.updateLeaderboard(request, reply);
    }
  );

  fastify.get(
    "/user",
    {
      preValidation: [fastify.authenticate],
      schema: {
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        querystring: {
          type: "object",
          properties: {
            orderBy: {
              type: "string",
              enum: [
                "createdAt:desc",
                "updatedAt:desc",
                "createdAt:asc",
                "updatedAt:asc",
              ],
            },
          },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                publicSlug: { type: "string" },
                slug: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardController.getUserLeaderboards(request, reply);
    }
  );

  fastify.delete(
    "/delete/:slug",
    {
      preValidation: [fastify.authenticate],
      schema: {
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardController.deleteLeaderboard(request, reply);
    }
  );

  fastify.get(
    "/:slug",
    {
      preValidation: [fastify.authenticate],
      schema: {
        params: {
          type: "object",
          properties: {
            slug: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              publicSlug: { type: "string" },
              slug: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply) => {
      return LeaderboardController.getLeaderboard(request, reply);
    }
  );
}

export default leaderboardRoutes;
