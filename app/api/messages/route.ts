import { NextResponse } from "next/server";
import { Message } from "@prisma/client";

import { db } from "@/lib/db";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        // where: {
        //   channelId,
        // },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        // where: {
        //   channelId,
        // },

        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:56 ~ GET ~ error:", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { content, section, user } = await req.json();

    const message = await db.message.create({
      data: {
        content,
        section,
        user,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log("🚀 ~ file: route.ts:75 ~ POST ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
