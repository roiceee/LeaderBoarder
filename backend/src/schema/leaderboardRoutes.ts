import { FastifySchema } from "fastify";

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
};

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
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          leaderboardId: { type: "number" },
          slug: { type: "string" },
          publicSlug: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          leaderboardEntries: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                leaderboardId: { type: "number" },
                score: { type: "number" },
                slug: { type: "string" },
                publicSlug: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
      },
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
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        publicSlug: { type: "string" },
        slug: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        leaderboardEntries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              leaderboardId: { type: "number" },
              score: { type: "number" },
              slug: { type: "string" },
              publicSlug: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
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
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        publicSlug: { type: "string" },
        slug: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        leaderboardEntries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              leaderboardId: { type: "number" },
              score: { type: "number" },
              slug: { type: "string" },
              publicSlug: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
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
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        publicSlug: { type: "string" },
        slug: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        leaderboardEntries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              leaderboardId: { type: "number" },
              score: { type: "number" },
              slug: { type: "string" },
              publicSlug: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
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
  addLeaderboardEntriesSchema,
  deleteLeaderboardEntriesSchema,
  updateLeaderboardEntriesSchema,
  getLeaderboardEntriesSchema,
};
