import { GraphQLContext } from "../context";

export const Query = {
  me: (_: unknown, __: unknown, ctx: GraphQLContext) => {
    return ctx.user;
  },

  categories: (_: unknown, __: unknown, ctx: GraphQLContext) => {
    return ctx.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  },

  items: (_: unknown, __: unknown, ctx: GraphQLContext) => {
    return ctx.prisma.item.findMany({
      where: { status: "AVAILABLE" },
      include: {
        category: true,
        owner: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  item: async (_: unknown, { id }: { id: string }, ctx: GraphQLContext) => {
    const mItem = await ctx.prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
        owner: true,
        rentPolicy: true,
      },
    });

    if (!mItem) return null;

    return mItem;
  },
};
