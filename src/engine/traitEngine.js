export function applyScore(currentScores, optionScore = {}) {
  const updated = { ...currentScores }
  Object.entries(optionScore).forEach(([key, value]) => {
    updated[key] = (updated[key] || 0) + value
  })

  return updated
}
