import { json, redirect } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import { db } from "../../utils/db.server";

import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Page from "../../components/layout/Page";
import { Post, PostCardWrapper } from "../../components/ui/Post";

import { TITLES } from "../../meta";

export async function loader({ params }) {
  const postID = params.postID;

  try {
    const postData = await db.post.findUnique({
      where: {
        id: postID,
      },
      include: {
        batch: true,
      },
    });

    if (postData) {
      return json(postData, {
        headers: {
          "Cache-Control": "max-age=604800, stale-while-revalidate=86400",
        },
      });
    }
  } catch (error) {
    console.error(`Error fetching data for post ${postID}!`, error);
  }

  return redirect("/");
}

export function meta({ data }) {
  return {
    title: `${data.title} @ ${data.batch.name} / ${TITLES.HOME}`,
    description: `Apply at ${data.batch.name} for position of ${data.title} now.`,
  };
}

export default function PostExpanded() {
  const postData = useLoaderData();

  return (
    <Page>
      <Header />

      <Main>
        <PostCardWrapper>
          <Post post={postData} expanded={true} />
        </PostCardWrapper>
      </Main>

      <Footer />
    </Page>
  );
}
