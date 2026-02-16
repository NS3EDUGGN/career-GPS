const keyMap = {
  dev: "web",
  dataScience: "data",
  ai: "ai"
}

export function generateResult(scores = {}) {
  const careers = {
    network: {
      title: "Networking",
      course: "Networking & Infrastructure Program",
      strengths: ["Troubleshooting", "Protocol understanding", "Infrastructure mindset"],
      improvements: ["Automation tools", "Cloud networking"],
      learning: ["Diagram-based learning", "Hands-on configuration"]
    },
    cloud: {
      title: "Cloud & DevOps",
      course: "Cloud & DevOps Engineer Program",
      strengths: ["System design", "Scalability thinking", "Tool understanding"],
      improvements: ["Linux internals", "Cost optimization"],
      learning: ["Project-based learning", "Real cloud labs"]
    },
    web: {
      title: "Web Development",
      course: "Full Stack Web Development Program",
      strengths: ["Creativity", "UI logic", "Problem solving"],
      improvements: ["Backend architecture", "Performance optimization"],
      learning: ["Build-first approach", "Component-based practice"]
    },
    ai: {
      title: "AI / ML Engineer",
      course: "AI & Machine Learning Program",
      strengths: ["Model thinking", "Pattern learning", "Algorithm understanding"],
      improvements: ["Math foundations", "Model optimization"],
      learning: ["Model experimentation", "Dataset-driven learning"]
    },
    agenticai: {
      title: "Agentic AI Engineer",
      course: "Agentic AI & Autonomous Systems Program",
      strengths: ["Autonomous reasoning", "Decision orchestration", "System intelligence"],
      improvements: ["Tool chaining", "Multi-agent design"],
      learning: ["Agent simulations", "Goal-based systems"]
    },
    data: {
      title: "Data Science",
      course: "Data Science Program",
      strengths: ["Analytical thinking", "Data interpretation", "Visualization"],
      improvements: ["Statistics depth", "Business understanding"],
      learning: ["Case-based learning", "Visualization-driven analysis"]
    },
    hr: {
      title: "Human Resources (HR)",
      course: "HR Management & Talent Development Program",
      strengths: ["People management", "Communication", "Conflict resolution"],
      improvements: ["Data-driven HR decisions", "Labor law understanding"],
      learning: ["Case-based learning", "Role-play scenarios"]
    },
    marketing: {
      title: "Digital Marketing",
      course: "Digital Marketing & Growth Program",
      strengths: ["Creativity", "Audience understanding", "Campaign planning"],
      improvements: ["Analytics depth", "Conversion optimization"],
      learning: ["Experiment-driven learning", "Live campaign analysis"]
    },
    logistics: {
      title: "Logistics & Operations",
      course: "Logistics & Supply Chain Program",
      strengths: ["Operational planning", "Coordination", "Process optimization"],
      improvements: ["Technology tools", "Predictive planning"],
      learning: ["Process mapping", "Real-world simulations"]
    },
    security: {
      title: "Cyber Security",
      course: "Advanced Cyber Security Program",
      strengths: ["Risk analysis", "Logical thinking", "Attention to detail"],
      improvements: ["Programming depth", "Automation scripting"],
      learning: ["Attack–defense simulations", "Hands-on labs"]
    },
    content: {
      title: "Content Creator",
      course: "Professional Content Creation & Social Media Program",
      strengths: ["Creativity", "Audience engagement", "Visual storytelling"],
      improvements: ["Consistency in content", "Analytics understanding", "Brand positioning"],
      learning: [
        "Video editing and storytelling",
        "Social media growth strategies",
        "Personal branding and monetization"
      ]
    },
    finance: {
      title: "Finance Professional",
      course: "Practical Finance & Investment Program",
      strengths: ["Numerical thinking", "Budget planning", "Risk awareness"],
      improvements: ["Advanced financial modeling", "Investment strategy", "Market analysis"],
      learning: [
        "Financial statements and analysis",
        "Investment and portfolio basics",
        "Real-world finance case studies"
      ]
    }
  }

  /* Career Traits and weights */
  const traitCareerMap = {
    web: { creative: 3, technical: 3, analytical: 1 },
    ai: { analytical: 3, data: 3, experimentation: 2 },
    data: { analytical: 3, data: 4 },
    network: { systems: 2, technical: 2 },
    security: { security: 4, analytical: 2 },
    cloud: { systems: 2, technical: 3, management: 2 },

    hr: { people: 4, management: 3, teaching: 2, analytical: 1 },
    marketing: { creative: 4, analytical: 2, data: 2, experimentation: 2, people: 1 },
    logistics: { systems: 4, management: 3, analytical: 2, stability: 2 },

    finance: { analytical: 4, data: 3, stability: 2 },
    content: { creative: 4, people: 2, experimentation: 2 }
  }

  const normalizedScores = {}

  for (let key in scores) {
    if (careers[key]) {
      normalizedScores[key] = (normalizedScores[key] || 0) + scores[key]
    }
  }

  Object.entries(traitCareerMap).forEach(([career, weights]) => {
    Object.entries(weights).forEach(([trait, weight]) => {
      if (scores[trait]) {
        normalizedScores[career] =
          (normalizedScores[career] || 0) + scores[trait] * weight
      }
    })
  })

  if (
    Object.keys(normalizedScores).length === 0 &&
    Object.keys(scores).length > 0
  ) {
    Object.keys(careers).forEach(career => {
      normalizedScores[career] = 1
    })
  }

  Object.keys(scores).forEach(key => {
    if (careers[key]) {
      normalizedScores[key] =
        (normalizedScores[key] || 0) + scores[key] * 2
    }
  })

  const validEntries = Object.entries(normalizedScores).filter(
    ([key, value]) => careers[key] && value > 0
  )

  if (validEntries.length === 0) {
    return {
      bestCareer: "Not enough data",
      confidence: "Incomplete Assessment",
      course: "Please retake the test",
      strengths: [],
      improvements: [],
      learning: [],
      breakdown: []
    }
  }

  console.log("Normalized scores:", normalizedScores)

  const maxScore = Math.max(...validEntries.map(e => e[1]), 1)

  const breakdown = validEntries
    .map(([key, value]) => ({
      key,
      score: value,
      percent: Math.round((value / maxScore) * 100),
      ...careers[key]
    }))
    .sort((a, b) => b.score - a.score)

  const top = breakdown[0]

  let confidence = "Moderate Fit"
  if (top.percent >= 75) confidence = "Strong Fit"
  if (top.percent < 50) confidence = "Exploratory Fit"

  return {
    bestCareer: top.title,
    confidence,
    course: top.course,
    strengths: top.strengths,
    improvements: top.improvements,
    learning: top.learning,
    breakdown
  }
}
