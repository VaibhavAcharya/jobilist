import { Link } from "@remix-run/react";

import Anchor from "../ui/Anchor";
import Button from "../ui/Button";

import Container from "./Container";

export default function Header({ showPitch = false, posting = false }) {
  return (
    <div className="border-b border-neutral-800/50 bg-white/5 py-4 flex flex-col items-stretch justify-start gap-8">
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
        </ul>

        <ul className="flex flex-row items-center justify-between gap-2">
          <li>
            {posting ? (
              <Button as={Link} to="/" ghost>
                Home
              </Button>
            ) : (
              <Button as={Link} to="/post">
                Post a job (50% off)
              </Button>
            )}
          </li>
        </ul>
      </Container>
      {showPitch ? (
        <Container
          as="header"
          className="flex flex-col items-stretch justify-start gap-2"
        >
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="font-medium text-sm text-yellow-200">Lively</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-sm text-green-200">Affordable</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-sm text-pink-200">Beautiful</p>
          </div>
          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
            <div className="w-[48ch] flex flex-col items-stretch justify-start gap-1">
              <h2 className="font-bold text-2xl bg-clip-text bg-gradient-to-br from-pink-400 via-blue-400 to-blue-600 text-transparent">
                The only job board you will ever need.
              </h2>
              <p className="text-neutral-400">
                We studied hundreds of employment websites to create an amazing
                experience for both job seekers & employers.
              </p>
            </div>
          </div>
        </Container>
      ) : null}
    </div>
  );
}
