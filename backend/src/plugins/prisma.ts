import { PrismaClient } from "@prisma/client";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (fastify, opts) => {
  const prisma = new PrismaClient();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
});
