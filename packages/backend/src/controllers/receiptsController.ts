import { FastifyReply, FastifyRequest } from 'fastify';
// import prisma from '../plugins/db';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getReceipts = async (request: FastifyRequest, reply: FastifyReply) => {
  const tasks = await prisma.recipe.findMany();
  reply.send(tasks);
};

interface RecipeQuery {
  ingredients?: string[];
  diet?: string;
  cookingTime?: string;
}

const getFilterReceipts = async (request: FastifyRequest<{ Querystring: RecipeQuery }>, reply: FastifyReply) => {
  const { diet, cookingTime } = request.query;

  try {
    const filters: any = {};

    if (diet) {
      filters.diet = {
        equals: diet,
        mode: 'insensitive',
      };
    }

    if (cookingTime) {
      const cookingTimeNumber = Number(cookingTime);
      if (!isNaN(cookingTimeNumber)) {
        filters.cookingTime = {
          lte: cookingTimeNumber,
        };
      }
    }

    const recipes = await prisma.recipe.findMany({
      where: filters,
    });

    if (recipes.length > 0) {
      reply.send(recipes);
    } else {
      reply.status(404).send({ error: 'Рецепты не найдены по указанным фильтрам' });
    }
  } catch (error) {
    reply.status(500).send({ error: 'Ошибка при фильтрации рецептов' });
  }
};

const getRandomReceipt = async (request: FastifyRequest, reply: FastifyReply) => {
  const count = await prisma.recipe.count();
  const randomIndex = Math.floor(Math.random() * count);
  const tasks = await prisma.recipe.findMany({
    skip: randomIndex,
    take: 1,
  });
  reply.send(tasks);
};

export default {
  getReceipts,
  getRandomReceipt,
  getFilterReceipts
};
