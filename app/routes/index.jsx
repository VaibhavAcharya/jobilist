import { useEffect, useRef } from "react";
import { json } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import { db } from "../utils/db.server";

import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import { Post, PostCardWrapper } from "../components/ui/Post";

import Page from "../components/layout/Page";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Footer from "../components/layout/Footer";

import { DESCRIPTIONS, TITLES } from "../meta";

import { emailSchema } from "../helpers/validation";
import { capitalizeSentence } from "../helpers/misc";

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

      results = await db.post.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { type: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { tags: { hasSome: tokens } },
            {
              batch: {
                OR: [
                  {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: query,
                      mode: "insensitive",
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

      await db.search.upsert({
        where: {
          query,
        },
        update: {
          count: {
            increment: 1,
          },
        },
        create: {
          query,
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

        query,
      },
      {
        headers: {
          "Cache-Control": "max-age=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return {
      afterPostSuccess,
      error: "Unexpected error happened on server!",
    };
  }
}

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const query = formData.get("query");

  if (emailSchema.isValidSync(email) && query) {
    try {
      await db.notification.upsert({
        where: {
          email_query: {
            email,
            query,
          },
        },
        update: {},
        create: {
          email,
          query,
        },
      });

      return {
        result:
          "We will now let you know when a job for this query is available.",
      };
    } catch (error) {
      console.error(error);

      return {
        error: "Unexpected error happened on server!",
      };
    }
  } else {
    return {
      error: "Please enter an valid email.",
    };
  }
}

export function meta({ data }) {
  return {
    title: data?.query
      ? `${capitalizeSentence(data.query)} jobs @ ${TITLES.HOME}`
      : TITLES.HOME,
    description: DESCRIPTIONS.HOME,
  };
}

export default function Index() {
  const loaderData = useLoaderData();

  const transition = useTransition();

  const afterPostSuccess = loaderData?.afterPostSuccess;

  const notifyFormRef = useRef();
  const notifyFetcher = useFetcher();

  useEffect(
    function () {
      if (notifyFetcher.type === "done" && notifyFetcher.data?.result) {
        notifyFormRef.current.reset();
      }
    },
    [notifyFetcher]
  );

  useEffect(
    function () {
      notifyFetcher.data = {};
    },
    [notifyFetcher, loaderData?.query]
  );

  const isBusy = transition.state !== "idle" || notifyFetcher.state !== "idle";

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
          <fieldset
            className="flex flex-row items-stretch justify-start gap-2"
            disabled={isBusy}
          >
            <Field
              id="search"
              className="flex-1"
              type="text"
              name="search"
              placeholder="Eg. Frontend developer, React.js, Tesla, etc."
              required={false}
              autoComplete="off"
              autoFocus
              defaultValue={loaderData?.query ?? ""}
            />
            <Button type="submit" ghost>
              Search
            </Button>
          </fieldset>
        </Form>

        <PostCardWrapper>
          {loaderData?.error ? (
            <p className="text-center text-red-400 py-6">{loaderData?.error}</p>
          ) : null}
          {loaderData?.results?.length === 0 ? (
            <div className="py-6 flex flex-col items-stretch justify-start gap-4">
              <p className="text-center">
                No results found! Try searching for something else.
              </p>
              <p className="text-center text-sm">OR</p>
              <notifyFetcher.Form
                ref={notifyFormRef}
                replace
                method="POST"
                className="flex flex-col items-stretch justify-start gap-2"
              >
                <fieldset
                  className="w-[min(320px,_100%)] mx-auto flex flex-col items-stretch justify-center flex-wrap gap-2"
                  disabled={isBusy}
                >
                  <input type="hidden" name="query" value={loaderData.query} />

                  <Field
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Eg. john@gmail.com"
                  />
                  <Button type="submit">Notify when available</Button>
                </fieldset>
              </notifyFetcher.Form>

              {notifyFetcher.state === "idle" ? (
                <>
                  {notifyFetcher.data?.result ? (
                    <p className="text-center text-green-400">
                      {notifyFetcher.data.result}
                    </p>
                  ) : null}

                  {notifyFetcher.data?.error ? (
                    <p className="text-center text-red-400">
                      {notifyFetcher.data.error}
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="text-center">Wait...</p>
              )}
            </div>
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
