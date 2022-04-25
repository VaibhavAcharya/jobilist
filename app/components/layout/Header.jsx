import { Fragment } from "react";
import { Link, NavLink } from "@remix-run/react";

import Anchor from "../ui/Anchor";
import Button from "../ui/Button";

import Container from "./Container";

const NAVIGATION_LINKS = {
  ANONYMOUS: {
    HOME: [
    {
      label: "Post a job",
      to: "/signup"
    },
    {
      label: "Login",
      to: "/login",
      ghost: true
    }],
    AUTHENTICATION: {
      SIGNUP: [{
        label: "Login",
        to: "/login",
        ghost: true
      }],
      LOGIN: [{
        label: "Sign up",
        to: "/signup",
        ghost: true
      }]
    }
  },
  USER: {
    HOME: [{
      label: "Dashboard",
      to: "/dashboard"
    }],
    DASHBOARD: [{
      label: "Home",
      to: "/",
      ghost: true
    }]
  }
}

function TabLink({ to, children, ...otherProps }) {
  return (
    <li>
      <Button as={NavLink} to={to} ghost {...otherProps}>
        {function ({ isActive }) {
          return <span className={isActive ? "text-blue-500" : ""}>
          {children}
          </span>
        }}
      </Button>
    </li>
  )
}

export default function Header({
  showPitch = false,
  onAuthentication = false,
}) {
  const isAuthenticated = true;

  return (
    <div className="border-b border-neutral-800/50 bg-white/5 py-4 flex flex-col items-stretch justify-start gap-8">
      <Container
        as="nav"
        className={["flex flex-row items-center justify-between gap-4", onAuthentication ? "px-8" : ""].join(" ")}
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
          {onAuthentication ? (
            onAuthentication === "login" ? (
              <li>
                <Button as={Link} to="/signup" ghost>
                  Sign up
                </Button>
              </li>
            ) : (
              <Button as={Link} to="/login" ghost>
                Login
              </Button>
            )
          ) : (
            <Fragment>
              <li>
                <Button as={Link} to={isAuthenticated ? "/dashboard/jobs" : "/signup"}>
                  {isAuthenticated ? "Dashboard" : "Post a job"}
                </Button>
              </li>
              {isAuthenticated ? null : <li>
                <Button as={Link} to="/login" ghost>
                  Login
                </Button>
              </li>}
            </Fragment>
          )}
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
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col items-stretch justify-start">
                <p className="font-medium text-lg text-neutral-400 uppercase">
                  Today,
                </p>
                <p className="flex flex-row items-baseline justify-start gap-2">
                  <span className="font-medium">15+</span>
                  <span className="text-neutral-400">new jobs added &</span>
                </p>
                <p className="flex flex-row items-baseline justify-start gap-2">
                  <span className="font-medium">10k+</span>
                  <span className="text-neutral-400">visited.</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      ) : null}
      {
        isAuthenticated ? (
          <Container>
            <nav className="flex flex-row items-stretch justify-start gap-2 overflow-auto">
              <ul className="flex flex-row items-stretch justify-start gap-2">
                <TabLink to="/dashboard/jobs">Jobs</TabLink>
                <TabLink to="/dashboard/profile">Profile</TabLink>
                <TabLink to="/dashboard/store">Store</TabLink>
                <TabLink to="/dashboard/analytics">Analytics</TabLink>
                <TabLink to="/dashboard/account">Account</TabLink>
              </ul>
            </nav>
          </Container>
        ) : null
      }
    </div>
  );
}
