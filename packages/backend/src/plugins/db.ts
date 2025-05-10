import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Создание экземпляра PrismaClient
const prisma = new PrismaClient();

// Определение типа для плагина
interface FastifyPrismaPluginOptions {
  // Если есть опции, вы можете добавить их здесь
}

// Асинхронная функция плагина
const dbConnector: FastifyPluginAsync<FastifyPrismaPluginOptions> = async (fastify: FastifyInstance, options: FastifyPrismaPluginOptions) => {
  fastify.decorate('prisma', prisma);
};

// Экспорт плагина с помощью fastify-plugin
export default fastifyPlugin(dbConnector);
