"use client";

import Select from "@/components/Select";
import { CREATE_ITEM, GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import { uploadImage } from "@/lib/uploadImage";
import { useMutation, useQuery } from "@apollo/client/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

const CreateItemPage = () => {
  const { data } = useQuery<any>(GET_ITEMS_AND_CATEGORIES);

  const [createItem, { loading }] = useMutation(CREATE_ITEM, {
    onCompleted: (data: any) => {
      toast.success("Item created");
      window.location.replace(`/items/${data.createItem.id}`);
    },
    onError: () => {
      toast.error("Failed to create");
    },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("SELL");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description || !categoryId) {
      toast.error("Please fill all required fields");
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
          price: price ? Number(price) : null,
          type,
          categoryId,
          images: uploadedImages,
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
          Post an item
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
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Description *
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="SELL">Sell</option>
                <option value="RENT">Rent</option>
                <option value="FREE">Free</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Price
              </label>
              <input
                type="number"
                disabled={type === "FREE"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-300 dark:disabled:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Images
            </label>

            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700">
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Click to upload images
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                PNG, JPG up to 5MB each
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => setImages(Array.from(e.target.files ?? []))}
              />
            </label>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <Image
                      width={256}
                      height={256}
                      src={URL.createObjectURL(file)}
                      alt={`Selected image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black"
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
};

export default CreateItemPage;
