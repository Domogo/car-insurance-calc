import { saveOffer } from "@/util/mongodb";
import { NewOffer } from "@/util/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: NewOffer = await request.json();
  const result = await saveOffer(data);

  if (!result) {
    return NextResponse.json({ error: "Error saving offer" }, { status: 500 });
  }

  return NextResponse.json(result);
}
