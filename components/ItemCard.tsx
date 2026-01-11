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
    rentPolicy?: {
      unit: "HOUR" | "DAY" | "WEEK";
      price: number | null;
      minDuration: number;
    } | null;
  };
};

function formatRentUnit(unit: "HOUR" | "DAY" | "WEEK") {
  switch (unit) {
    case "HOUR":
      return "hr";
    case "DAY":
      return "day";
    case "WEEK":
      return "week";
  }
}

function getBlurUrl(imageUrl: string) {
  return imageUrl.replace("/upload/", "/upload/w_20,q_1,e_blur:200/");
}

export default function ItemCard({ item }: ItemCardProps) {
  const image = item.images?.[0];
  const rent = item.rentPolicy;

  return (
    <Link
      href={`/items/${item.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
        {image ? (
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL={getBlurUrl(image)}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400 dark:text-slate-500">
            No image
          </div>
        )}

        {item.type === "RENT" && (
          <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white dark:bg-white/90 dark:text-slate-900">
            Rent
          </span>
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
        <div className="font-medium text-slate-800 dark:text-slate-200">
          {item.type === "FREE" && "Free"}

          {item.type === "SELL" && item.price != null && `₹${item.price}`}

          {item.type === "RENT" && rent && (
            <>
              ₹{rent.price ?? 0}
              <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                / {formatRentUnit(rent.unit)}
              </span>
            </>
          )}
        </div>

        <span className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
          {item.type}
        </span>
      </div>

      {item.type === "RENT" && rent && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Min {rent.minDuration} {formatRentUnit(rent.unit)}
          {rent.minDuration > 1 ? "s" : ""}
        </p>
      )}
    </Link>
  );
}
