import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { phone, username, gradYear } = body;

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      phone,
      username,
      gradYear,
      isProfileComplete: true,
    },
  });

  return NextResponse.json({ success: true });
}
