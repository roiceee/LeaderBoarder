import { FastifyInstance } from "fastify";

async function userRoutes (fastify: FastifyInstance, options: any) {
  fastify.get("/", async(request, response) => {
    return "hell yeahh"
  })
}

export default userRoutes;
