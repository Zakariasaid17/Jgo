import { Description } from "@radix-ui/react-dialog";
import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { FileQuestion } from "lucide-react";

export const courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    isArabic: boolean('is_arabic').notNull(),
    imageSrc: text('image_src').notNull()
});

export const coursesRelation = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units),
}));

export const units = pgTable('units', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    isArabic: boolean('is_arabic').notNull(),
    description: text('description').notNull(),
    courseId: integer('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    order: integer('order').notNull()
});

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable('lessons', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    isArabic: boolean('is_arabic').notNull(),
    unitId: integer('unit_id').references(() => units.id, { onDelete: 'cascade' }),
    order: integer('order').notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

export const challengesEnum = pgEnum('type', ['SELECT', 'ASSIST', 'LESSON']);

export const challenges = pgTable('challenges', {
    id: serial('id').primaryKey(),
    order: integer('order').notNull(),
    isArabic: boolean('is_arabic').notNull(),
    lessonId: integer('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }).notNull(),
    type: challengesEnum('type').notNull(),
    isFirstUnit: boolean('is_first_unit').notNull(),
    question: text('question').notNull(),
    sousQuestion: text('sous_question'),
    one: text('one'),
    two: text('two'),
    three: text('three'),
    four: text('four'),
    five: text('five'),
    six: text('six'),
    sousQuestionTwo: text('sous_question_two'),
    one2: text('one_2'),
    two2: text('two_2'),
    three2: text('three_2'),
    four2: text('four_2'),
    five2: text('five_2'),
    six2: text('six_2'),
    titleChallenge: text('title_challenge'),
    profReaction: text('image_src'),
    note: text('note'),
    teacherReaction: text('teacherReaction'),
    example: text('example'),
    sousExemple: text('sous_exemple'),
    a: text('a'),
    b: text('b'),
    c: text('c'),
    d: text('d'),
    e: text('e'),
    f: text('f'),
    example2: text('example2'),
    sousExemple2: text('sous_exemple2'),
    a2: text('a2'),
    b2: text('b2'),
    c2: text('c2'),
    d2: text('d2'),
    e2: text('e2'),
    f2: text('f2'),
    aiImage: text('ai_exemple'),
    exempleImage: text('exemple_image'),
    exempleImage2: text('exemple_image2'),
    aretenir: text('aretenir'),
    retenirA: text('retenirA'),
    retenirB: text('retenirB'),
    retenirC: text('retenirC'),
    retenirD: text('retenirD'),
    video: text('video'),
});

export const challengesRelations = relations(challenges, ({ many, one }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id]
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress)
}));

export const challengeOptions = pgTable('challenge_options', {
    id: serial('id').primaryKey(),
    challengeId: integer('challenge_id').references(() => challenges.id, { onDelete: 'cascade' }).notNull(),
    text: text('text').notNull(),
    isArabic: boolean('is_arabic').notNull(),
    correct: boolean('correct').notNull(),
    imageSrc: text('image_src'),
    audioSrc: text('audio_src'),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id]
    })
}));

export const userProgress = pgTable('user_progress', {
    userId: text('user_id').primaryKey(), // Ensure this is consistently a string
    userName: text('user_name').notNull().default('User'),
    email: text('email').unique(),
    userImgSrc: text('user_image_src').notNull().default('/mascot.svg'),
    activeCourseId: integer('active_course_id').references(() => courses.id, { onDelete: 'cascade' }),
    hearts: integer('hearts').notNull().default(5),
    points: integer('points').notNull().default(0),
});

export const userProgressRelation = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}));

export const challengeProgress = pgTable('challenge_progress', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), // Ensure this is consistently a string
    challengeId: integer('challenge_id').references(() => challenges.id, { onDelete: 'cascade' }).notNull(),
    completed: boolean('completed').notNull().default(false)
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id]
    })
}));

export const userSubscription = pgTable('user_subscription', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    isActive: boolean('is_active').notNull().default(true), 

});
