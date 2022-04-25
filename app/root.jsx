import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindCSSStylesRef from "./styles/tailwind.css";

export function meta() {
  return {
    charset: "utf-8",
    title: "Jobilist — The only job board you will ever need.",
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links() {
  return [
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
  ];
}

export default function Root() {
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
