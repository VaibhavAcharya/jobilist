import { Link } from "@remix-run/react";

import Anchor from "../ui/Anchor";
import Button from "../ui/Button";

import Container from "./Container";

import Heart from "./../icons/Heart";
import Scale from "./../icons/Scale";
import Code from "../icons/Code";
import Cake from "../icons/Cake";
import External from "../icons/External";

export default function Header({
  showPitch = false,
  home = false,
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
        <Anchor href="/" styled={false}>
          <ul className="flex flex-row items-center justify-between gap-3">
            <li>
              <img src="/logo.svg" alt="logo Jobilist" width={30} height={30} />
            </li>
            <li>
              <p className="font-medium">Jobilist</p>
            </li>
          </ul>
        </Anchor>

        <ul className="flex flex-row items-center justify-between gap-2">
          {home ? null : (
            <li>
              <Button as={Link} to="/" ghost>
                Home
              </Button>
            </li>
          )}
          {posting ? null : (
            <li>
              <Button as={Link} to="/post">
                Post job
              </Button>
            </li>
          )}
        </ul>
      </Container>
      {showPitch ? (
        <Container
          as="header"
          className="flex flex-col items-stretch justify-start gap-1"
        >
          {/* <div className="flex flex-row items-center justify-start gap-2 text-xs">
            <p className="font-medium text-yellow-200">Lively</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-green-200">Affordable</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-pink-200">Beautiful</p>
          </div> */}
          <div className="flex flex-row items-start justify-between flex-wrap gap-4">
            <div className="w-[48ch] flex flex-col items-stretch justify-start gap-1">
              <h1 className="font-bold text-2xl bg-clip-text bg-gradient-to-br from-pink-400 via-blue-400 to-blue-600 text-transparent">
                Where talent finds opportunity.
              </h1>
              <p className="text-neutral-400 leading-tight text-sm">
                A job search engine that connects job seekers with the
                top employers across the world to help them find the perfect
                career opportunity.
              </p>
            </div>
              
            <div className="flex flex-col items-stretch justify-start gap-1">
              <p className="font-medium text-xs uppercase text-neutral-400">
                Features
              </p>
              {/* <div className="flex flex-row items-center justify-start gap-2">
                <Heart size={18} className="text-rose-400" />
                <p className="text-sm">1% goes to charity</p>
              </div> */}
              
              <div className="flex flex-row items-center justify-start gap-2">
                <Scale size={18} className="text-teal-400" />
                <p className="text-sm">Free forever</p>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <Code size={18} className="text-indigo-400" />
                <p className="text-sm">
                  <Anchor
                    href="https://github.com/vaibhavacharya/jobilist"
                    target="_black"
                    rel="noopener noreferrer"
                    styled={false}
                    className="flex flex-row items-center justify-start gap-1"
                  >
                    <span>Open source</span>
                    <External size={16} className="text-blue-400" />
                  </Anchor>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
                <p className="text-sm">build w/{" "}
                <Heart size={18} className="text-pink-400 inline" />
                {" by "}
          <Anchor
            href="https://twitter.com/VaibhavAcharya_"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vaibhav Acharya
          </Anchor>{" "}
          &{" "}
          <Anchor
            href="https://twitter.com/naman404"
            target="_blank"
            rel="noopener noreferrer"
          >
            Naman Vyas
          </Anchor>
          .
        </p>
              </div>
          {/* <div className="mt-4 flex flex-row items-stretch justify-start gap-4">
            <div className="flex flex-col items-stretch justify-start gap-1">
              <p className="leading-none font-medium text-lg">1000+</p>
              <p className="leading-none text-sm text-neutral-400">daily visiters</p>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-1">
              <p className="leading-none font-medium text-lg">50+</p>
              <p className="leading-none text-sm text-neutral-400">active jobs</p>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-1">
              <p className="leading-none font-medium text-lg">100+</p>
              <p className="leading-none text-sm text-neutral-400">email subscribers</p>
            </div>
          </div> */}
        </Container>
      ) : null}
    </div>
  );
}
