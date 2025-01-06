import "dotenv/config";
import fastify from "fastify";
import jwt from "./plugins/jwt";
import leaderboardLiveRoutes from "./routes/leaderboard-live/leaderboardliveRoutes";
import leaderboardRoutes from "./routes/leaderboardRoutes";
import userRoutes from "./routes/userRoutes";
import prisma from "./plugins/prisma";
import fastifyMultipart from "@fastify/multipart";
import envToLogger from "./util/logger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";

const server = fastify({
  logger:
    envToLogger[process.env.ENVIRONMENT as keyof typeof envToLogger] ?? true,
});

//database connection
server.register(prisma);

//jwt authentication
server.register(jwt);

server.register(fastifyMultipart);

if (process.env.ENVIRONMENT === "development") {
  server.register(fastifySwagger);
  server.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
}

//register routes
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
