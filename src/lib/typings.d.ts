interface User {
    id: string;
    email?: string;
    displayName?: string;
    registrationTimestamp?: string;
}

interface Friendship {
    id: string;
    status: string;
    sendingUser: User;
    receivingUser: User;
}