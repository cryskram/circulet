import Image from "next/image";
import Link from "next/link";

type ItemCardProps = {
  item: {
    id: string;
    title: string;
    price: number | null;
    type: "SELL" | "RENT" | "FREE";
    images?: string[];
    category: {
      name: string;
      slug: string;
    };
  };
};

function getBlurUrl(imageUrl: string) {
  return imageUrl.replace("/upload/", "/upload/w_20,q_1,e_blur:200/");
}

export default function ItemCard({ item }: ItemCardProps) {
  const image = item.images?.[0];

  return (
    <Link
      href={`/items/${item.id}`}
      className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-slate-900/50"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
        {image ? (
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={getBlurUrl(image)}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400 dark:text-slate-500">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <p className="line-clamp-2 font-medium text-slate-900 dark:text-slate-100">
          {item.title}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {item.category.name}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {item.type === "FREE" ? "Free" : item.price ? `₹${item.price}` : ""}
        </span>

        <span className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
          {item.type}
        </span>
      </div>
    </Link>
  );
}
