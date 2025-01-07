const leaderboardProperties = {
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
};

const entryProperties = {
  id: { type: "number" },
  name: { type: "string" },
  leaderboardId: { type: "number" },
  score: { type: "number" },
  slug: { type: "string" },
  publicSlug: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

export { leaderboardProperties, entryProperties };
