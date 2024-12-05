import fastify from "fastify";
import userRoutes from "./routes/userRoutes";
import leaderboardRoutes from "./routes/leaderboardRoutes";

const server = fastify({logger: true});

server.register(userRoutes, { prefix: "/user" });
server.register(leaderboardRoutes, { prefix: "/leaderboard" });

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
