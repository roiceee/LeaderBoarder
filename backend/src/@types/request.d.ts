import { FastifyRequest } from "fastify";
import { CognitoIdOrAccessTokenPayload } from "aws-jwt-verify/jwt-model";

// Use module augmentation to extend the FastifyRequest interface
declare module "fastify" {
  interface FastifyRequest {
    user?: CognitoIdOrAccessTokenPayload; // Use optional if the property is not guaranteed to exist
  }
}