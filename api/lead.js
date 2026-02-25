export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {

    const params = new URLSearchParams();

    Object.keys(req.body).forEach(key => {
      params.append(key, req.body[key]);
    });

    await fetch(process.env.GSHEET_URL, {
      method: "POST",
      body: params
    });

    res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}
