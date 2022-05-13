import { db } from "../utils/db.server";

const START = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const END = `</urlset>`;

function getURLEntry(loc, priority) {
  return `<url><loc>${loc}</loc><priority>${priority}</priority></url>`;
}

export async function loader() {
  let urls = [];

  urls.push(getURLEntry("https://www.jobilist.com/", "1.0"));
  urls.push(getURLEntry("https://www.jobilist.com/post", 0.8));
  urls.push(getURLEntry("https://www.jobilist.com/legal/privacy", 0.25));

  try {
    const posts = await db.post.findMany();
    posts.map(function (post) {
      urls.push(getURLEntry(`https://www.jobilist.com/p/${post.id}`, 0.5));

      return post;
    });
  } catch (error) {
    console.error("Error while fetching posts to generate sitemap.xml!", error);
  }

  const content = `${START}${urls.join("")}${END}`;

  return new Response(content, {
    headers: {
      encoding: "UTF-8",
      "Content-Type": "application/xml",
      "xml-version": "1.0",

      "Cache-Control": "max-age=86400, stale-while-revalidate=43200",
    },
  });
}
