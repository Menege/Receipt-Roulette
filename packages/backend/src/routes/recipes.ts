import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import receiptsController from '../controllers/receiptsController';

const taskRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/recipes/random', receiptsController.getRandomReceipt);
  fastify.get('/recipes/all', receiptsController.getReceipts);
  fastify.get('/recipes/filter', receiptsController.getFilterReceipts);
};

export default taskRoutes;
