import { scrapeBristol } from "./scrapers/bristol.js";
// import { scrapeTemplate } from "./scrapers/template.js";

export default async function handler(req, res) {
  const { council } = req.query || req.body || {};

  if (!council) {
    return res.status(400).json({ error: "Missing council name" });
  }

  const scrapers = {
    "Bristol City Council": scrapeBristol
    // "South Gloucestershire Council": () =>
    //   scrapeTemplate("South Gloucestershire Council")
  };

  const scraper = scrapers[council];

  if (!scraper) {
    return res.status(404).json({
      error: "No scraper available for this council yet",
      council
    });
  }

  try {
    const data = await scraper();
    return res.status(200).json({
      council,
      ...data
    });
  } catch (err) {
    return res.status(500).json({
      error: "Scraping failed",
      details: err.message
    });
  }
}
