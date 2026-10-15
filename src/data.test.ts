import { describe, expect, it } from 'vitest'
import { courses, learningPaths } from './data'

describe('Electron + TypeScript 14-day course', () => {
  const course = courses.find(item => item.id === 'electron-typescript-14-day')

  it('is available as a complete 14-day course', () => {
    expect(course).toBeDefined()
    expect(course?.modules).toHaveLength(7)
    expect(course?.modules.flatMap(module => module.lessons)).toHaveLength(14)
  })

  it('uses unique lesson ids and Tamil-first video resources', () => {
    const lessons = course?.modules.flatMap(module => module.lessons) ?? []
    const lessonIds = lessons.map(lesson => lesson.id)

    expect(new Set(lessonIds).size).toBe(lessonIds.length)
    for (const lesson of lessons) {
      expect(lesson.resources[0]).toMatchObject({ kind: 'Video', language: 'Tamil' })
      expect(lesson.resources.some(resource => resource.kind === 'Practice')).toBe(true)
    }
  })

  it('is included in the desktop developer learning path', () => {
    const path = learningPaths.find(item => item.id === 'electron-desktop-developer')

    expect(path?.courseIds).toContain('electron-typescript-14-day')
  })
})
