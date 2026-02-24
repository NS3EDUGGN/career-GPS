export function get30DayPlan(career) {

  if (!career) {
    console.error("get30DayPlan: career is empty")
    return []
  }

  /* ---------- normalize incoming career ---------- */

let c = career
  .toLowerCase()
  .replace(/\(.*?\)/g, "")   // remove (HR)
  .replace(/\//g, " ")       // AI / ML -> AI ML
  .replace(/-/g, " ")        // AI-ML -> AI ML
  .replace(/\s+/g, " ")
  .trim()

  /* ---------- alias mapping (VERY IMPORTANT) ---------- */
  const alias = {
    "human resources": "hr",
    "hr": "hr",
    "artificial intelligence": "ai/ml",
    "ai": "ai/ml",
"ai ml": "ai/ml",
"ai ml engineer": "ai/ml",
"ml engineer": "ai/ml",
"artificial intelligence engineer": "ai/ml",
"artificial intelligence": "ai/ml",
    "ai ml": "ai/ml",
    "ai engineer": "ai/ml",
    "machine learning": "ai/ml",
    "web developer": "web development",
    "developer": "web development",
    "cybersecurity": "cyber security",
    "operations manager": "logistics & operations",
"logistics manager": "logistics & operations",
"content creator / influencer": "content creator",
"finance professional": "finance",
"cloud engineer": "cloud & devops",
"cloud developer": "cloud & devops",
"devops engineer": "cloud & devops",
    
  }

  c = alias[c] || c

  /* ---------- 30 DAY PLANS ---------- */

  const plans = {

    /* ---------------- WEB DEVELOPMENT ---------------- */

    "web development": [
      [
        "Understand how websites work (Frontend vs Backend)",
        "Learn HTML tags & page structure",
        "Practice building a personal webpage"
      ],
      [
        "Learn CSS styling & layouts (Flexbox, Grid)",
        "Make your webpage responsive for mobile",
        "Host your site on GitHub Pages"
      ],
      [
        "Learn JavaScript fundamentals (variables, loops, functions)",
        "DOM manipulation & events",
        "Build a dynamic To-Do List project"
      ],
      [
        "Learn React basics (components, props, state)",
        "Create a portfolio website",
        "Prepare GitHub + Resume"
      ]
    ],

    /* ---------------- DATA SCIENCE ---------------- */

    "data science": [
      [
        "Install Python & VS Code",
        "Learn Python basics (variables, loops, functions)",
        "Practice simple coding problems"
      ],
      [
        "Learn NumPy & Pandas",
        "Work with CSV datasets",
        "Basic data cleaning"
      ],
      [
        "Learn Data Visualization (Matplotlib, Seaborn)",
        "Exploratory Data Analysis",
        "Mini data analysis project"
      ],
      [
        "Intro to Machine Learning",
        "Train a simple prediction model",
        "Upload project on GitHub"
      ]
    ],

    /* ---------------- CYBER SECURITY ---------------- */

    "cyber security": [
      [
        "Understand what hacking & cybersecurity actually is",
        "Learn networking basics (IP, DNS, HTTP, HTTPS)",
        "Install Kali Linux / Virtual Machine"
      ],
      [
        "Learn Linux commands & terminal usage",
        "Understand ports & protocols",
        "Intro to ethical hacking concepts"
      ],
      [
        "Learn vulnerability scanning (Nmap)",
        "Password attacks & brute force basics",
        "Try Capture The Flag (CTF) practice"
      ],
      [
        "Learn web security (SQL Injection, XSS basics)",
        "Create a cybersecurity learning portfolio",
        "Join TryHackMe / HackTheBox beginner labs"
      ]
    ],

    /* ---------------- NETWORKING ---------------- */

    "networking": [
      [
        "Understand computer networks & internet basics",
        "Learn OSI Model",
        "Learn IP addressing & subnetting"
      ],
      [
        "Routing vs Switching concepts",
        "Learn DHCP, DNS",
        "Practice Packet Tracer simulations"
      ],
      [
        "Configure routers & switches",
        "Understand VLANs",
        "Practice small lab setup"
      ],
      [
        "Prepare for CCNA concepts",
        "Troubleshoot network issues",
        "Document learning in notes"
      ]
    ],

    /* ---------------- CLOUD & DEVOPS ---------------- */

"cloud & devops": [
  [
    "Understand what Cloud Computing is (AWS, Azure, GCP overview)",
    "Learn how internet hosting & servers work",
    "Create an AWS Free Tier account"
  ],
  [
    "Learn Linux basics & terminal commands",
    "Understand virtual machines & remote SSH login",
    "Launch an EC2 instance on AWS"
  ],
  [
    "Understand Git & GitHub version control",
    "Learn basic networking (IP, ports, DNS, HTTP/HTTPS)",
    "Host a simple website on AWS EC2"
  ],
  [
    "Intro to DevOps (CI/CD pipeline concept)",
    "Understand Docker & containerization basics",
    "Create portfolio project + deployment documentation"
  ]
],

    /* ---------------- DIGITAL MARKETING ---------------- */

    "digital marketing": [
      [
        "Understand digital marketing ecosystem",
        "Create Gmail + LinkedIn profile",
        "Learn SEO basics"
      ],
      [
        "Keyword research",
        "On-page SEO optimization",
        "Write 2 blog articles"
      ],
      [
        "Social media marketing (Instagram, LinkedIn)",
        "Create content calendar",
        "Learn Canva content design"
      ],
      [
        "Intro to Google Ads & Meta Ads",
        "Run a small campaign (demo)",
        "Build portfolio case study"
      ]
    ],

    /* ---------------- HR ---------------- */

    "hr": [
      [
        "Understand HR roles & responsibilities",
        "Learn recruitment lifecycle",
        "Create professional LinkedIn profile"
      ],
      [
        "Learn resume screening",
        "Practice interview questioning",
        "Understand HR documentation"
      ],
      [
        "Learn payroll & employee engagement",
        "Learn HRMS tools basics",
        "Mock interview practice"
      ],
      [
        "Learn labor laws basics",
        "Create HR portfolio",
        "Apply for HR internships"
      ]
    ],

    /* ---------------- FINANCE ---------------- */

    "finance": [
      [
        "Understand basics of finance & accounting",
        "Learn financial statements",
        "Excel basics"
      ],
      [
        "Advanced Excel formulas",
        "Budgeting & forecasting",
        "Basic taxation concepts"
      ],
      [
        "Investment basics (stocks, mutual funds)",
        "Financial ratio analysis",
        "Case study practice"
      ],
      [
        "Prepare financial reports",
        "Create finance portfolio",
        "Apply for internships"
      ]
    ],

    /* ---------------- AI ML ---------------- */

    "ai/ml": [
      [
        "Learn Python basics",
        "Understand data types & loops",
        "Install Jupyter Notebook"
      ],
      [
        "Learn NumPy & Pandas",
        "Data preprocessing",
        "Dataset exploration"
      ],
      [
        "Supervised vs Unsupervised learning",
        "Train simple ML models",
        "Model evaluation"
      ],
      [
        "Build ML mini project",
        "Upload to GitHub",
        "Prepare portfolio"
      ]
    ],
    /* ---------------- CONTENT CREATOR ---------------- */

"content creator": [
  [
    "Understand types of content (YouTube, Instagram, Blogging, Podcast)",
    "Choose your niche (education, tech, finance, gaming, lifestyle)",
    "Create your first social media account (YouTube/Instagram)"
  ],
  [
    "Learn basic video shooting (lighting, angles, framing)",
    "Learn basic editing using CapCut / VN / Canva",
    "Upload 3 short videos or reels"
  ],
  [
    "Learn storytelling & script writing",
    "Understand thumbnails, titles & hooks",
    "Post consistently for 7 days"
  ],
  [
    "Learn audience growth strategies (hashtags, SEO, trends)",
    "Analyze insights (reach, watch time, engagement)",
    "Build a content portfolio & media kit"
  ]
],
/* ---------------- LOGISTICS & OPERATIONS ---------------- */

"logistics & operations": [
  [
    "Understand supply chain & logistics industry",
    "Learn how warehouses, transportation & delivery systems work",
    "Study real examples (Amazon, Flipkart, Blue Dart operations)"
  ],
  [
    "Learn inventory management basics",
    "Understand procurement & vendor management",
    "Learn Excel basics (data entry, sorting, filters)"
  ],
  [
    "Learn order processing & dispatch workflow",
    "Understand packaging, shipping & tracking systems",
    "Practice Excel reports (stock sheet, delivery sheet)"
  ],
  [
    "Understand KPI metrics (turnaround time, fill rate, stock accuracy)",
    "Learn ERP basics (SAP overview)",
    "Prepare resume & apply for operations/logistics internships"
  ]
]
  }

  /* ---------- safety ---------- */

if (!plans[c]) {
  console.error("30-Day Plan NOT FOUND for:", career, " -> normalized:", c)
  return plans["digital marketing"]
}

  return plans[c]
}