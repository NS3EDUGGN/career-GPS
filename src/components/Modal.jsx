import { useEffect } from "react"

function Modal({ onClose, career }) {

  // normalize career name
  const normalizedCareer = career?.trim().toLowerCase()

  // mapping career → roadmap image
  const roadmapImages = {
    "web development": "/roadmaps/webdev.png",
    "data science": "/roadmaps/datascience.png",
    "cyber security": "/roadmaps/cybersecurity.png",
    "networking": "/roadmaps/networking.png",
    "digital marketing": "/roadmaps/digitalmarketing.png",
    "human resources (hr)": "/roadmaps/hr.png",
    "finance professional": "/roadmaps/finance.png",
    "ai / ml engineer": "/roadmaps/aiml.png",
    "content creator": "/roadmaps/content.png",
    "logistics & operations": "/roadmaps/logistics.png",
    "cloud & devops": "/roadmaps/cloud.png"
  }

  // fallback image
  const roadmapSrc = roadmapImages[normalizedCareer] || "/roadmaps/default.png"

  /* ESC key closes modal */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  /* click outside closes modal */
  const handleBackdropClick = (e) => {
    if (e.target.id === "roadmapBackdrop") {
      onClose()
    }
  }

  return (
    <div
      id="roadmapBackdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      {/* Modal Box */}
      <div className="relative bg-[#0E1F1A] border border-green-400/30 rounded-2xl w-full max-w-5xl max-h-[90vh] shadow-[0_0_50px_rgba(34,197,94,0.25)]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-400 text-green-900 font-bold hover:scale-110 transition">
          ✕
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh] p-6">

          <h2 className="text-2xl font-bold text-green-300 mb-6 text-center">
            {career} Career Roadmap
          </h2>

          <img
            src={roadmapSrc}
            alt={`${career} roadmap`}
            className="w-full rounded-xl border border-green-400/20"
          />

          <p className="text-center text-green-200/70 text-sm mt-6">
            Follow this roadmap step-by-step to enter the {career} field.
          </p>

        </div>

      </div>
    </div>
  )
}

export default Modal
