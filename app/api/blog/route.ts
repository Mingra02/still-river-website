import { NextResponse } from "next/server";
import getPostMetadata from "@/components/getPostMetadata";

export async function GET() {
  const posts = getPostMetadata();
  return NextResponse.json(posts);
}
