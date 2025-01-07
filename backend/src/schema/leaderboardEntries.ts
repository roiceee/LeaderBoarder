import { FastifySchema } from "fastify";
import { leaderboardProperties, entryProperties } from "./objectProperties";


const addLeaderboardEntriesSchema: FastifySchema = {
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
  params: {
    type: "object",
    properties: {
      slug: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      entries: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: leaderboardProperties,
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const deleteLeaderboardEntriesSchema: FastifySchema = {
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
  params: {
    type: "object",
    properties: {
      slug: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      entries: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: leaderboardProperties,
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const updateLeaderboardEntriesSchema: FastifySchema = {
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
  params: {
    type: "object",
    properties: {
      slug: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      entries: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            score: { type: "number" },
          },
        },
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: leaderboardProperties,
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const getLeaderboardEntriesSchema: FastifySchema = {
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
  params: {
    type: "object",
    properties: {
      slug: { type: "string" },
    },
  },
  querystring: {
    type: "object",
    properties: {
      orderBy: {
        type: "string",
        enum: [
          "score:desc",
          "score:asc",
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

const addScoreToLeaderboardEntrySchema: FastifySchema = {
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
  params: {
    type: "object",
    properties: {
      slug: { type: "string" },
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      score: { type: "number" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: entryProperties,
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const getLeaderboardEntrySchema: FastifySchema = {
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
  params: {
    type: "object",
    properties: {
      slug: { type: "string" },
      id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: entryProperties,
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export {
  addLeaderboardEntriesSchema,
  deleteLeaderboardEntriesSchema,
  updateLeaderboardEntriesSchema,
  getLeaderboardEntriesSchema,
  addScoreToLeaderboardEntrySchema,
  getLeaderboardEntrySchema,
};
