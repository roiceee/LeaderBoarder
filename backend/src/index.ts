import fastify from "fastify";
import leaderboardRoutes from "./routes/leaderboardRoutes";
import userRoutes from "./routes/userRoute";
import leaderboardLiveRoutes from "./routes/leaderboard-live/leaderboardliveRoutes";

const server = fastify({ logger: true });

server.register(userRoutes, { prefix: "/user" });
server.register(leaderboardRoutes, { prefix: "/leaderboard" });
server.register(leaderboardLiveRoutes, { prefix: "/live" });

server.get("/ping", async (request, reply) => {
  return "ping\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
