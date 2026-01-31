export default async function handler(req, res) {
  const { postcode } = req.query || req.body || {};

  if (!postcode) {
    return res.status(400).json({ error: "Missing postcode" });
  }

  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
    );

    if (!response.ok) {
      return res.status(404).json({ error: "Postcode not found" });
    }

    const data = await response.json();

    if (!data.result) {
      return res.status(404).json({ error: "No data for that postcode" });
    }

    const council =
      data.result.admin_district ||
      data.result.parliamentary_constituency ||
      "Unknown council";

    return res.status(200).json({
      postcode,
      council
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
