import { serializeBigInt } from "@ojpp/api";
import { prisma } from "@ojpp/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const elections = await prisma.election.findMany({
      include: {
        results: {
          include: { party: true },
          orderBy: { seatsWon: "desc" },
        },
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(serializeBigInt(elections));
  } catch (error) {
    console.error("[SeatMap API] Election query failed:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
