import { FastifyInstance } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { WebSocket } from "ws";
import LeaderboardService from "../../services/LeaderboardService";

// Map to store active connections for each leaderboard slug
const leaderboardClients = new Map<string, Set<WebSocket>>();

async function leaderboardLiveRoutes(fastify: FastifyInstance, options: any) {
  fastify.get(
    "/:publicSlug",
    { websocket: true },
    async (
      socket: WebSocket,
      request: FastifyRequest<{ Params: { publicSlug: string } }>
    ) => {

      const leaderboardSlug = request.params.publicSlug as string;

      // Initialize the Set for the slug if it doesn't exist
      if (!leaderboardClients.has(leaderboardSlug)) {
        leaderboardClients.set(leaderboardSlug, new Set<WebSocket>());
      }

      // Add the new client to the Set for the leaderboard
      leaderboardClients.get(leaderboardSlug)?.add(socket);

      socket.on("close", () => {
        fastify.log.info("Client disconnected from leaderboard:", leaderboardSlug);
        // Remove the client from the Set when it disconnects
        leaderboardClients.get(leaderboardSlug)?.delete(socket);

        // If no more clients are connected to this leaderboard, we can delete the entry
        if (leaderboardClients.get(leaderboardSlug)?.size === 0) {
          leaderboardClients.delete(leaderboardSlug);
        }
      });

      let leaderboardData: any;

      // Poll leaderboard data at regular intervals
      const interval = setInterval(async () => {
        const newLeaderboardData = await LeaderboardService.getLeaderBoardByPublicSlug(
          request,
          leaderboardSlug
        );

        if (!newLeaderboardData) {
          socket.send(
            JSON.stringify({
              message: `Leaderboard ${leaderboardSlug} not found`,
            })
          );
          socket.close();
          return;
        }

        // Only send data if it's different from the previous data
        if (JSON.stringify(newLeaderboardData) !== JSON.stringify(leaderboardData)) {
          leaderboardData = newLeaderboardData;

          // Broadcast the new leaderboard data to all connected clients
          leaderboardClients.get(leaderboardSlug)?.forEach(clientSocket => {
            clientSocket.send(
              JSON.stringify({
                leaderboard: leaderboardData,
              })
            );
          });
        }
      }, 1000);


      // Clean up the interval when the client disconnects
      socket.on("close", () => {
        clearInterval(interval);
      });
    }
  );
}

export default leaderboardLiveRoutes;
