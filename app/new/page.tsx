"use client";

import Select from "@/components/Select";
import { CREATE_ITEM, GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import { uploadImage } from "@/lib/uploadImage";
import { useMutation, useQuery } from "@apollo/client/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">
          Post an item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="text-sm font-medium">Title *</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description *</label>
            <textarea
              className="mt-1 w-full rounded-md border px-3 py-2"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category *</label>
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
              <label className="text-sm font-medium">Type *</label>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="SELL">Sell</option>
                <option value="RENT">Rent</option>
                <option value="FREE">Free</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                type="number"
                className="mt-1 w-full rounded-md border px-3 py-2"
                disabled={type === "FREE"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Images</label>

            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-slate-400 hover:bg-slate-100">
              <span className="text-sm text-slate-700">
                Click to upload images
              </span>
              <span className="text-xs text-slate-500">
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
              <p className="mt-2 text-sm text-slate-600">
                {images.length} image{images.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full rounded-md bg-slate-900 py-2 text-white transition hover:shadow-md disabled:opacity-50"
          >
            {uploading ? "Uploading images..." : "Post item"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateItemPage;
