import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { setStudyItemCompletion } from "@/lib/study-items-db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as { completed?: unknown }).completed !== "boolean"
  ) {
    return NextResponse.json(
      { error: "Request body must include a boolean 'completed' field" },
      { status: 400 }
    );
  }

  const { id } = await params;

  try {
    const updated = await setStudyItemCompletion(
      id,
      userId,
      (body as { completed: boolean }).completed
    );

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update study item:", error);
    return NextResponse.json(
      { error: "Something went wrong updating the study item" },
      { status: 500 }
    );
  }
}