import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  console.log("Seeding database...");

  await prisma.report.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const categories = await prisma.category.createMany({
    data: [
      { name: "Books", slug: "books" },
      { name: "Calculators", slug: "calculators" },
      { name: "Electronics", slug: "electronics" },
      { name: "Stationery", slug: "stationery" },
      { name: "Miscellaneous", slug: "misc" },
    ],
  });

  const allCategories = await prisma.category.findMany();

  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@bmsce.ac.in",
      isProfileComplete: true,
      username: "alice01",
      gradYear: 2026,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@bmsce.ac.in",
      isProfileComplete: true,
      username: "bob_the_builder",
      gradYear: 2025,
    },
  });

  await prisma.item.createMany({
    data: [
      {
        title: "Engineering Mathematics Book",
        description: "Good condition, no markings.",
        price: 250,
        type: "SELL",
        images: [],
        ownerId: user1.id,
        categoryId: allCategories.find((c) => c.slug === "books")!.id,
      },
      {
        title: "Casio Scientific Calculator",
        description: "Barely used.",
        price: 500,
        type: "SELL",
        images: [],
        ownerId: user2.id,
        categoryId: allCategories.find((c) => c.slug === "calculators")!.id,
      },
      {
        title: "Laptop Stand",
        description: "Free to take.",
        type: "FREE",
        images: [],
        ownerId: user1.id,
        categoryId: allCategories.find((c) => c.slug === "misc")!.id,
      },
    ],
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
