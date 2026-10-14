import { describe, expect, it } from 'vitest'
import { currentGoalValue, goalProgress } from './goals'
import { initialState } from './store'

describe('automatic goal progress', () => {
  const state = { ...initialState, completedLessons: ['one', 'two'], sessions: [{ id: 'a', minutes: 25, date: '2026-10-14', note: '' }, { id: 'b', minutes: 40, date: '2026-10-14', note: '' }] }

  it('reads lesson, minute and session totals', () => {
    expect(currentGoalValue('lessons', state)).toBe(2)
    expect(currentGoalValue('minutes', state)).toBe(65)
    expect(currentGoalValue('sessions', state)).toBe(2)
  })

  it('measures progress from the value when a goal was created', () => {
    expect(goalProgress({ id: 'g', title: 'Study', target: 40, unit: 'minutes', due: '2026-10-20', completed: false, startValue: 25 }, state)).toEqual({ value: 40, percent: 100, complete: true })
  })
})
