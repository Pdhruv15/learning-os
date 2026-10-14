import type { AppState } from './types'

export const STORAGE_KEY = 'learning-os:v1'
export const initialState: AppState = {
  completedLessons: [], bookmarks: [], notes: [], goals: [
    { id: 'goal-1', title: 'Complete 3 lessons this week', target: 3, unit: 'lessons', due: new Date(Date.now() + 6 * 86400000).toISOString().slice(0, 10), completed: false }
  ], sessions: [], quizScores: {}, streakDates: [], onboardingDone: false, customCourses: [], reviews: {}, flashcards: [],
}

export function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialState
    const data = JSON.parse(saved) as Partial<AppState>
    return { ...initialState, ...data, reviews: data.reviews ?? {}, flashcards: data.flashcards ?? [] }
  } catch { return initialState }
}

export function saveState(state: AppState) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
export function lessonProgress(completed: string[], lessonIds: string[]) { return lessonIds.length ? Math.round(100 * lessonIds.filter(id => completed.includes(id)).length / lessonIds.length) : 0 }
export function exportPayload(state: AppState) { return JSON.stringify({ app: 'Learning OS', version: 1, exportedAt: new Date().toISOString(), data: state }, null, 2) }
export function validateImport(value: unknown): AppState {
  if (!value || typeof value !== 'object' || !('data' in value)) throw new Error('This is not a Learning OS backup.')
  const data = (value as { data: unknown }).data
  if (!data || typeof data !== 'object' || !Array.isArray((data as AppState).completedLessons)) throw new Error('The backup data is incomplete.')
  const imported = data as Partial<AppState>
  return { ...initialState, ...imported, reviews: imported.reviews ?? {}, flashcards: imported.flashcards ?? [] }
}
