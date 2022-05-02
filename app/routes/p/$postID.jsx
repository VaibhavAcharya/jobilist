import { redirect } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Page from "../../components/layout/Page";
import { Post, PostCardWrapper } from "../../components/ui/Post";
import { db } from "../../utils/db.server";

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
      return {
        postData,
      };
    }
  } catch (error) {
    console.error(`Error fetching data for post ${postID}!`, error);
  }

  return redirect("/");
}

export default function PostExpanded() {
  const loaderData = useLoaderData();

  return (
    <Page>
      <Header />

      <Main>
        <PostCardWrapper>
          <Post post={loaderData.postData} expanded={true} />
        </PostCardWrapper>
      </Main>

      <Footer />
    </Page>
  );
}
