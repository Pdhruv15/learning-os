import { goalProgress } from './goals'
import type { AppState } from './types'

export interface PlanningLesson {
  id: string
  title: string
  minutes: number
  courseId: string
  courseTitle: string
}

export type DailyPlanItem =
  | { id: string; kind: 'review'; title: string; detail: string; minutes: number }
  | { id: string; kind: 'goal'; title: string; detail: string; minutes: number }
  | { id: string; kind: 'lesson'; title: string; detail: string; minutes: number; lessonId: string; courseId: string }

export function buildDailyPlan(state: AppState, lessons: PlanningLesson[], on = new Date().toISOString().slice(0, 10)): DailyPlanItem[] {
  const items: DailyPlanItem[] = []
  const dueReviews = Object.values(state.reviews ?? {}).filter(review => review.due <= on).length
    + (state.flashcards ?? []).filter(card => card.review.due <= on).length

  if (dueReviews > 0) {
    items.push({
      id: 'due-reviews',
      kind: 'review',
      title: `Recall ${dueReviews} due ${dueReviews === 1 ? 'item' : 'items'}`,
      detail: 'Strengthen older knowledge before adding more',
      minutes: Math.min(20, Math.max(5, dueReviews * 5)),
    })
  }

  const urgentGoal = state.goals
    .map(goal => ({ goal, progress: goalProgress(goal, state) }))
    .filter(item => !item.progress.complete)
    .sort((a, b) => a.goal.due.localeCompare(b.goal.due))[0]

  if (urgentGoal) {
    const remaining = Math.max(0, urgentGoal.goal.target - urgentGoal.progress.value)
    const overdue = urgentGoal.goal.due < on
    items.push({
      id: `goal-${urgentGoal.goal.id}`,
      kind: 'goal',
      title: urgentGoal.goal.title,
      detail: `${remaining} ${urgentGoal.goal.unit} remaining · ${overdue ? 'overdue' : `due ${formatDueDate(urgentGoal.goal.due)}`}`,
      minutes: 5,
    })
  }

  const unfinished = lessons.filter(lesson => !state.completedLessons.includes(lesson.id))
  const nextLesson = unfinished.find(lesson => state.bookmarks.includes(lesson.id)) ?? unfinished[0]
  if (nextLesson) {
    items.push({
      id: `lesson-${nextLesson.id}`,
      kind: 'lesson',
      title: nextLesson.title,
      detail: `${nextLesson.courseTitle} · next lesson`,
      minutes: nextLesson.minutes,
      lessonId: nextLesson.id,
      courseId: nextLesson.courseId,
    })
  }

  return items.slice(0, 3)
}

function formatDueDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
