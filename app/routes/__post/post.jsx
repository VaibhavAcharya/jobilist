import { useEffect, useState } from "react";

import { json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

import Button from "../../components/ui/Button";
import Field from "./../../components/ui/Field";
import Textarea from "../../components/ui/Textarea";
import FileInput from "../../components/ui/FileInput";
import Slider from "../../components/ui/Slider";

import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import Page from "../../components/layout/Page";
import Select from "../../components/ui/Select";
import Switch from "../../components/ui/Switch";
import { addColorBallToOptions } from "../../components/ui/ColorBall";

import {
  BRAND_COLOR_OPTIONS,
  JOB_EXPIRE_OPTIONS,
  JOB_TYPES,
} from "../../constants";
const BRAND_COLOR_OPTIONS_WITH_BALL =
  addColorBallToOptions(BRAND_COLOR_OPTIONS);

export async function action({ request }) {
  const formData = await request.formData();

  const data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const website = formData.get("website");
  const description = formData.get("description");

  const postCount = formData.get("postCount");
  let posts = [];

  for (let i = 0; i < postCount; i++) {
    const post = {
      title: formData.get(`posts[${i}].title`),
      type: formData.get(`posts[${i}].type`),
      department: formData.get(`posts[${i}].department`),
      location: formData.get(`posts[${i}].location`),
      salaryStart: Number(formData.get(`posts[${i}].salaryStart`)),
      salaryEnd: Number(formData.get(`posts[${i}].salaryEnd`)),
      applyLink: formData.get(`posts[${i}].applyLink`),
      applyEmail: formData.get(`posts[${i}].applyEmail`),
      description: formData.get(`posts[${i}].description`),
      tags: formData
        .get(`posts[${i}].tags`)
        ?.split(",")
        .map(function (tag) {
          return tag.trim();
        }),
    };

    console.log(post);

    posts.push(post);
  }

  return json({ posts });
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
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Eg. google@gmail.com"
                  secret
                />
              </div>
              <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
                <Field
                  id="website"
                  name="website"
                  type="url"
                  label="Website"
                  placeholder="Eg. https://www.google.com"
                />
                <Field
                  component={Select}
                  id="color"
                  name="color"
                  label="Brand color"
                  options={BRAND_COLOR_OPTIONS_WITH_BALL}
                  defaultOption={BRAND_COLOR_OPTIONS_WITH_BALL[0]}
                />
              </div>
              {/* <Field component={FileInput} id="logo" name="logo" label="Logo" accept="image/*" /> */}
              <Field
                component={Textarea}
                id="description"
                name="description"
                label="Description"
                rows="5"
                optional
              />

              <Field
                component={Slider}
                id="postCount"
                name="postCount"
                type="hidden"
                label="Number of posts"
                defaultValue={[postCount]}
                min={1}
                max={10}
                onChange={setPostCount}
              />
            </div>
          </section>

          <section
            id="section-posts"
            className="w-[min(720px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-6"
          >
            <h2 className="font-medium text-2xl">Fill posts</h2>

            <div className="flex flex-col items-stretch justify-start gap-0 divide-y divide-dashed divide-neutral-800">
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
                            name={`posts[${i}].title`}
                            type="text"
                            label="Title"
                            placeholder="Eg. Android Developer"
                          />
                          <Field
                            component={Select}
                            id={`posts[${i}].type`}
                            name={`posts[${i}].type`}
                            label="Type"
                            options={JOB_TYPES}
                            defaultOption={JOB_TYPES[0]}
                          />
                        </div>
                        <Field
                          id={`posts[${i}].location`}
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
                              name={`posts[${i}].salaryStart`}
                              type="number"
                              label="Start"
                              placeholder="Eg. 15000"
                              optional
                            />
                            <Field
                              id={`posts[${i}].salaryEnd`}
                              name={`posts[${i}].salaryEnd`}
                              type="number"
                              label="End"
                              placeholder="Eg. 17000"
                              optional
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
                              name={`posts[${i}].applyLink`}
                              type="url"
                              label="Link"
                              placeholder="Eg. https://careers.google.com"
                              optional
                            />
                            <Field
                              id={`posts[${i}].applyEmail`}
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
                          name={`posts[${i}].description`}
                          label="Description"
                          rows="5"
                          optional
                        />
                        <Field
                          id={`posts[${i}].tags`}
                          name={`posts[${i}].tags`}
                          type="text"
                          label="Tags (Comma separated)"
                          placeholder="Eg. flutter, android, anything"
                        />
                        <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
                          <Field
                            component={Select}
                            id={`posts[${i}].branded`}
                            name={`posts[${i}].branded`}
                            label="Expires after"
                            options={JOB_EXPIRE_OPTIONS}
                            defaultOption={JOB_EXPIRE_OPTIONS[0]}
                          />
                          <Field
                            component={Switch}
                            id={`posts[${i}].branded`}
                            name={`posts[${i}].branded`}
                            label="Show branded"
                          />
                        </div>
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
