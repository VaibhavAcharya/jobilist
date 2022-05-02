import { Link } from "@remix-run/react";

import Anchor from "../ui/Anchor";
import Button from "../ui/Button";

import Container from "./Container";

import Heart from "./../icons/Heart";
import Scale from "./../icons/Scale";
import Code from "../icons/Code";
import Cake from "../icons/Cake";

export default function Header({
  showPitch = false,
  posting = false,
  afterPostSuccess = false,
}) {
  return (
    <div className="border-b border-neutral-800/50 bg-white/5 py-4 flex flex-col items-stretch justify-start gap-8">
      {afterPostSuccess ? (
        <Container className="flex flex-row items-stretch justify-start">
          <div className="flex-1 flex flex-row items-center justify-center gap-2 bg-green-500/20 p-2 rounded-md">
            <Cake />
            <p className="font-medium text-sm">
              Congratulations! Your posts are live now.
            </p>
          </div>
        </Container>
      ) : null}

      <Container
        as="nav"
        className="flex flex-row items-center justify-between gap-4"
      >
        <ul className="flex flex-row items-center justify-between gap-3">
          <li>
            <img src="/logo.svg" alt="logo Jobilist" width={30} height={30} />
          </li>
          <li>
            <h1 className="font-medium">
              <Anchor href="/" styled={false}>
                Jobilist
              </Anchor>
            </h1>
          </li>
          <li>
            <p className="text-xs text- font-medium bg-gradient-to-br from-pink-400 via-blue-400 to-blue-600 px-2 py-1 rounded-full">
              Beta
            </p>
          </li>
        </ul>

        <ul className="flex flex-row items-center justify-between gap-2">
          <li>
            {posting ? (
              <Button as={Link} to="/" ghost>
                Home
              </Button>
            ) : (
              <Button as={Link} to="/post">
                Post a job
              </Button>
            )}
          </li>
        </ul>
      </Container>
      {showPitch ? (
        <Container
          as="header"
          className="flex flex-col items-stretch justify-start gap-1"
        >
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="font-medium text-sm text-yellow-200">Lively</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-sm text-green-200">Affordable</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-sm text-pink-200">Beautiful</p>
          </div>
          <div className="flex flex-row items-end justify-between flex-wrap gap-4">
            <div className="w-[48ch] flex flex-col items-stretch justify-start gap-1">
              <h2 className="font-bold text-2xl bg-clip-text bg-gradient-to-br from-pink-400 via-blue-400 to-blue-600 text-transparent">
                The only job board you will ever need.
              </h2>
              <p className="text-neutral-400">
                We studied hundreds of employment websites to create an amazing
                experience for both job seekers & employers.
              </p>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-1">
              <p className="font-medium text-xs uppercase text-neutral-400">
                Features
              </p>
              <div className="flex flex-row items-center justify-start gap-2">
                <Heart size={18} className="text-rose-400" />
                <p className="text-sm">Posting is free forever</p>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <Scale size={18} className="text-teal-400" />
                <p className="text-sm">Fair promotion pricing</p>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <Code size={18} className="text-indigo-400" />
                <p className="text-sm">Open source</p>
              </div>
            </div>
          </div>
        </Container>
      ) : null}
    </div>
  );
}
