import { CognitoJwtVerifier } from "aws-jwt-verify";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

export default fastifyPlugin(async function (
  fastify: FastifyInstance,
  opts: any
) {
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        if (!request.headers.authorization) {
          reply.send({
            statusCode: 401,
            error: "Unauthorized",
            message: "No token",
          });
          return;
        }

        const token = request.headers.authorization?.split(" ")[1];

        if (!token) {
          reply.send({
            statusCode: 401,
            error: "Unauthorized",
            message: "No token",
          });
          return;
        }

        const verifier = CognitoJwtVerifier.create({
          userPoolId: process.env.COGNITO_USER_POOL_ID || "",
          tokenUse: "access",
          clientId: process.env.COGNITO_CLIENT_ID || "",
        });

        const payload = await verifier.verify(token);
        console.log(payload);
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
