import { useState } from "react";
import { Form, useActionData, useTransition } from "@remix-run/react";

import { addBatch } from "../../utils/posts.server";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";

import { uploadImage } from "../../utils/cloudinary";

import Button from "../../components/ui/Button";

import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Page from "../../components/layout/Page";
import Footer from "../../components/layout/Footer";

import Batch from "../../components/pages/post/Batch";

import {
  batchSchema,
  postSchema,
  getValidationErrors,
} from "../../helpers/validation";

import { DESCRIPTIONS, TITLES } from "../../meta";

export function meta() {
  return {
    title: `${TITLES.POST} / ${TITLES.HOME}`,
    description: DESCRIPTIONS.POST,
  };
}

export async function action({ request }) {
  const formData = await unstable_parseMultipartFormData(
    request,
    async function ({ stream, name, filename, ...otherProps }) {
      if (name === "logo" && filename) {
        const uploadedImage = await uploadImage(stream);

        return uploadedImage.secure_url;
      }

      stream.resume();
    }
  );

  let errors = {};

  const batch = {
    email: formData.get("email"),
    website: formData.get("website"),
    name: formData.get("name"),
    description: formData.get("description"),
    logoURL: formData.get("logo"),
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

  try {
    await addBatch(batch, posts);

    return redirect("/?success=true");
  } catch (e) {
    return {
      errors: {
        other: "Unexpected server error!",
      },
    };
  }
}

export default function Post() {
  const actionData = useActionData();
  const transition = useTransition();

  const [postCount, setPostCount] = useState(2);

  return (
    <Page>
      <Header posting />

      <Main>
        <Form
          replace
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col items-stretch justify-start gap-8 w-[min(720px,_100%)] mx-auto"
        >
          <Batch
            postCount={postCount}
            setPostCount={setPostCount}
            errors={actionData?.errors}
          />

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

          <div className="w-auto mx-auto flex flex-row items-end justify-center flex-wrap gap-2">
            <Button type="submit" disabled={transition.state !== "idle"}>
              Post
            </Button>
          </div>
        </Form>
      </Main>

      <Footer />
    </Page>
  );
}
