import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "circulet/items",
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: "circulet/items",
  });
}
