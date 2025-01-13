import { PrismaClient } from '@prisma/client';
import { fakerRU as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function generateRecipes() {
  const recipesCount = 10;
  const diets = ["Веганская", "Безглютеновая", "Кето", "Палео"];

  const recipes = Array.from({ length: recipesCount }).map(() => ({
    title: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
    ingredients: Array.from({ length: 5 }).map(() => faker.lorem.words(2)),
    cookingTime: faker.number.int({ min: 15, max: 60 }),
    diet: diets[faker.number.int({ min: 0, max: diets.length - 1 })],
  }));

  try {
    await prisma.recipe.createMany({
      data: recipes,
    });
    console.log(`${recipesCount} recipes generated successfully!`);
  } catch (err) {
    console.error('Error generating recipes:', err);
  } finally {
    await prisma.$disconnect();
  }
}

generateRecipes();
