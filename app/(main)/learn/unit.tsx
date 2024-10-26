'use client'

import { useEffect, useRef } from "react";
import { challenges, courses, lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import { UnitBannerArab } from "./unit-banner-arab";

type Props = {
    id: number;
    order: number;
    title: string;
    description: string;
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean;
    })[];
    isArabic: boolean;

    activeLesson: (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
    }) | undefined;

    activeLessonPercentage: number;
};

export const Unit = ({
    id,
    order,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage,
    isArabic,
}: Props) => {
    // Ref to track the current lesson button
    const currentLessonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Check if activeLesson is defined and currentLessonRef is set
        if (activeLesson && currentLessonRef.current) {
            // Delay the scroll action to ensure DOM elements are rendered
            setTimeout(() => {
                currentLessonRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 0);
        }
    }, [activeLesson]); // Depend only on activeLesson

    return (
        <>
            {isArabic ? (
                <UnitBannerArab title={title} description={description} />
            ) : (
                <UnitBanner title={title} description={description} />
            )}
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;

                    return (
                        <div
                            key={lesson.id}
                            ref={isCurrent ? currentLessonRef : null} // Set ref to current lesson
                        >
                            <LessonButton
                                id={lesson.id}
                                index={index}
                                totalCount={lessons.length - 1}
                                current={isCurrent}
                                locked={isLocked}
                                percentage={activeLessonPercentage}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};
