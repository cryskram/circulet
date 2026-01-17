// CHATGPT BASED FAKE DATA FOR OPERATION TESTING

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.report.deleteMany();
  await prisma.requestRentPolicy.deleteMany();
  await prisma.request.deleteMany();
  await prisma.rentPolicy.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  await prisma.category.createMany({
    data: [
      { name: "Books", slug: "books" },
      { name: "Calculators", slug: "calculators" },
      { name: "Electronics", slug: "electronics" },
      { name: "Stationery", slug: "stationery" },
      { name: "Miscellaneous", slug: "misc" },
    ],
  });

  const categories = await prisma.category.findMany();
  const cat = (slug: string) => categories.find((c) => c.slug === slug)!.id;

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@bmsce.ac.in",
      role: "ADMIN",
      username: "admin",
      gradYear: 2024,
      isProfileComplete: true,
    },
  });

  const userSeedData: [string, string, string, number][] = [
    ["Alice", "alice@bmsce.ac.in", "alice01", 2026],
    ["Bob", "bob@bmsce.ac.in", "bob_the_builder", 2025],
    ["Charlie", "charlie@bmsce.ac.in", "charliec", 2027],
    ["Daisy", "daisy@bmsce.ac.in", "daisy_d", 2026],
  ];

  const users = await Promise.all(
    userSeedData.map(([name, email, username, gradYear]) =>
      prisma.user.create({
        data: {
          name,
          email,
          username,
          gradYear,
          isProfileComplete: true,
        },
      })
    )
  );

  await prisma.item.create({
    data: {
      title: "Engineering Mathematics Book",
      description: "Good condition, no markings.",
      price: 250,
      type: "SELL",
      images: [],
      ownerId: users[0].id,
      categoryId: cat("books"),
    },
  });

  await prisma.item.create({
    data: {
      title: "Casio Scientific Calculator",
      description: "Barely used, works perfectly.",
      price: 500,
      type: "SELL",
      images: [],
      ownerId: users[1].id,
      categoryId: cat("calculators"),
    },
  });

  await prisma.item.create({
    data: {
      title: "Laptop for Rent",
      description: "Dell Inspiron, good for projects.",
      type: "RENT",
      images: [],
      ownerId: users[2].id,
      categoryId: cat("electronics"),
      rentPolicy: {
        create: {
          unit: "DAY",
          price: 300,
          minDuration: 1,
          maxDuration: 7,
        },
      },
    },
  });

  await prisma.item.create({
    data: {
      title: "Notebook Set",
      description: "Free notebooks, unused.",
      type: "FREE",
      images: [],
      ownerId: users[3].id,
      categoryId: cat("stationery"),
    },
  });

  await prisma.request.create({
    data: {
      title: "Looking for DBMS Textbook",
      description: "Any edition is fine.",
      type: "BUY",
      budget: 400,
      categoryId: cat("books"),
      requesterId: users[1].id,
    },
  });

  await prisma.request.create({
    data: {
      title: "Need Calculator for Exam Week",
      description: "Borrow for 3 days.",
      type: "BORROW",
      categoryId: cat("calculators"),
      requesterId: users[2].id,
      requestRentPolicy: {
        create: {
          unit: "DAY",
          minDuration: 3,
        },
      },
    },
  });

  await prisma.request.create({
    data: {
      title: "Camera on Rent",
      description: "For college fest photography.",
      type: "RENT",
      categoryId: cat("electronics"),
      requesterId: users[3].id,
      requestRentPolicy: {
        create: {
          unit: "DAY",
          price: 500,
          minDuration: 2,
          maxDuration: 5,
        },
      },
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
