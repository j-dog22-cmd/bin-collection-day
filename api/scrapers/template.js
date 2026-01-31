import * as cheerio from "cheerio";
import { councilWebsites } from "../councilWebsites.js";

export async function scrapeTemplate(councilName) {
  const url = councilWebsites[councilName];

  if (!url) {
    throw new Error(`No URL configured for ${councilName}`);
  }

  const html = await fetch(url).then((r) => r.text());
  const $ = cheerio.load(html);

  // TODO: inspect the specific council page and update selectors.
  // Example:
  // const nextCollection = $(".next-collection").first().text().trim();
  // const bins = $(".bin-type")
  //   .map((i, el) => $(el).text().trim())
  //   .get();

  const nextCollection = "Demo next collection date";
  const bins = ["Refuse", "Recycling"];

  return {
    nextCollection,
    bins
  };
}