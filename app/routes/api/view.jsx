import { db } from "~/utils/db.server";

export async function loader({ request }) {
  const url = new URL(request.url).searchParams.get("url") ?? "/views";

  // await db.view.deleteMany()

  try {
    await db.view.upsert({
      where: { url },
      update: {
        count: {
          increment: 1,
        },
      },
      create: { url },
    });
  } catch (error) {
    console.error(
      `Error while updating view count for '${request.url}'!`,
      error
    );
  }

  return {
    views: await db.view.findMany(),
  };
}
