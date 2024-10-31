import { cache } from 'react';
import db from '@/db/drizzle';
import { auth, clerkClient } from '@clerk/nextjs/server';
import {
    challengeOptions,
    challengeProgress,
    challenges,
    courses,
    lessons,
    units,
    userProgress,
    userSubscription
} from '@/db/schema';
import { eq, asc, desc } from 'drizzle-orm';
import { email } from 'react-admin';

// Helper to get authenticated userId safely
const getAuthenticatedUserId = async (): Promise<string | null> => {
    const { userId } = await auth();
    return userId || null;
};

// Get User Progress for a specific user
export const getUserProgress = cache(async () => {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });
    return data;
});

// Get Units for the active course of the authenticated user
export const getUnits = cache(async () => {
    const userId = await getAuthenticatedUserId();
    const userProgressData = await getUserProgress();

    if (!userId || !userProgressData?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        orderBy: [asc(units.order)],
        where: eq(units.courseId, userProgressData.activeCourseId),
        with: {
            lessons: {
                orderBy: [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    return data.map((unit) => ({
        ...unit,
        lessons: unit.lessons.map((lesson) => ({
            ...lesson,
            completed: lesson.challenges.every(
                (challenge) => challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed)
            ),
        })),
    }));
});

// Get all Courses
export const getCourses = cache(async () => {
    return await db.query.courses.findMany();
});

// Get Course by ID
export const getCourseById = cache(async (courseId: number) => {
    return await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: [asc(lessons.order)],
                    },
                },
            },
        },
    });
});

// Get Course Progress for the authenticated user
export const getCourseProgress = cache(async () => {
    const userId = await getAuthenticatedUserId();
    const userProgressData = await getUserProgress();

    if (!userId || !userProgressData?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: [asc(units.order)],
        where: eq(units.courseId, userProgressData.activeCourseId),
        with: {
            lessons: {
                orderBy: [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const firstUncompletedLesson = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .find((lesson) => lesson.challenges.some((challenge) =>
            !challenge.challengeProgress ||
            challenge.challengeProgress.length === 0 ||
            challenge.challengeProgress.some((progress) => !progress.completed)
        ));

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    };
});

// Get Lesson by ID or active lesson for the authenticated user
export const getLesson = cache(async (id?: number) => {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
        return null;
    }

    const courseProgress = await getCourseProgress();
    const lessonId = id || courseProgress?.activeLessonId;
    const numericLessonId = Number(lessonId);

    if (isNaN(numericLessonId)) {
        console.error('Invalid lessonId:', lessonId);
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, numericLessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!data || !data.challenges) {
        return null;
    }

    return {
        ...data,
        challenges: data.challenges.map((challenge) => ({
            ...challenge,
            completed: challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed),
        })),
    };
});

// Calculate Lesson Completion Percentage
export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLessonId) {
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);

    if (!lesson) {
        return 0;
    }

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);

    return Math.round((completedChallenges.length / lesson.challenges.length) * 100);
});

// Get User Subscription Status
export const getUserSubscription = cache(async () => {
    const { sessionClaims } = await auth();
    const primaryEmail = sessionClaims?.email as string | null;

    if (!primaryEmail) {
        return null;
    }

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.email, primaryEmail),
    });

    return data ? { ...data, isActive: true } : null;
});

// Get Top Ten Users by XP Points for Leaderboard
export const getTopTenUsers = cache(async () => {
    const data = await db.query.userProgress.findMany({
        orderBy: [desc(userProgress.points)],
        limit: 50,
    });

    // Map the data to extract necessary fields
    return data.map(userProgress => ({
        userId: userProgress.userId,
        userName: userProgress.userName || 'User', // Assuming you have this field in userProgress
        userImgSrc: userProgress.userImgSrc || '/default-avatar.svg', // Assuming you have this field in userProgress
        email : userProgress.email,
        points: userProgress.points,
    }));
});
