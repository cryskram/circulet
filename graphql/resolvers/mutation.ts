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

    if (input.gradYear && (input.gradYear < 2000 || input.gradYear > 2100)) {
      throw new Error("Invalid graduation year");
    }

    if (input.username && input.username.length > 20) {
      throw new Error("Username too long");
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

    if (input.title.length > 100) throw new Error("Title too long");
    if (input.images.length > 3) throw new Error("Max 3 images allowed");

    return ctx.prisma.item.create({
      data: {
        title: input.title.trim(),
        description: input.description.trim(),
        price: input.type === "FREE" ? null : input.price,
        type: input.type,
        categoryId: input.categoryId,
        images: input.images.slice(0, 3),
        ownerId: ctx.user.id,
      },
      include: {
        category: true,
        owner: true,
      },
    });
  },

  updateItem: async (
    _: unknown,
    input: {
      id: string;
      title: string;
      description: string;
      price?: number;
      categoryId: string;
      type: "SELL" | "RENT" | "FREE";
    },
    ctx: GraphQLContext
  ) => {
    const user = ctx.session?.user;
    if (!user) throw new Error("unauthorized");

    const item = await ctx.prisma.item.findUnique({
      where: { id: input.id },
    });

    if (!item) throw new Error("Item not found");

    const isOwner = item.ownerId === user.id;
    const isAdmin = ctx.session?.user.role === "ADMIN";

    if (!isOwner && !isAdmin) throw new Error("Forbidden");

    return ctx.prisma.item.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
        price: input.type === "FREE" ? null : input.price,
        type: input.type,
        categoryId: input.categoryId,
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
          return parts[1]?.replace(/\.[^/.]+$/, "");
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
