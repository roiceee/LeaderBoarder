export interface CreateLeaderboardRequestBody {
  name: string;
}

export interface CreateLeaderboardResponseBody {
  id: number;
  name: string;
  publicSlug: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
