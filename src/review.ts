import type { ReviewRating, ReviewSchedule } from './types'

export const dateKey = (date = new Date()) => date.toISOString().slice(0, 10)

export function addDays(date: string, days: number) {
  const value = new Date(`${date}T12:00:00`)
  value.setDate(value.getDate() + days)
  return dateKey(value)
}

export function startReview(lessonId: string, from = dateKey()): ReviewSchedule {
  return { lessonId, due: addDays(from, 1), intervalDays: 1, repetitions: 0 }
}

export function rateReview(current: ReviewSchedule, rating: ReviewRating, from = dateKey()): ReviewSchedule {
  let intervalDays: number
  let repetitions = current.repetitions + 1

  if (rating === 'again') {
    intervalDays = 1
    repetitions = 0
  } else if (rating === 'hard') {
    intervalDays = Math.max(2, Math.ceil(current.intervalDays * 1.5))
  } else if (rating === 'good') {
    intervalDays = current.repetitions === 0 ? 3 : Math.max(3, Math.round(current.intervalDays * 2))
  } else {
    intervalDays = current.repetitions === 0 ? 7 : Math.max(7, Math.round(current.intervalDays * 2.5))
  }

  return { ...current, due: addDays(from, intervalDays), intervalDays, repetitions, lastReviewed: from, lastRating: rating }
}

export function isReviewDue(review: ReviewSchedule, on = dateKey()) {
  return review.due <= on
}
