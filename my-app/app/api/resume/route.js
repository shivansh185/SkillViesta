import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma"; // Correct import if you renamed it to `db`

export async function POST(req) {
  try {
    const { userId } = auth();
    const { content } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingResume = await db.resume.findUnique({ where: { userId } });

    let resume;

    if (existingResume) {
      resume = await db.resume.update({
        where: { userId },
        data: { content },
      });
    } else {
      resume = await db.resume.create({
        data: {
          userId,
          content,
        },
      });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
