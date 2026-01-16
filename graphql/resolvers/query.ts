import { GraphQLContext } from "../context";

export const Query = {
  me: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
    if (!ctx.session?.user) return null;
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { items: true },
    });
  },

  userById: async (_: unknown, { id }: { id: string }, ctx: GraphQLContext) => {
    return ctx.prisma.user.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { createdAt: "desc" },
          include: {
            category: true,
            rentPolicy: true,
          },
        },
      },
    });
  },

  categories: (_: unknown, __: unknown, ctx: GraphQLContext) => {
    return ctx.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  },

  items: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
    return ctx.prisma.item.findMany({
      where: {
        status: {
          in: ["AVAILABLE", "RESERVED"],
        },
      },
      include: {
        category: true,
        owner: true,
        rentPolicy: true,
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

  requests: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
    return ctx.prisma.request.findMany({
      where: { status: "OPEN" },
      include: {
        category: true,
        requester: true,
        requestRentPolicy: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  request: async (_: unknown, { id }: { id: string }, ctx: GraphQLContext) => {
    return ctx.prisma.request.findUnique({
      where: { id },
      include: {
        category: true,
        requester: true,
        requestRentPolicy: true,
      },
    });
  },
};
