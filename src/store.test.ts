import { describe, expect, it } from 'vitest'
import { exportPayload, initialState, lessonProgress, validateImport } from './store'

describe('Learning OS data helpers', () => {
  it('calculates lesson progress', () => expect(lessonProgress(['a', 'c'], ['a', 'b', 'c', 'd'])).toBe(50))
  it('round-trips an exported backup', () => expect(validateImport(JSON.parse(exportPayload(initialState))).completedLessons).toEqual([]))
  it('keeps personal courses in backups', () => {
    const state = { ...initialState, customCourses: [{ id: 'mine', title: 'My course', category: 'Personal' as const, level: 'Beginner' as const, description: 'Personal links', accent: '#397a72', icon: '◇', modules: [] }] }
    expect(validateImport(JSON.parse(exportPayload(state))).customCourses[0].title).toBe('My course')
  })
  it('migrates older backups without revision data', () => {
    const oldBackup = { app: 'Learning OS', version: 1, data: { completedLessons: ['lesson-1'] } }
    expect(validateImport(oldBackup).reviews).toEqual({})
    expect(validateImport(oldBackup).flashcards).toEqual([])
  })
  it('rejects unrelated JSON', () => expect(() => validateImport({ hello: 'world' })).toThrow())
})
