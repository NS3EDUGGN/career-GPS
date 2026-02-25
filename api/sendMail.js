export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {

  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {

    const { name, email, phone, college, course, year } = req.body;

    // Safety check (VERY important)
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE,
        template_id: process.env.EMAILJS_TEMPLATE,
        user_id: process.env.EMAILJS_PUBLIC,
        accessToken: process.env.EMAILJS_PRIVATE,

        template_params: {
          name,
          email,
          phone,
          college,
          course,
          year
        }
      })
    });

    const text = await response.text();
    console.log("EMAILJS RESPONSE:", text);

    if (!response.ok) {
      return res.status(500).json({ message: text });
    }

    return res.status(200).json({ message: "Email sent successfully" });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
