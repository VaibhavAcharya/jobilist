import { Fragment } from "react";
import { Link } from "@remix-run/react";

import Anchor from "./Anchor";
import Button from "./Button";
import Chip from "./Chip";

import Cash from "../icons/Cash";
import Location from "../icons/Location";
import External from "../icons/External";
import Sparkles from "../icons/Sparkles";
import Mail from "../icons/Mail";
import Office from "../icons/Office";

import { BRAND_COLOR_OPTIONS, JOB_TYPES_OPTIONS } from "../../constants";

export function Post({ post, expanded = false }) {
  return (
    <PostCard
      className={[
        "flex flex-col items-stretch justify-start gap-4",
        BRAND_COLOR_OPTIONS.find(function (option) {
          return option.value === post.batch.color;
        })?.postBG ?? BRAND_COLOR_OPTIONS[0].postBG,
      ].join(" ")}
    >
      <div className="flex flex-row items-start justify-start gap-4">
        <Anchor
          href={`${post.batch.website}?ref=https://www.jobilist.com`}
          target="_blank"
          rel="noopener noreferrer"
          styled={false}
          className="font-medium"
        >
          {post.batch?.logoURL ? (
            <img
              src={post.batch.logoURL}
              alt={`logo ${post.batch.name}`}
              className="w-[32px] h-[32px] text-xs truncate rounded object-cover"
              loading="lazy"
              width={32}
              height={32}
            />
          ) : (
            <Office width={32} height={32} className="text-neutral-400" />
          )}
        </Anchor>

        <div className="flex-1 flex flex-col items-stretch justify-start gap-1">
          <div className="flex flex-col items-stretch justify-start">
            <p className="flex flex-row items-center justify-start flex-wrap gap-x-2 gap-y-0">
              <Anchor as={Link} to={`/p/${post.id}`} styled={false}>
                {post.batch.name}
              </Anchor>
              <Anchor
                href={`${post.batch.website}?ref=https://www.jobilist.com`}
                target="_blank"
                rel="noopener noreferrer"
                styled={false}
                className="font-medium text-neutral-400"
              >
                <External />
              </Anchor>
              <span className="text-sm text-neutral-400">is looking for</span>
            </p>
            <Anchor
              as={Link}
              to={`/p/${post.id}`}
              styled={false}
              className="font-medium text-lg"
            >
              {post.title}
            </Anchor>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <Sparkles className="text-indigo-400" />
            <p className="text-sm font-medium text-indigo-200">
              {JOB_TYPES_OPTIONS.find(function (option) {
                return option.value === post.type;
              })?.label ?? post.type}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <Location className="text-yellow-400" />
            <p className="text-sm font-medium text-yellow-200">
              {post.location}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <Cash className="text-green-400" />
            <p className="text-sm font-medium text-green-200">
              ${post.salaryStart}{" "}
              <span className="font-normal text-neutral-400">to</span> $
              {post.salaryEnd} per year
            </p>
          </div>
          {post.tags?.length ? (
            <div className="mt-2 flex flex-row items-baseline justify-start flex-wrap gap-x-2 gap-y-1">
              {post.tags.map(function (tag) {
                return <Chip key={tag}>{tag}</Chip>;
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-row items-stretch justify-end flex-wrap-reverse gap-2">
        {expanded ? null : (
          <Button as={Link} to={`/p/${post.id}`} ghost>
            View details
          </Button>
        )}
        {post?.applyEmail ? (
          <Button
            as="a"
            href={`mailto:${post.applyEmail}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center justify-center gap-1"
          >
            <Mail />
          </Button>
        ) : null}
        {post?.applyLink ? (
          <Button
            as="a"
            href={`${post.applyLink}?ref=https://www.jobilist.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center justify-center gap-1"
          >
            <span>Apply</span>
            <External />
          </Button>
        ) : null}
      </div>
      {expanded ? (
        <Fragment>
          {post.batch?.description ? (
            <div className="flex flex-col items-stretch justify-start gap-2">
              <p className="font-medium text-lg text-neutral-400">
                About company
              </p>
              <p className="whitespace-pre text-sm">{post.batch.description}</p>
            </div>
          ) : null}
          {post?.description ? (
            <div className="flex flex-col items-stretch justify-start gap-2">
              <p className="font-medium text-lg text-neutral-400">
                Job description
              </p>
              <p className="whitespace-pre-wrap  text-sm">{post.description}</p>
            </div>
          ) : null}
        </Fragment>
      ) : null}
    </PostCard>
  );
}

export function PostCardWrapper({ className = "", children, ...otherProps }) {
  return (
    <div
      className={[
        "flex flex-col items-stretch justify-start gap-0 border-y border-dashed border-neutral-800 divide-y divide-dashed divide-neutral-800",
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </div>
  );
}

export function PostCard({ className = "", children, ...otherProps }) {
  return (
    <article className={["p-4", className].join(" ")} {...otherProps}>
      {children}
    </article>
  );
}
