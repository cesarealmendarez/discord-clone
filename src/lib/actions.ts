import { supabaseBrowserClient } from "./supabase";

export async function signUpNewUser(formData: FormData) {
    const authSignUpNewUserResponse = await supabaseBrowserClient.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string
    });

    if (!authSignUpNewUserResponse.error) {
        const user = {
            email: formData.get("email") as string,
            display_name: formData.get("display_name") as string,
        };

        const usersInsertResponse = await supabaseBrowserClient.from("users").insert(user).select();

        if (!usersInsertResponse.error) {
            return "success";
        } else {
            return "error";
        }
    } else {
        return "error";
    }
}

export async function signInWithEmail(formData: FormData) {
    const authSignInWithPasswordResponse = await supabaseBrowserClient.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!authSignInWithPasswordResponse.error) {
        return "success";
    } else {
        return "error";
    }
}

export async function signOut() {
    const authSignOutResponse = await supabaseBrowserClient.auth.signOut();

    if (!authSignOutResponse.error) {
        return "success";
    } else {
        return "error";
    }
}

export async function fetchFriendships(currentUserID: string) {
    const friendshipsFetchResponse = await supabaseBrowserClient.from("friendships").select("*").or(`sending_user_id.eq.${currentUserID},receiving_user_id.eq.${currentUserID}`);

    console.log(friendshipsFetchResponse)

    if (friendshipsFetchResponse.error) {
        return "error";
    }

    const friendshipsObject = friendshipsFetchResponse.data?.map(async (friendship) => {
        let friendshipObject: Friendship;

        if (friendship.sending_user_id == currentUserID) {
            const receivingUserFetchResponse = await supabaseBrowserClient.from("users").select().eq("id", friendship.receiving_user_id);

            friendshipObject = {
                id: friendship.id,
                status: friendship.status,
                sendingUser: { id: currentUserID },
                receivingUser: { id: receivingUserFetchResponse.data![0].id, displayName: receivingUserFetchResponse.data![0].display_name }
            };

        } else {
            const sendingUserFetchResponse = await supabaseBrowserClient.from("users").select().eq("id", friendship.sending_user_id);

            friendshipObject = {
                id: friendship.id,
                status: friendship.status,
                sendingUser: { id: sendingUserFetchResponse.data![0].id, displayName: sendingUserFetchResponse.data![0].display_name },
                receivingUser: { id: currentUserID },
            };
        }

        return friendshipObject;
    });

    const friendships = await Promise.all(friendshipsObject);

    return friendships;
}

export async function sendFriendshipRequest(currentUserId: string, friendshipRequestFormData: FormData) {
    if (currentUserId != friendshipRequestFormData.get("receivingUserID") as string) {
        const friendshipsInsertResponse = await supabaseBrowserClient.from("friendships").insert([{ status: "pending", sending_user_id: currentUserId, receiving_user_id: friendshipRequestFormData.get("receivingUserID") as string }]).select();

        if (!friendshipsInsertResponse.error) {
            return friendshipsInsertResponse.data;
        } else {
            return "error";
        }
    } else {
        return "error";
    }
}

export async function acceptFriendship(friendshipID: string) {
    const friendshipUpdateResponse = await supabaseBrowserClient.from("friendships").update({ status: "accepted" }).eq("id", friendshipID).select();

    if (!friendshipUpdateResponse.error) {
        return friendshipUpdateResponse.data;
    } else {
        return "error";
    }
}

export async function removeFriendship(friendshipID: string) {
    const friendshipDeleteResponse = await supabaseBrowserClient.from("friendships").delete().eq("id", friendshipID)

    if (!friendshipDeleteResponse.error) {
        return friendshipDeleteResponse.data;
    } else {
        return "error";
    }
}

export async function blockFriendship(currentUserID: string, receivingUserID: string, friendshipID: string) {
    const friendshipUpdateResponse = await supabaseBrowserClient.from("friendships").update({ sending_user_id: currentUserID, receiving_user_id: receivingUserID, status: "blocked" }).eq("id", friendshipID).select();

    if (!friendshipUpdateResponse.error) {
        return friendshipUpdateResponse.data;
    } else {
        return "error";
    }
}

export async function unblockFriendship(friendshipID: string) {
    const friendshipDeleteResponse = await supabaseBrowserClient.from("friendships").delete().eq("id", friendshipID);

    if (!friendshipDeleteResponse.error) {
        return friendshipDeleteResponse.data;
    } else {
        return "error";
    }
}