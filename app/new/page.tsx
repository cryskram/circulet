"use client";

import Select from "@/components/Select";
import { CREATE_ITEM, GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import { uploadImage } from "@/lib/uploadImage";
import { useMutation, useQuery } from "@apollo/client/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

export default function CreateItemPage() {
  const { data } = useQuery<any>(GET_ITEMS_AND_CATEGORIES);

  const [createItem, { loading }] = useMutation(CREATE_ITEM, {
    onCompleted: (data: any) => {
      toast.success("Item created");
      window.location.replace(`/items/${data.createItem.id}`);
    },
    onError: () => toast.error("Failed to create"),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"SELL" | "RENT" | "FREE">("SELL");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [rentUnit, setRentUnit] = useState<"HOUR" | "DAY" | "WEEK">("DAY");
  const [rentPrice, setRentPrice] = useState("");
  const [minDuration, setMinDuration] = useState(1);
  const [maxDuration, setMaxDuration] = useState("");

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description || !categoryId) {
      toast.error("Please fill all required fields");
      return;
    }

    if (type === "RENT" && (!rentUnit || !minDuration)) {
      toast.error("Please fill rent details");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setUploading(true);

      const uploadedImages: string[] = [];
      for (const file of images) {
        const { url } = await uploadImage(file);
        uploadedImages.push(url);
      }

      await createItem({
        variables: {
          title,
          description,
          type,
          categoryId,
          images: uploadedImages,

          price: type === "SELL" ? Number(price) : null,

          rentPolicy:
            type === "RENT"
              ? {
                  unit: rentUnit,
                  price: rentPrice ? Number(rentPrice) : null,
                  minDuration: Number(minDuration),
                  maxDuration: maxDuration ? Number(maxDuration) : null,
                }
              : null,
        },
      });
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file as any));
    };
  }, [images]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Add an item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Description *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Category *
            </label>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
              {data?.categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Type *
              </label>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="SELL">Sell</option>
                <option value="RENT">Rent</option>
                <option value="FREE">Free</option>
              </Select>
            </div>

            {type === "SELL" && (
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            )}
          </div>

          {type === "RENT" && (
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                Rent details
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={rentUnit}
                  onChange={(e) => setRentUnit(e.target.value as any)}
                >
                  <option value="HOUR">Per hour</option>
                  <option value="DAY">Per day</option>
                  <option value="WEEK">Per week</option>
                </Select>

                <input
                  type="number"
                  placeholder="Price per unit"
                  value={rentPrice}
                  onChange={(e) => setRentPrice(e.target.value)}
                  className="rounded-md border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />

                <input
                  type="number"
                  placeholder="Min duration"
                  value={minDuration}
                  onChange={(e) => setMinDuration(Number(e.target.value))}
                  className="rounded-md border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />

                <input
                  type="number"
                  placeholder="Max duration (optional)"
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(e.target.value)}
                  className="rounded-md border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Images
            </label>

            <label
              className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center ${
                images.length >= 3
                  ? "cursor-not-allowed opacity-50"
                  : "bg-slate-50 dark:bg-slate-900"
              }`}
            >
              <span className="text-sm">Click to upload images</span>
              <span className="text-xs text-slate-500">
                Max 3 images • Up to 5MB each
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                disabled={images.length >= 3}
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  const MAX_IMAGES = 3;
                  const MAX_SIZE_MB = 5;

                  const validFiles = files.filter(
                    (file) => file.size <= MAX_SIZE_MB * 1024 * 1024
                  );

                  if (validFiles.length !== files.length) {
                    toast.error("Each image must be under 5MB");
                  }

                  const remainingSlots = MAX_IMAGES - images.length;

                  if (remainingSlots <= 0) {
                    toast.error("You can upload a maximum of 3 images");
                    e.target.value = "";
                    return;
                  }

                  if (validFiles.length > remainingSlots) {
                    if (images.length === 0) {
                      toast.error("You can upload a maximum of 3 images");
                    } else {
                      toast.error(
                        `You can upload only ${remainingSlots} more image(s)`
                      );
                    }
                  }

                  setImages((prev) => [
                    ...prev,
                    ...validFiles.slice(0, remainingSlots),
                  ]);

                  e.target.value = "";
                }}
              />
            </label>

            <p className="mt-2 text-xs text-slate-500">
              {images.length} / 3 images selected
            </p>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((file, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-md border"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 rounded-full bg-black/70 p-2"
                    >
                      <FaTrash className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
          >
            {uploading ? "Uploading images..." : "Post item"}
          </button>
        </form>
      </div>
    </main>
  );
}
