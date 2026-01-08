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

  deleteItem: async (
    _: unknown,
    { id }: { id: string },
    ctx: GraphQLContext
  ) => {
    if (!ctx.user?.email) {
      throw new Error("unauthorized");
    }
    const mItem = await ctx.prisma.item.findUnique({ where: { id } });

    if (!mItem) {
      throw new Error("Item not found");
    }

    const isOwner = mItem.ownerId === ctx.session?.user.id;
    const isAdmin = ctx.session?.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw new Error("forbidden");
    }

    try {
      const publicIds = mItem.images
        .map((url) => {
          const parts = url.split("/upload/");
          return parts[1].split(".")[0];
        })
        .filter(Boolean);

      if (publicIds.length) {
        const cloudinary = (await import("@/lib/cloudinary")).default;
        await cloudinary.api.delete_resources(publicIds);
      }
    } catch (err) {
      console.error("Failed to delete images", err);
    }

    return await ctx.prisma.item.delete({ where: { id } });
  },
};
