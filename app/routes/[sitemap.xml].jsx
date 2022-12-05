import { db } from "../utils/db.server";

const SITE = "https://www.jobilist.com";

const START = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const END = `</urlset>`;

function getURLEntry(loc, priority) {
  return `<url><loc>${SITE}${loc}</loc><priority>${priority}</priority></url>`;
}

export async function loader() {
  let urls = [START];

  urls.push(getURLEntry(`/`, "1.0"));
  urls.push(getURLEntry(`/post`, 0.8));

  try {
    const posts = await db.post.findMany();
    posts.map(function (post) {
      urls.push(getURLEntry(`/p/${post.id}`, 0.5));

      return post;
    });

    const searches = await db.search.findMany();
    searches.map(function (search) {
      urls.push(
        getURLEntry(
          `/?index=${encodeURIComponent("&")}search=${encodeURIComponent(
            search.query
          )}`,
          0.5
        )
      );

      return search;
    });
  } catch (error) {
    console.error(
      "Error while fetching posts and searches to generate sitemap.xml!",
      error
    );
  }

  urls.push(END);

  const content = urls.join("");

  return new Response(content, {
    headers: {
      encoding: "UTF-8",
      "Content-Type": "application/xml",
      "xml-version": "1.0",

      "Cache-Control": "max-age=86400, stale-while-revalidate=43200",
    },
  });
}
