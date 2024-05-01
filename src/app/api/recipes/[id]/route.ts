import { NextRequest, NextResponse } from "next/server";

import { deleteRecipe } from "@/service/recipe";

import { withSessionUser } from "@/lib/session";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  return withSessionUser(async (_) => {
    const { id } = params;
    await deleteRecipe(id);
    return NextResponse.json("Deleted successfully");
  });
}
