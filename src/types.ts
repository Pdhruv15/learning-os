export type Category = 'Electrical' | 'Programming' | 'AI' | 'Science' | 'Business' | 'Languages' | 'Personal'
export type ResourceKind = 'Video' | 'Guide' | 'Tool' | 'Practice'

export interface Resource { title: string; url: string; kind: ResourceKind; language: 'Tamil' | 'English' }
export interface Lesson { id: string; title: string; minutes: number; summary: string; objectives: string[]; resources: Resource[]; quiz?: QuizQuestion[] }
export interface Module { id: string; title: string; description: string; lessons: Lesson[] }
export interface Course { id: string; title: string; category: Category; level: 'Beginner' | 'Intermediate' | 'Advanced'; description: string; accent: string; icon: string; modules: Module[]; featured?: boolean }
export interface LearningPath { id: string; title: string; description: string; courseIds: string[]; icon: string }
export interface QuizQuestion { id: string; prompt: string; options: string[]; answer: number; explanation: string }
export interface Note { id: string; lessonId?: string; title: string; body: string; updatedAt: string }
export interface Goal { id: string; title: string; target: number; unit: 'lessons' | 'minutes' | 'sessions'; due: string; completed: boolean }
export interface StudySession { id: string; courseId?: string; minutes: number; date: string; note: string }
export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'
export interface ReviewSchedule { lessonId: string; due: string; intervalDays: number; repetitions: number; lastReviewed?: string; lastRating?: ReviewRating }
export interface AppState { completedLessons: string[]; bookmarks: string[]; notes: Note[]; goals: Goal[]; sessions: StudySession[]; quizScores: Record<string, number>; streakDates: string[]; onboardingDone: boolean; customCourses: Course[]; reviews: Record<string, ReviewSchedule> }
