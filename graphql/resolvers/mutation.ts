import { GraphQLContext } from "../context";

export const Mutation = {
  completeOnboarding: async (
    _: unknown,
    input: { phone?: string; username?: string; gradYear?: number },
    ctx: GraphQLContext
  ) => {
    if (!ctx.user?.email) {
      throw new Error("unauthorized");
    }

    await ctx.prisma.user.update({
      where: { email: ctx.user.email },
      data: {
        phone: input.phone,
        gradYear: input.gradYear,
        username: input.username,
        isProfileComplete: true,
      },
    });

    return true;
  },

  createItem: async (
    _: unknown,
    input: {
      title: string;
      description: string;
      price?: number;
      categoryId: string;
      type: "SELL" | "RENT" | "FREE";
      images: string[];
    },
    ctx: GraphQLContext
  ) => {
    if (!ctx.user?.email) {
      throw new Error("unauthorized");
    }

    return ctx.prisma.item.create({
      data: {
        ...input,
        ownerId: ctx.user.id,
      },
      include: {
        category: true,
        owner: true,
      },
    });
  },
};
