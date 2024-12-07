import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

export default fastifyPlugin(function (
  fastify: FastifyInstance,
  opts: any,
  done: any
) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWTSECRET || "defaultSecret",
  });

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
  done();
});
