import * as cheerio from "cheerio";
import { councilWebsites } from "../councilWebsites.js";

export async function scrapeBristol() {
  const url = councilWebsites["Bristol City Council"];

  if (!url) {
    throw new Error("No URL configured for Bristol City Council");
  }

  const html = await fetch(url).then((r) => r.text());
  const $ = cheerio.load(html);

  // TODO: inspect the real Bristol page and replace this demo logic
  // with real selectors. For now, we just return a fake but structured result.
  const nextCollection = "Demo: wire real Bristol selectors here";

  const bins = [
    "Recycling",
    "Food waste"
    // Later: parse real bin types from the page
  ];

  return {
    nextCollection,
    bins
  };
}