import { auth } from "@clerk/nextjs/server"

const adminIds = [
    'user_2j7VomCWVzpzU2YSOPojKWo1BpB',
]

export const isAdmin = () => {
    const { userId } = auth();

    if(!userId){
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}