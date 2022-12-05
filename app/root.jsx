import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import tailwindCSSStylesRef from "./styles/tailwind.css";
import indexStylesRef from "./styles/index.css";
import { useEffect } from "react";

export function meta() {
  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links() {
  return [
    {
      rel: "icon",
      type: "image/svg",
      href: "/logo.svg",
    },

    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
    },

    { rel: "stylesheet", href: tailwindCSSStylesRef },
    { rel: "stylesheet", href: indexStylesRef },
  ];
}

export default function Root() {
  const location = useLocation();

  useEffect(
    function () {
      (async function () {
        await fetch(`/api/view?url=${location.pathname}`);
      })();
    },
    [location.pathname]
  );

  return (
    <html
      lang="en"
      className="h-full font-sans selection:bg-white/80 selection:text-black/80"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-black text-white">
        <Outlet />

        <ScrollRestoration />
        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
}
