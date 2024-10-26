'use server';

import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getUserSubscription} from '@/db/queries';

const returnUrl = absoluteUrl('/shop');

export const createSubscriptionUrl = async (): Promise<{ data: string | null; error: string | null }> => {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return { data: null, error: 'Unauthorized' };
        }

        // Check if the user already has a subscription
        const userSubscription = await getUserSubscription();

        if (userSubscription) {
            return { data: returnUrl || '/shop', error: null };
        }

       

        return { data: returnUrl || '/shop', error: null };
    } catch (error) {
        console.error('Error creating subscription:', error);
        return { data: null, error: 'Failed to create subscription' };
    }
};
