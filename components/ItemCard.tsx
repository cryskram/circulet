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
      className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col gap-3"
    >
      <div className="relative w-full overflow-hidden rounded-md bg-neutral-100 aspect-square">
        {image ? (
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={getBlurUrl(image)}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        )}
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-medium text-neutral-900 line-clamp-2">
          {item.title}
        </p>
        <p className="text-sm text-neutral-600">{item.category.name}</p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-neutral-800">
          {item.type === "FREE" ? "Free" : item.price ? `₹${item.price}` : ""}
        </span>

        <span className="text-xs uppercase tracking-wide text-neutral-500">
          {item.type}
        </span>
      </div>
    </Link>
  );
}
