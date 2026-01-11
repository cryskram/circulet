import { prisma } from "@/lib/prisma";

async function main() {
  const rentItems = await prisma.item.findMany({
    where: { type: "RENT", rentPolicy: null },
  });

  for (const item of rentItems) {
    await prisma.rentPolicy.create({
      data: {
        itemId: item.id,
        unit: "DAY",
        price: item.price ?? null,
        minDuration: 1,
      },
    });
  }

  console.log("rent migrations done");
}

main();
