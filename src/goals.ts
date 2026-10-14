import type { AppState, Goal } from './types'

export function currentGoalValue(unit: Goal['unit'], state: AppState) {
  if (unit === 'lessons') return state.completedLessons.length
  if (unit === 'minutes') return state.sessions.reduce((sum, session) => sum + session.minutes, 0)
  return state.sessions.length
}

export function goalProgress(goal: Goal, state: AppState) {
  const value = Math.max(0, currentGoalValue(goal.unit, state) - (goal.startValue ?? 0))
  const percent = goal.target > 0 ? Math.min(100, Math.round((value / goal.target) * 100)) : 100
  return { value, percent, complete: goal.completed || value >= goal.target }
}
