export const config = {
  runtime: "nodejs"
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" })
  }

  try {

    const { name, email, phone, interest } = req.body

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.EMAILJS_PRIVATE}`
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE,
        template_id: process.env.EMAILJS_TEMPLATE,
        user_id: process.env.EMAILJS_PUBLIC,   // PUBLIC KEY HERE
        template_params: {
          name,
          email,
          phone,
          interest
        }
      })
    })

    const text = await response.text()
    console.log("EMAILJS RESPONSE:", text)

    if (!response.ok) {
      return res.status(500).json({ message: text })
    }

    return res.status(200).json({ message: "Email sent" })

  } catch (err) {
    console.log("MAIL ERROR:", err)
    return res.status(500).json({ message: "Server error" })
  }
}
