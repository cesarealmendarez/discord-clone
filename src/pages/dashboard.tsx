import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { acceptFriendship, blockFriendship, fetchFriendships, removeFriendship, sendFriendshipRequest, signOut, unblockFriendship } from "@/lib/actions";
import { supabaseBrowserClient } from "@/lib/supabase";

export default function Dashboard() {
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [friendships, setFriendships] = useState<Friendship[]>([]);

    const [friendshipRequestFormData, setFriendshipRequestFormData] = useState<FormData>(new FormData());

    useEffect(() => {
        handleGetUser();
    }, []);

    const handleGetUser = async () => {
        const authGetUserResponse = await supabaseBrowserClient.auth.getUser();
        const usersSelectResponse = await supabaseBrowserClient.from("users").select().eq("email", authGetUserResponse.data.user?.email);

        const user: User = {
            id: usersSelectResponse.data![0].id,
            email: usersSelectResponse.data![0].email,
            displayName: usersSelectResponse.data![0].display_name,
            registrationTimestamp: usersSelectResponse.data![0].registration_timestamp
        };

        setCurrentUser(user);
    };

    const handleSignOut = async () => {
        const response = await signOut();

        if (response === "success") {
            router.push("/dashboard");
        } else {
            console.log("Error");
        }
    };

    const handleFriendshipsRefresh = async () => {
        const response = await fetchFriendships(currentUser?.id!);

        console.log(response);

        if (response !== "error") {
            setFriendships(response);
        } else {
            setFriendships([]);
        }
    }

    const handleAcceptFriendship = async (friendshipId: string) => {
        const response = await acceptFriendship(friendshipId);
    }

    const handleRemoveFriendship = async (friendshipId: string) => {
        const response = await removeFriendship(friendshipId);
    }

    const handleBlockFriendship = async (currentUserID: string, receivingUserID: string, friendshipId: string) => {
        const response = await blockFriendship(currentUserID, receivingUserID, friendshipId);
    }

    const handleUnblockFriendship = async (friendshipId: string) => {
        const response = await unblockFriendship(friendshipId);
    }

    const handleRequestFriendshipInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        friendshipRequestFormData.set(name, value);
    };

    const handleRequestFriendship = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await sendFriendshipRequest(currentUser?.id!, friendshipRequestFormData);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {currentUser &&
                <div>
                    <h1>Welcome, {currentUser.displayName}</h1>
                    <h1>{currentUser.email}</h1>
                    <h1>You Registered: {currentUser.registrationTimestamp}</h1>
                </div>
            }
            <button onClick={handleSignOut}>
                <p>Sign Out</p>
            </button>

            <div>
                <h1>Friends</h1>
                <form onSubmit={handleRequestFriendship}>
                    <input name="receivingUserID" placeholder="receivingUserID" onChange={handleRequestFriendshipInputChange} />
                    <button type="submit">
                        <p>Send Friend Request</p>
                    </button>
                </form>

                <button onClick={handleFriendshipsRefresh}>
                    <p>Refresh</p>
                </button>

                <div>
                    <h1>All</h1>
                    <ul className="border-b-2 border-black">
                        {friendships.filter(friendship => friendship.status == "accepted").map((friendship, friendshipIDX) => {
                            return (
                                <li key={friendshipIDX} className="flex flex-row border-b-2 border-black">
                                    {friendship.sendingUser.id != currentUser?.id ?
                                        <h1>{friendship.sendingUser.displayName}</h1>
                                        :
                                        <></>
                                    }
                                    {friendship.receivingUser.id != currentUser?.id ?
                                        <h1>{friendship.receivingUser.displayName}</h1>
                                        :
                                        <></>
                                    }
                                    <button onClick={() => { handleRemoveFriendship(friendship.id); }} className="border-2 border-red-500">
                                        <p>Remove</p>
                                    </button>
                                    <button
                                        onClick={() => {
                                            const userId = currentUser?.id;
                                            const receiverUserId = friendship.receivingUser.id;
                                            const senderUserId = friendship.sendingUser.id;

                                            const friendId = userId === receiverUserId ? senderUserId : receiverUserId;

                                            handleBlockFriendship(userId, friendId, friendship.id);
                                        }}

                                        className="border-2 border-red-500"
                                    >
                                        <p>Block</p>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <h1>Pending Outgoing</h1>
                    <ul className="border-b-2 border-black">
                        {friendships.filter(friendship => (friendship.status == "pending" && friendship.sendingUser.id == currentUser?.id)).map((friendship, friendshipIDX) => {
                            return (
                                <li key={friendshipIDX} className="flex flex-row border-b-2 border-black">
                                    <h1>{friendship.receivingUser.displayName}</h1>
                                    <button onClick={() => { handleRemoveFriendship(friendship.id); }} className="border-2 border-red-500">
                                        <p>Redact</p>
                                    </button>
                                    <button
                                        onClick={() => {
                                            const userId = currentUser?.id;
                                            const receiverUserId = friendship.receivingUser.id;
                                            const senderUserId = friendship.sendingUser.id;

                                            const friendId = userId === receiverUserId ? senderUserId : receiverUserId;

                                            handleBlockFriendship(userId, friendId, friendship.id);
                                        }}

                                        className="border-2 border-red-500"
                                    >
                                        <p>Block</p>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <h1>Pending Incoming</h1>
                    <ul className="border-b-2 border-black">
                        {friendships.filter(friendship => (friendship.status == "pending" && friendship.receivingUser.id == currentUser?.id)).map((friendship, friendshipIDX) => {
                            return (
                                <li key={friendshipIDX} className="flex flex-row border-b-2 border-black">
                                    <h1>{friendship.sendingUser.displayName}</h1>
                                    <button onClick={() => { handleRemoveFriendship(friendship.id); }} className="border-2 border-red-500">
                                        <p>Reject</p>
                                    </button>
                                    <button onClick={() => { handleAcceptFriendship(friendship.id) }} className="border-2 border-green-500">
                                        <p>Accept</p>
                                    </button>
                                    <button
                                        onClick={() => {
                                            const userId = currentUser?.id;
                                            const receiverUserId = friendship.receivingUser.id;
                                            const senderUserId = friendship.sendingUser.id;

                                            const friendId = userId === receiverUserId ? senderUserId : receiverUserId;

                                            handleBlockFriendship(userId, friendId, friendship.id);
                                        }}

                                        className="border-2 border-red-500"
                                    >
                                        <p>Block</p>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>


                    <h1>Blocked</h1>
                    <ul className="border-b-2 border-black">
                        {friendships.filter(friendship => (friendship.status == "blocked" && friendship.sendingUser.id == currentUser?.id)).map((friendship, friendshipIDX) => {
                            return (
                                <li key={friendshipIDX} className="flex flex-row border-b-2 border-black">
                                    <h1>{friendship.receivingUser.displayName}</h1>
                                    <button onClick={() => { handleUnblockFriendship(friendship.id); }} className="border-2 border-red-500">
                                        <p>Unblock</p>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}