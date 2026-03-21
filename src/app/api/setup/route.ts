import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const adminCount = await prisma.user.count({
      where: { role: "admin" },
    });

    if (adminCount > 0) {
      return NextResponse.json({ setupAvailable: false });
    }

    return NextResponse.json({ setupAvailable: true });
  } catch (error) {
    console.error("Setup Check Error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminCount = await prisma.user.count({
      where: { role: "admin" },
    });

    if (adminCount > 0) {
      return new NextResponse("Setup has already been completed.", {
        status: 403,
      });
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Setup POST Error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
