const quizQuestions = [
  {
    id: 1,
    question: "Q1 : Which type of work excites you the most?",
    options: [
      { text: "Designing and troubleshooting networks", score: { network: 3 } },
      { text: "Building scalable systems on cloud platforms", score: { cloud: 3 } },
      { text: "Automating deployments and infrastructure", score: { cloud: 3 } },
      { text: "Creating responsive websites and applications", score: { web: 3 } },
      { text: "Teaching machines to learn and predict", score: { ai: 3 } },
      { text: "Building autonomous AI agents that take actions", score: { agenticai: 3 } },
      { text: "Analyzing data to extract insights", score: { data: 3 } },
      { text: "Protecting systems from cyber attacks", score: { security: 3 } }
    ]
  },

  {
    id: 2,
    question: "Q2 : Which subject would you enjoy studying deeply?",
    options: [
      { text: "Routing, switching, firewalls", score: { network: 3 } },
      { text: "AWS / Azure / GCP services", score: { cloud: 3 } },
      { text: "CI/CD pipelines and containers", score: { cloud: 3 } },
      { text: "HTML, CSS, JavaScript, React", score: { web: 3 } },
      { text: "Machine learning algorithms", score: { ai: 3 } },
      { text: "AI agents and decision-making systems", score: { agenticai: 3 } },
      { text: "Statistics and data analysis", score: { data: 3 } },
      { text: "Ethical hacking and penetration testing", score: { security: 3 } }
    ]
  },

  {
    id: 3,
    question: "Q3 : If you join a tech company, what role would you prefer?",
    options: [
      { text: "Network Engineer", score: { network: 3 } },
      { text: "Cloud Engineer", score: { cloud: 3 } },
      { text: "DevOps Engineer", score: { cloud: 3 } },
      { text: "Web / Full-Stack Developer", score: { web: 3 } },
      { text: "AI / ML Engineer", score: { ai: 3 } },
      { text: "Agentic AI Developer", score: { agenticai: 3 } },
      { text: "Data Scientist", score: { data: 3 } },
      { text: "Cyber Security Analyst", score: { security: 3 } }
    ]
  },

  {
    id: 4,
    question: "Q4 : Which tools sound most interesting to you?",
    options: [
      { text: "Wireshark, Cisco Packet Tracer", score: { network: 2 } },
      { text: "EC2, S3, Azure VM", score: { cloud: 2 } },
      { text: "Docker, Kubernetes, Jenkins", score: { cloud: 2 } },
      { text: "React, Next.js", score: { web: 2 } },
      { text: "TensorFlow, PyTorch", score: { ai: 2 } },
      { text: "LangChain, AutoGPT", score: { agenticai: 2 } },
      { text: "Pandas, NumPy, Power BI", score: { data: 2 } },
      { text: "Kali Linux, Metasploit", score: { security: 2 } }
    ]
  },

  {
    id: 5,
    question: "Q5 : What kind of problems do you like solving?",
    options: [
      { text: "Network downtime and connectivity issues", score: { network: 3 } },
      { text: "Scaling applications for high traffic", score: { cloud: 3 } },
      { text: "Reducing manual work through automation", score: { cloud: 3 } },
      { text: "Improving user experience of websites", score: { web: 3 } },
      { text: "Making predictions from data", score: { ai: 3 } },
      { text: "Automating decisions using AI agents", score: { agenticai: 3 } },
      { text: "Finding hidden patterns in data", score: { data: 3 } },
      { text: "Detecting and preventing attacks", score: { security: 3 } }
    ]
  },

  {
    id: 6,
    question: "Q6 : Which working style suits you best?",
    options: [
      { text: "Structured configurations and setups", score: { network: 2 } },
      { text: "Flexible, scalable environments", score: { cloud: 2 } },
      { text: "Fast, automated workflows", score: { cloud: 2 } },
      { text: "Creative + logical coding", score: { web: 2 } },
      { text: "Experimental and research-oriented", score: { ai: 2 } },
      { text: "Autonomous systems thinking", score: { agenticai: 2 } },
      { text: "Data-driven decision making", score: { data: 2 } },
      { text: "Investigative and analytical", score: { security: 2 } }
    ]
  },

  {
    id: 7,
    question: "Q7 : Your natural strength is closest to:",
    options: [
      { text: "Troubleshooting systems", score: { network: 2 } },
      { text: "System architecture", score: { cloud: 2 } },
      { text: "Process optimization", score: { cloud: 2 } },
      { text: "UI and logic building", score: { web: 2 } },
      { text: "Pattern recognition", score: { ai: 2 } },
      { text: "Autonomous reasoning", score: { agenticai: 2 } },
      { text: "Analytical thinking", score: { data: 2 } },
      { text: "Risk assessment", score: { security: 2 } }
    ]
  },

  {
    id: 8,
    question: "Q8 : A website becomes slow when traffic increases. What interests you most?",
    options: [
      { text: "Optimizing load balancing and network flow", score: { network: 2 } },
      { text: "Auto-scaling servers on cloud", score: { cloud: 3 } },
      { text: "Improving deployment and caching strategy", score: { cloud: 2 } },
      { text: "Optimizing frontend/backend code", score: { web: 2 } },
      { text: "Predicting traffic using ML", score: { data: 2 } },
      { text: "Using AI agents to auto-manage scaling", score: { data: 2 } },
      { text: "Analyzing traffic data", score: { data: 2 } },
      { text: "Checking for DDoS attacks", score: { security: 2 } }
    ]
  }
]

export default quizQuestions
