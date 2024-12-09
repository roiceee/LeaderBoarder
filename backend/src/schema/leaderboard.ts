export interface CreateLeaderboardRequestBody {
  name: string;
  sourceType: "GOOGLE_SHEET" | "DIRECT_INPUT";
}

export interface CreateLeaderboardResponseBody {
  id: number;
  name: string;
  publicSlug: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
