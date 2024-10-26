import { cache } from 'react';
import db from '@/db/drizzle';
import { auth} from '@clerk/nextjs/server';
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
import { ClerkProvider } from '@clerk/nextjs';
import { email } from 'react-admin';

// Get User Progress
export const getUserProgress = cache(async () => {
    const { userId } = await auth();

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

// Get Units
export const getUnits = cache(async () => {
    const userProgressData = await getUserProgress();
    const { userId } = await auth();

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

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if (lesson.challenges.length === 0) {
                return { ...lesson, completed: false };
            }

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return (
                    challenge.challengeProgress &&
                    challenge.challengeProgress.length > 0 &&
                    challenge.challengeProgress.every((progress) => progress.completed)
                );
            });

            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});

// Get Courses
export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data;
});

// Get Course by ID
export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
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
    return data;
});

// Get Course Progress
export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
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
        .find((lesson) => {
            return lesson.challenges.some((challenge) => {
                return (
                    !challenge.challengeProgress ||
                    challenge.challengeProgress.length === 0 ||
                    challenge.challengeProgress.some((progress) => !progress.completed)
                );
            });
        });

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    };
});

// Get Lesson
export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const courseProgress = await getCourseProgress();
    const lessonId = id || courseProgress?.activeLessonId;

    // Ensure lessonId is a number
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

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed =
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every((progress) => progress.completed);

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges };
});


// Get Lesson Percentage
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

    const percentage = Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100
    );

    return percentage;
});

/// Get User Subscription
export const getUserSubscription = cache(async () => {
    // Step 1: Get session claims to access user's email
    const { sessionClaims } = await auth();
    const primaryEmail = sessionClaims?.email as string;

    // Step 2: Query the database to find the user's subscription by email
    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.email, primaryEmail), // Ensure this matches your schema
    });

    // Step 3: Return the subscription data with an isActive flag or null
    return data ? { ...data, isActive: true } : null; // Modify as needed
});

// Get Top Ten Users
export const getTopTenUsers = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const data = await db.query.userProgress.findMany({
        orderBy: [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImgSrc: true,
            points: true,
        },
    });

    return data;
});

