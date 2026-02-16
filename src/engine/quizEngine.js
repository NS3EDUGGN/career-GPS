import trackQuestions from "../data/trackQuestions"
export function getCurrentQuestion({ phase, index, phaseQuestions, lockedTrack}) {
  
  if (phase !== "track") { return phaseQuestions[phase]?.[index] || null }
  if (!lockedTrack) return null
  return (trackQuestions[lockedTrack] || [])[index] || null
}
