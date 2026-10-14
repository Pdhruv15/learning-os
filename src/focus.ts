import type { FocusTimer } from './types'

export const createFocusTimer = (durationMinutes = 25): FocusTimer => ({ status: 'idle', durationMinutes, remainingSeconds: durationMinutes * 60 })

export function remainingFocusSeconds(timer: FocusTimer, now = Date.now()) {
  if (timer.status !== 'running' || !timer.startedAt) return timer.remainingSeconds
  return Math.max(0, timer.remainingSeconds - Math.floor((now - timer.startedAt) / 1000))
}

export function startFocusTimer(timer: FocusTimer, now = Date.now()): FocusTimer {
  const remaining = timer.status === 'idle' ? timer.durationMinutes * 60 : remainingFocusSeconds(timer, now)
  return { ...timer, status: 'running', remainingSeconds: remaining, startedAt: now }
}

export function pauseFocusTimer(timer: FocusTimer, now = Date.now()): FocusTimer {
  return { ...timer, status: 'paused', remainingSeconds: remainingFocusSeconds(timer, now), startedAt: undefined }
}

export function resetFocusTimer(timer: FocusTimer): FocusTimer {
  return { ...timer, status: 'idle', remainingSeconds: timer.durationMinutes * 60, startedAt: undefined }
}
