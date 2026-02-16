const networkQuestions = [
  {
    id: "net-1",
    question: "What part of systems work attracts you?",
    options: [
      { text: "Understanding how everything connects", score: { network: 3, systems: 2 } },
      { text: "Fixing failures when things break", score: { network: 3, persistence: 2 } },
      { text: "Keeping systems stable", score: { network: 2, stability: 2 } }
    ]
  },
  {
    id: "net-2",
    question: "When something stops working, what do you do first?",
    options: [
      { text: "Investigate step by step", score: { network: 3, analytical: 2 } },
      { text: "Restart from basics", score: { network: 2, systems: 2 } },
      { text: "Plan a better structure", score: { network: 2, planning: 2 } }
    ]
  },
  {
  id: "net-3",
  question: "Which connection usually provides more stable internet?",
  options: [
    { text: "Wired connection (LAN cable)", score: { network: 2 } },
    { text: "Wi-Fi", score: {} },
    { text: "Mobile data", score: {} },
    { text: "Bluetooth", score: {} }
  ]
},
{
  id: "net-4",
  question: "What is an IP address?",
  options: [
    { text: "A unique address of a device on a network", score: { network: 2 } },
    { text: "A website name", score: {} },
    { text: "A type of cable", score: {} },
    { text: "A software program", score: {} }
  ]
}
]

export default networkQuestions
