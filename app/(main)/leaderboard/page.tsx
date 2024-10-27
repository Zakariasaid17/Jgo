import { FeedWraper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const leaderboardData = getTopTenUsers();

    const [userProgress, userSubscription, leaderboard] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        leaderboardData,
    ]);

    // Redirect if user progress or active course is not found
    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
                {!isPro && <Promo />}
                <Quests points={userProgress.points} />
            </StickyWrapper>
            <FeedWraper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src='/leaderboard.svg'
                        alt='leaderboard'
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Tableau des scores
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6 ">
                        Voyez où vous vous situez parmi les autres apprenants de la communauté.
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {leaderboard.map((user, index) => (
                        <div
                            key={user.userId}
                            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                        >
                            <p className="font-bold text-sky-700 mr-4">{index + 1}</p>
                            <Avatar className="border bg-blue-600 h-12 w-12 ml-3 mr-6">
                                <AvatarImage
                                    className="object-cover"
                                    src={user.userImgSrc || '/default-avatar.svg'}
                                    alt={`${user.userName || 'User'}'s avatar`}
                                />
                            </Avatar>
                            <p className="font-bold text-neutral-800 flex-1">
                                {user.userName || 'User'}
                            </p>
                            <p className="text-muted-foreground">
                                {user.points || 0} XP
                            </p>
                        </div>
                    ))}
                </div>
            </FeedWraper>
        </div>
    );
};

export default LeaderboardPage;

