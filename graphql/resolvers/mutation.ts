import { ItemStatus, RentUnit } from "@/app/generated/prisma/enums";
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
      rentPolicy?: {
        unit: "HOUR" | "DAY" | "WEEK";
        price?: number;
        minDuration: number;
        maxDuration?: number;
      };
    },
    ctx: GraphQLContext
  ) => {
    if (!ctx.user?.id) throw new Error("unauthorized");

    if (!input.images || input.images.length === 0) {
      throw new Error("At least one image is required");
    }

    if (input.images.length > 3) {
      throw new Error("Maximum 3 images allowed");
    }

    if (input.type === "RENT") {
      if (!input.rentPolicy) {
        throw new Error("Rent policy required");
      }

      const { unit, price, minDuration, maxDuration } = input.rentPolicy;

      return ctx.prisma.item.create({
        data: {
          title: input.title,
          description: input.description,
          type: "RENT",
          categoryId: input.categoryId,
          images: input.images,
          ownerId: ctx.user.id,

          rentPolicy: {
            create: {
              unit: unit as RentUnit,
              price: price ?? null,
              minDuration,
              maxDuration: maxDuration ?? null,
            },
          },
        },
        include: {
          rentPolicy: true,
          category: true,
          owner: true,
        },
      });
    }

    return ctx.prisma.item.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.type === "SELL" ? input.price : null,
        type: input.type,
        categoryId: input.categoryId,
        images: input.images,
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
      rentPolicy?: {
        unit: "HOUR" | "DAY" | "WEEK";
        price?: number;
        minDuration: number;
        maxDuration?: number;
      };
    },
    ctx: GraphQLContext
  ) => {
    const user = ctx.session?.user;
    if (!user) throw new Error("unauthorized");

    const item = await ctx.prisma.item.findUnique({
      where: { id: input.id },
      include: { rentPolicy: true },
    });

    if (!item) throw new Error("Item not found");

    const isOwner = item.ownerId === user.id;
    const isAdmin = user.role === "ADMIN";
    if (!isOwner && !isAdmin) throw new Error("forbidden");

    if (input.price !== undefined && input.price < 0) {
      throw new Error("Invalid price");
    }

    if (input.type === "RENT") {
      if (!input.rentPolicy) {
        throw new Error("Rent policy required");
      }

      const { unit, price, minDuration, maxDuration } = input.rentPolicy;

      if (price !== undefined && price < 0) {
        throw new Error("Invalid rent price");
      }

      return ctx.prisma.item.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          type: "RENT",
          categoryId: input.categoryId,

          rentPolicy: {
            upsert: {
              create: {
                unit: unit as RentUnit,
                price: price ?? null,
                minDuration,
                maxDuration: maxDuration ?? null,
              },
              update: {
                unit: unit as RentUnit,
                price: price ?? null,
                minDuration,
                maxDuration: maxDuration ?? null,
              },
            },
          },
        },
        include: {
          rentPolicy: true,
        },
      });
    }

    return ctx.prisma.item.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
        price: input.type === "SELL" ? input.price : null,
        type: input.type,
        categoryId: input.categoryId,
        rentPolicy: item.rentPolicy ? { delete: true } : undefined,
      },
    });
  },

  deleteItem: async (
    _: unknown,
    { id }: { id: string },
    ctx: GraphQLContext
  ) => {
    if (!ctx.session?.user) {
      throw new Error("unauthorized");
    }

    const item = await ctx.prisma.item.findUnique({ where: { id } });

    if (!item) {
      throw new Error("Item not found");
    }

    const isOwner = item.ownerId === ctx.session.user.id;
    const isAdmin = ctx.session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw new Error("forbidden");
    }

    try {
      const publicIds = item.images
        .map((url) => {
          const uploadIndex = url.indexOf("/upload/");
          if (uploadIndex === -1) return null;

          const path = url.substring(uploadIndex + 8);
          const noVersion = path.replace(/^v\d+\//, "");
          const noExt = noVersion.replace(/\.[^/.]+$/, "");

          return noExt;
        })
        .filter(Boolean) as string[];

      if (publicIds.length > 0) {
        const cloudinary = (await import("@/lib/cloudinary")).default;

        await cloudinary.api.delete_resources(publicIds, {
          resource_type: "image",
        });
      }
    } catch (err) {
      console.error("Failed to delete Cloudinary images", err);
    }

    return await ctx.prisma.item.delete({ where: { id } });
  },

  markItemStatus: async (
    _: unknown,
    { id, status }: { id: string; status: ItemStatus },
    ctx: GraphQLContext
  ) => {
    if (!ctx.session?.user) throw new Error("unauthorized");

    const item = await ctx.prisma.item.findUnique({ where: { id } });
    if (!item) throw new Error("not found");

    const isOwner = item.ownerId === ctx.session.user.id;
    const isAdmin = ctx.session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) throw new Error("forbidden");

    return ctx.prisma.item.update({
      where: { id },
      data: { status },
    });
  },

  createRequest: async (
    _: unknown,
    input: {
      title: string;
      description?: string;
      type: "BUY" | "RENT" | "BORROW";
      categoryId: string;
      budget?: number;
      requestRentPolicy?: {
        unit: "HOUR" | "DAY" | "WEEK";
        price?: number;
        minDuration: number;
        maxDuration?: number;
      };
    },
    ctx: GraphQLContext
  ) => {
    if (!ctx.session?.user) throw new Error("unauthorized");

    if (input.type !== "BUY" && !input.requestRentPolicy) {
      throw new Error("Rent policy required");
    }

    return ctx.prisma.request.create({
      data: {
        title: input.title,
        description: input.description,
        type: input.type,
        budget: input.type === "BUY" ? input.budget : null,
        categoryId: input.categoryId,
        requesterId: ctx.session.user.id,

        requestRentPolicy:
          input.type !== "BUY"
            ? {
                create: {
                  unit: input.requestRentPolicy!.unit as RentUnit,
                  price: input.requestRentPolicy!.price ?? null,
                  minDuration: input.requestRentPolicy!.minDuration,
                  maxDuration: input.requestRentPolicy!.maxDuration ?? null,
                },
              }
            : undefined,
      },
      include: {
        category: true,
        requester: true,
        requestRentPolicy: true,
      },
    });
  },

  closeRequest: async (
    _: unknown,
    { id }: { id: string },
    ctx: GraphQLContext
  ) => {
    if (!ctx.session?.user) throw new Error("unauthorized");

    const request = await ctx.prisma.request.findUnique({ where: { id } });
    if (!request) throw new Error("Not found");

    const isOwner = request.requesterId === ctx.session.user.id;
    const isAdmin = ctx.session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) throw new Error("forbidden");

    await ctx.prisma.request.update({
      where: { id },
      data: { status: "CLOSED" },
    });

    return true;
  },
};
