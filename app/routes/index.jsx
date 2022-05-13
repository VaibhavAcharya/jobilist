import { useEffect, useRef } from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";

import { db } from "../utils/db.server";

import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import { Post, PostCardWrapper } from "../components/ui/Post";

import Page from "../components/layout/Page";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Footer from "../components/layout/Footer";
import { DESCRIPTIONS, TITLES } from "../meta";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const afterPostSuccess = searchParams.get("success") === "true";
  const query = searchParams.get("search");

  try {
    let results = null;

    if (query) {
      const tokens = query
        .trim()
        .split(" ")
        .map(function (token) {
          return token.trim();
        });
      const tokensStringWithOR = tokens.join(" | ").replace("'", "/'");

      results = await db.post.findMany({
        where: {
          OR: [
            { title: { search: tokensStringWithOR } },
            { type: { search: tokensStringWithOR } },
            { location: { search: tokensStringWithOR } },
            { description: { search: tokensStringWithOR } },
            { tags: { hasSome: tokens } },
            {
              batch: {
                OR: [
                  {
                    name: {
                      search: tokensStringWithOR,
                    },
                  },
                  {
                    description: {
                      search: tokensStringWithOR,
                    },
                  },
                ],
              },
            },
          ],
        },
        orderBy: {
          batch: {
            createdAt: "desc",
          },
        },
        include: {
          batch: true,
        },
      });
    } else {
      results = await db.post.findMany({
        orderBy: {
          batch: {
            createdAt: "desc",
          },
        },
        include: {
          batch: true,
        },
      });
    }

    return json(
      {
        afterPostSuccess,
        results,
      },
      {
        headers: {
          "Cache-Control": "max-age=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    return {
      afterPostSuccess,
      error: "Unexpected error happened on server!",
    };
  }
}

export function meta() {
  return {
    title: TITLES.HOME,
    description: DESCRIPTIONS.HOME,
  };
}

export default function Index() {
  const loaderData = useLoaderData();
  const transition = useTransition();

  const afterPostSuccess = loaderData?.afterPostSuccess;

  const searchFieldRef = useRef();

  useEffect(
    function () {
      if (transition.state === "idle") {
        searchFieldRef.current?.focus();
      }
    },
    [transition]
  );

  return (
    <Page>
      <Header home showPitch afterPostSuccess={afterPostSuccess} />

      <Main className="flex flex-col items-stretch justify-start gap-8">
        <Form
          replace
          method="GET"
          className="flex flex-col items-stretch justify-start gap-2"
        >
          <label
            htmlFor="search"
            className="font-medium text-xs uppercase text-neutral-400"
          >
            Find your dream job now
          </label>
          <div className="flex flex-row items-stretch justify-start gap-2">
            <Field
              ref={searchFieldRef}
              id="search"
              className="flex-1"
              type="text"
              name="search"
              placeholder="Eg. Frontend developer, React.js, Tesla, etc."
              required={false}
              autoComplete="off"
              disabled={transition.state === "submitting"}
              autoFocus
            />
            <Button
              type="submit"
              ghost
              disabled={transition.state === "submitting"}
            >
              Search
            </Button>
          </div>
        </Form>

        <PostCardWrapper>
          {loaderData?.error ? (
            <p className="text-center text-red-400 py-2">{loaderData?.error}</p>
          ) : null}
          {loaderData?.results?.length === 0 ? (
            <p className="text-center py-2">
              No results found! Try searching for something else.
            </p>
          ) : null}
          {loaderData?.results?.map(function (result) {
            return <Post key={result.id} post={result} />;
          })}
        </PostCardWrapper>
      </Main>

      <Footer />
    </Page>
  );
}
