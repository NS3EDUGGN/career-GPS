const cloudQuestions = [
  {
    id: "cloud-1",
    question: "What part of working with systems sounds most comfortable to you?",
    options: [
      {
        text: "Setting up and managing servers",
        score: { cloud: 3, systems: 2 }
      },
      {
        text: "Ensuring applications run smoothly",
        score: { cloud: 3, stability: 2 }
      },
      {
        text: "Improving performance and scalability",
        score: { cloud: 3, analytical: 2 }
      }
    ]
  },
  {
    id: "cloud-2",
    question: "Which responsibility feels acceptable on a daily basis?",
    options: [
      {
        text: "Monitoring systems and fixing issues",
        score: { cloud: 3, persistence: 2 }
      },
      {
        text: "Managing cloud resources and costs",
        score: { cloud: 2, management: 2 }
      },
      {
        text: "Automating deployments and updates",
        score: { cloud: 3, systems: 2 }
      }
    ]
  },
  {
    id: "cloud-3",
    question: "When a system slows down, what feels natural to you?",
    options: [
      {
        text: "Investigate resource usage",
        score: { cloud: 3, analytical: 2 }
      },
      {
        text: "Scale the system to handle more load",
        score: { cloud: 3, systems: 2 }
      },
      {
        text: "Restart and stabilize services",
        score: { cloud: 2, stability: 2 }
      }
    ]
  },
  {
    id: "cloud-4",
    question: "What kind of environment do you prefer working in?",
    options: [
      {
        text: "Managing virtual machines and services",
        score: { cloud: 3 }
      },
      {
        text: "Automated, script-driven systems",
        score: { cloud: 3, systems: 2 }
      },
      {
        text: "Monitoring dashboards and alerts",
        score: { cloud: 2, stability: 2 }
      }
    ]
  }
]

export default cloudQuestions
