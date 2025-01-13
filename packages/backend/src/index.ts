import Fastify, { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import dbPlugin from './plugins/db';
import recipesRoutes from './routes/recipes';
import cors from '@fastify/cors';
const fastify: FastifyInstance = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*', // Разрешить запросы с любого источника
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
});

// Регистрация плагинов
fastify.register(dbPlugin);

// Swagger документация
fastify.register(swagger, {
  swagger: {
    info: {
      title: 'LeetCode Clone API',
      description: 'API документация для клона LeetCode',
      version: '0.1.0',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
  }
});

// Регистрация Swagger UI для документации
fastify.register(swaggerUI, {
  routePrefix: '/documentation', // Здесь используется 'routePrefix'
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header
});

// Загрузка маршрутов
fastify.register(recipesRoutes, { prefix: '/api' });

fastify.addHook('onRequest', (request, reply, done) => {
  const url = String(request.url); // Преобразуем url в строку
  if (!url.startsWith('/api')) {
    reply.redirect('/api' + url); // Теперь url является строкой
  }
  done();
});


const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    console.log(err)
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
