import { describe, expect, it } from 'vitest'
import { createFocusTimer, pauseFocusTimer, remainingFocusSeconds, resetFocusTimer, startFocusTimer } from './focus'

describe('focus timer', () => {
  it('counts down a running timer from its start time', () => {
    const timer = startFocusTimer(createFocusTimer(25), 1_000)
    expect(remainingFocusSeconds(timer, 31_000)).toBe(1_470)
  })

  it('preserves remaining time when paused and resumed', () => {
    const running = startFocusTimer(createFocusTimer(25), 1_000)
    const paused = pauseFocusTimer(running, 61_000)
    expect(paused.remainingSeconds).toBe(1_440)
    expect(remainingFocusSeconds(startFocusTimer(paused, 100_000), 110_000)).toBe(1_430)
  })

  it('resets to the selected duration', () => {
    expect(resetFocusTimer({ status: 'paused', durationMinutes: 45, remainingSeconds: 12 }).remainingSeconds).toBe(2_700)
  })
})
