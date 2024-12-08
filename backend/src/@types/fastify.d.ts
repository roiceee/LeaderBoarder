import { PrismaClient } from "@prisma/client";
import * as http from "http";

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    authenticate: any;
    sign: any;
    verify: any;
    prisma: PrismaClient;
  }
}
