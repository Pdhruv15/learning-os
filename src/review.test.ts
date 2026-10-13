import { describe, expect, it } from 'vitest'
import { addDays, isReviewDue, rateReview, startReview } from './review'

describe('smart revision scheduling', () => {
  it('schedules a completed lesson for the next day', () => {
    expect(startReview('lesson-1', '2026-10-13')).toEqual({ lessonId: 'lesson-1', due: '2026-10-14', intervalDays: 1, repetitions: 0 })
  })

  it('expands the interval after successful recall', () => {
    const first = startReview('lesson-1', '2026-10-13')
    const good = rateReview(first, 'good', '2026-10-14')
    const easy = rateReview(good, 'easy', '2026-10-17')
    expect(good.due).toBe('2026-10-17')
    expect(easy.intervalDays).toBe(8)
    expect(easy.due).toBe('2026-10-25')
  })

  it('resets a forgotten lesson to tomorrow', () => {
    const review = { lessonId: 'lesson-1', due: '2026-10-13', intervalDays: 12, repetitions: 4 }
    expect(rateReview(review, 'again', '2026-10-13')).toMatchObject({ due: '2026-10-14', intervalDays: 1, repetitions: 0 })
  })

  it('identifies overdue reviews', () => {
    expect(isReviewDue(startReview('lesson-1', '2026-10-10'), '2026-10-13')).toBe(true)
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
  })
})
