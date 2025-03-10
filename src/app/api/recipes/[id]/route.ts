import { NextRequest, NextResponse } from "next/server";

import { withSessionUser } from "@/features/auth/services/session";
import { deleteRecipe } from "@/features/recipe/services/recipe";

export async function DELETE(
  _: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;

  return withSessionUser(async (_) => {
    const { id } = params;
    await deleteRecipe(id);
    return NextResponse.json("Deleted successfully");
  });
}
