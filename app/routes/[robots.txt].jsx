export function loader() {
  const content = `User-agent: *\nDisallow:\n\nSitemap: https://www.jobilist.com/sitemap.xml`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
