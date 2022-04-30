import { useEffect, useState } from "react";

import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import Button from "../../components/ui/Button";
import Field from "./../../components/ui/Field";
import Textarea from "../../components/ui/Textarea";
import Slider from "../../components/ui/Slider";

import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Page from "../../components/layout/Page";
import Select from "../../components/ui/Select";
import { addColorBoxToOptions } from "../../components/ui/ColorBox";

import {
  BRAND_COLOR_OPTIONS,
  JOB_EXPIRE_OPTIONS,
  JOB_TYPES_OPTIONS,
} from "../../constants";

import {
  batchSchema,
  getValidationErrors,
  postSchema,
} from "../../helpers/validation";

import { activeBatch, addBatch } from "../../../utils/posts.server";
import {
  addTransaction,
  checkTransaction,
  createPaymentUrl,
  paymentStatus,
} from "../../../utils/payment.server";

const BRAND_COLOR_OPTIONS_WITH_BALL = addColorBoxToOptions(BRAND_COLOR_OPTIONS);

export async function loader({ request }) {
  const url = new URL(request.url);
  const transactionId = url.searchParams.get("transactionId");

  if (transactionId) {
    const transactionExists = await checkTransaction(transactionId);
    if (transactionExists) return null;

    const payStatus = await paymentStatus(transactionId);
    if (payStatus.status === "paid") {
      const activateBatch = await activeBatch(payStatus.data.postId);
      addTransaction(transactionId);

      if (activateBatch) {
        return redirect("/?success=true");
      }
    }
    return null;
  }
  return null;
}

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

  const addedBatch = await addBatch(batch, posts);
  if (addedBatch) {
    const expiresAtId = JOB_EXPIRE_OPTIONS.find(
      (e) => e.value === batch.expiresAfter
    );
    if (addedBatch.isActive === false) {
      const paymentUrl = await createPaymentUrl(
        addedBatch?.id,
        addedBatch?.color,
        expiresAtId?.price
      );

      if (paymentUrl) {
        return redirect(paymentUrl);
      }
    }
    return redirect("/?success=true");
  }

  return null;
}

export default function Post() {
  const data = useActionData();

  const [postCount, setPostCount] = useState(2);

  useEffect(
    function () {
      console.log(data);
    },
    [data]
  );

  return (
    <Page>
      <Header posting />

      <Main>
        <Form
          method="POST"
          className="flex flex-col items-stretch justify-start gap-8"
        >
          <section
            id="section-company"
            className="w-[min(720px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-6"
          >
            <h2 className="font-medium text-2xl">Enter company information</h2>

            <div className="flex flex-col items-stretch justify-start gap-4">
              <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
                <Field
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="Eg. Google"
                  error={data?.errors?.name}
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Eg. google@gmail.com"
                  secret
                  error={data?.errors?.email}
                />
              </div>
              <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
                <Field
                  id="website"
                  name="website"
                  type="url"
                  label="Website"
                  placeholder="Eg. https://www.google.com"
                  error={data?.errors?.website}
                />
                <Field
                  component={Select}
                  id="color"
                  name="color"
                  label="Brand color"
                  options={BRAND_COLOR_OPTIONS_WITH_BALL}
                  defaultOption={BRAND_COLOR_OPTIONS_WITH_BALL[0]}
                  error={data?.errors?.color}
                />
              </div>
              {/* <Field component={FileInput} id="logo" name="logo" label="Logo" accept="image/*" /> */}
              <Field
                component={Textarea}
                id="description"
                name="description"
                label="Description"
                placeholder="Describe what your organization does here..."
                rows="5"
                optional
                error={data?.errors?.description}
              />

              <Field
                component={Slider}
                id="postCount"
                name="postCount"
                label="Number of posts"
                defaultValue={[postCount]}
                min={1}
                max={10}
                onChange={setPostCount}
                error={data?.errors?.postCount}
              />

              <Field
                component={Select}
                id="expiresAfter"
                name="expiresAfter"
                label="Expires after"
                options={JOB_EXPIRE_OPTIONS}
                defaultOption={JOB_EXPIRE_OPTIONS[1]}
                error={data?.errors?.expiresAfter}
              />
            </div>
          </section>

          <section
            id="section-posts"
            className="w-[min(720px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-6"
          >
            <h2 className="font-medium text-2xl">Fill posts</h2>

            <div className="flex flex-col items-stretch justify-start gap-0 border-y border-dashed border-neutral-800 divide-y divide-dashed divide-neutral-800">
              {[...Array(postCount)].map(function (_, i) {
                return (
                  <article
                    key={i}
                    className="p-4 bg-white/5 flex flex-col items-stretch justify-start gap-6"
                  >
                    <div className="flex flex-row items-start justify-start flex-wrap gap-6">
                      <h3 className="font-medium text-xl">#{i + 1}</h3>
                      <div className="flex-1 flex flex-col items-stretch justify-start gap-6">
                        <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
                          <Field
                            id={`posts[${i}].title`}
                            error={data?.errors?.[`posts[${i}].title`]}
                            name={`posts[${i}].title`}
                            type="text"
                            label="Title"
                            placeholder="Eg. Android Developer"
                          />
                          <Field
                            component={Select}
                            id={`posts[${i}].type`}
                            error={data?.errors?.[`posts[${i}].type`]}
                            name={`posts[${i}].type`}
                            label="Type"
                            options={JOB_TYPES_OPTIONS}
                            defaultOption={JOB_TYPES_OPTIONS[0]}
                          />
                        </div>
                        <Field
                          id={`posts[${i}].location`}
                          error={data?.errors?.[`posts[${i}].location`]}
                          name={`posts[${i}].location`}
                          type="text"
                          label="Location"
                          placeholder="Eg. Remote, Bangalore, London"
                        />
                        <div className="flex-1 flex flex-col items-stretch justify-start gap-2">
                          <p className="font-medium text-sm uppercase flex flex-row items-baseline justify-start gap-2">
                            <span>Salary range</span>
                            <span className="text-green-200">($ / year)</span>
                          </p>
                          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
                            <Field
                              id={`posts[${i}].salaryStart`}
                              error={data?.errors?.[`posts[${i}].salaryStart`]}
                              name={`posts[${i}].salaryStart`}
                              type="number"
                              label="Start"
                              placeholder="Eg. 15000"
                            />
                            <Field
                              id={`posts[${i}].salaryEnd`}
                              error={data?.errors?.[`posts[${i}].salaryEnd`]}
                              name={`posts[${i}].salaryEnd`}
                              type="number"
                              label="End"
                              placeholder="Eg. 17000"
                            />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-stretch justify-start gap-2">
                          <p className="font-medium text-sm uppercase">
                            Apply Options
                          </p>
                          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
                            <Field
                              id={`posts[${i}].applyLink`}
                              error={data?.errors?.[`posts[${i}].applyLink`]}
                              name={`posts[${i}].applyLink`}
                              type="url"
                              label="Link"
                              placeholder="Eg. https://careers.google.com"
                              optional
                            />
                            <Field
                              id={`posts[${i}].applyEmail`}
                              error={data?.errors?.[`posts[${i}].applyEmail`]}
                              name={`posts[${i}].applyEmail`}
                              type="email"
                              label="Email"
                              placeholder="Eg. jobs@google.com"
                              optional
                            />
                          </div>
                        </div>
                        <Field
                          component={Textarea}
                          id={`posts[${i}].description`}
                          error={data?.errors?.[`posts[${i}].description`]}
                          name={`posts[${i}].description`}
                          label="Description"
                          placeholder="Describe the job here; areas of responsibility, typical day of candidate, skills and qualifications required to perform the role."
                          rows="5"
                          optional
                        />
                        <Field
                          id={`posts[${i}].tags`}
                          error={data?.errors?.[`posts[${i}].tags`]}
                          name={`posts[${i}].tags`}
                          type="text"
                          label="Tags (Comma separated, max 6)"
                          placeholder="Eg. flutter, android, anything"
                        />
                        {/* <div className="flex flex-row items-stretch justify-end flex-wrap gap-4">
                          <Field
                            component={Select}
                            id={`posts[${i}].pinned`}
                            name={`posts[${i}].pinned`}
                            label="Pin to top"
                            options={JOB_PIN_OPTIONS}
                            defaultOption={JOB_PIN_OPTIONS[0]}
                          />
                        </div> */}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <h2 className="font-medium text-2xl">Invoice</h2>
            <div className="flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
              <ul className="flex flex-row items-stretch justify-start divide-x divide-dashed divide-neutral-800">
                <li className="px-2 py-1 flex-1 font-medium bg-white/5">
                  Item
                </li>
                <li className="px-2 py-1 flex-1 font-medium bg-white/5">
                  Price
                </li>
                <li className="px-2 py-1 flex-1 font-medium bg-white/5">
                  Quantity
                </li>
                <li className="px-2 py-1 flex-1 font-medium bg-white/5">
                  Total
                </li>
              </ul>
              <div className="flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
                <ul className="flex flex-row items-stretch justify-center divide-x divide-dashed divide-neutral-800">
                  <li className="px-2 py-1 flex-1 font-medium bg-white/5">
                    Post
                  </li>
                  <li className="px-2 py-1 flex-1">$1</li>
                  <li className="px-2 py-1 flex-1">{postCount}</li>
                  <li className="px-2 py-1 flex-1">${postCount}</li>
                </ul>
                <ul className="flex flex-row items-stretch justify-center divide-x divide-dashed divide-neutral-800">
                  <li className="px-2 py-1 flex-1 font-medium bg-white/5">
                    Branded
                  </li>
                  <li className="px-2 py-1 flex-1">$1</li>
                  <li className="px-2 py-1 flex-1">2</li>
                  <li className="px-2 py-1 flex-1">$2</li>
                </ul>
                <ul className="flex flex-row items-stretch justify-center">
                  <li className="px-2 py-1 flex-1" />
                  <li className="px-2 py-1 flex-1" />
                  <li className="px-2 py-1 flex-1" />
                  <li className="px-2 py-1 flex-1 font-bold text-lg text-green-200">
                    $5
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-2">
              <Button type="submit">Pay & post</Button>
            </div>
          </section>
        </Form>
      </Main>
    </Page>
  );
}
