import { FastifySchema } from "fastify";
import { leaderboardProperties } from "./objectProperties";

// schema/leaderboardSchemas.js
const createLeaderboardSchema: FastifySchema = {
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
      properties: leaderboardProperties,
    },
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const updateLeaderboardSchema: FastifySchema = {
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
      properties: leaderboardProperties,
    },
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const getUserLeaderboardsSchema: FastifySchema = {
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
        properties: leaderboardProperties,
      },
    },
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const deleteLeaderboardSchema: FastifySchema = {
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
};

const getLeaderboardSchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      slug: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: leaderboardProperties,
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export {
  createLeaderboardSchema,
  updateLeaderboardSchema,
  getUserLeaderboardsSchema,
  deleteLeaderboardSchema,
  getLeaderboardSchema,
};
