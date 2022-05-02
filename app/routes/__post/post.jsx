import { redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";

import { addBatch } from "../../utils/posts.server";

import Button from "../../components/ui/Button";

import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Page from "../../components/layout/Page";

import {
  batchSchema,
  postSchema,
  getValidationErrors,
} from "../../helpers/validation";
import Batch from "../../components/pages/post/Batch";
import Footer from "../../components/layout/Footer";

export async function action({ request }) {
  const formData = await request.formData();

  let errors = {};

  const batch = {
    email: formData.get("email"),
    website: formData.get("website"),
    name: formData.get("name"),
    description: formData.get("description"),
    logoURL: formData.get("logoURL"),
    color: formData.get("color"),
    expiresAfter: formData.get("expiresAfter"),
  };

  const postCount = parseInt(formData.get("postCount")) || 0;

  errors = await getValidationErrors(batchSchema, {
    ...batch,
    postCount,
  });

  let posts = [];
  for (let i = 0; i < postCount; i++) {
    const post = {
      title: formData.get(`posts[${i}].title`),
      type: formData.get(`posts[${i}].type`),
      location: formData.get(`posts[${i}].location`),
      salaryStart:
        parseInt(formData.get(`posts[${i}].salaryStart`)) || undefined,
      salaryEnd: parseInt(formData.get(`posts[${i}].salaryEnd`)) || undefined,
      applyLink: formData.get(`posts[${i}].applyLink`),
      applyEmail: formData.get(`posts[${i}].applyEmail`),
      description: formData.get(`posts[${i}].description`),
      tags:
        (formData.get(`posts[${i}].tags`) || null)
          ?.split(",")
          .map(function (tag) {
            return tag.trim();
          }) ?? [],
    };

    const errorsInPost = await getValidationErrors(postSchema, post);

    for (const key in errorsInPost) {
      errors[`posts[${i}].${key}`] = errorsInPost[key];
    }

    posts.push(post);
  }

  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }

  const { error } = await addBatch(batch, posts);

  if (error) {
    errors.other = error;

    return {
      errors,
    };
  }

  return redirect("/?success=true");
}

export default function Post() {
  const actionData = useActionData();
  const transition = useTransition();

  return (
    <Page>
      <Header posting />

      <Main>
        <Form
          replace
          method="POST"
          className="flex flex-col items-stretch justify-start gap-8 w-[min(720px,_100%)] mx-auto"
        >
          <Batch errors={actionData?.errors} />

          {actionData?.errors ? (
            <p className="text-center text-red-400 text-xs">
              Please review the errors above.
            </p>
          ) : null}

          {actionData?.errors?.other ? (
            <p className="text-center text-red-400 text-xs">
              {actionData?.errors?.other}
            </p>
          ) : null}

          <div className="flex flex-row items-center justify-center gap-2">
            <Button type="submit" disabled={transition.state === "submitting"}>
              Post now
            </Button>
          </div>
        </Form>
      </Main>

      <Footer />
    </Page>
  );
}
