export function updateActiveTracks(currentTracks, unlocks = []) {
  if (!unlocks || unlocks.length === 0) return currentTracks
  const trackSet = new Set(currentTracks)
  unlocks.forEach(track => trackSet.add(track))
  return Array.from(trackSet)
}
