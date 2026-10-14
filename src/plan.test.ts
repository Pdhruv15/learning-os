import { describe, expect, it } from 'vitest'
import { buildDailyPlan } from './plan'
import { initialState } from './store'

const lessons = [
  { id: 'lesson-1', title: 'Start here', minutes: 20, courseId: 'course-1', courseTitle: 'Useful course' },
  { id: 'lesson-2', title: 'Bookmarked next', minutes: 35, courseId: 'course-1', courseTitle: 'Useful course' },
]

describe('daily study plan', () => {
  it('prioritizes due revision, an urgent goal and a bookmarked lesson', () => {
    const state = {
      ...initialState,
      bookmarks: ['lesson-2'],
      reviews: { 'lesson-1': { lessonId: 'lesson-1', due: '2026-10-13', intervalDays: 1, repetitions: 0 } },
      goals: [{ id: 'soon', title: 'Finish two lessons', target: 2, unit: 'lessons' as const, due: '2026-10-15', completed: false }],
    }
    const plan = buildDailyPlan(state, lessons, '2026-10-14')
    expect(plan.map(item => item.kind)).toEqual(['review', 'goal', 'lesson'])
    expect(plan[2]).toMatchObject({ title: 'Bookmarked next', minutes: 35 })
  })

  it('removes completed work from the plan', () => {
    const state = { ...initialState, goals: [], completedLessons: ['lesson-1', 'lesson-2'] }
    expect(buildDailyPlan(state, lessons, '2026-10-14')).toEqual([])
  })
})
