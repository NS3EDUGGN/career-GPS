export const config = {
  runtime: "nodejs"
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" })
  }

  try {

    const { name, email, phone, interest, other_interest } = req.body


    // Create form data (IMPORTANT)
    const formData = new FormData()

    formData.append("service_id", process.env.EMAILJS_SERVICE)
    formData.append("template_id", process.env.EMAILJS_TEMPLATE)
    formData.append("user_id", process.env.EMAILJS_PUBLIC)
    formData.append("accessToken", process.env.EMAILJS_PRIVATE)

    formData.append("template_params[name]", name)
    formData.append("template_params[email]", email)
    formData.append("template_params[phone]", phone)
    formData.append("template_params[interest]", interest)
    formData.append("template_params[other_interest]", other_interest)

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send-form",
      {
        method: "POST",
        body: formData
      }
    )

    const text = await response.text()
    console.log("EMAILJS RESPONSE:", text)

    if (!response.ok) {
      return res.status(500).json({ message: text })
    }

    return res.status(200).json({ message: "Email sent successfully" })

  } catch (err) {
    console.log("MAIL ERROR:", err)
    return res.status(500).json({ message: "Server error" })
  }
}
