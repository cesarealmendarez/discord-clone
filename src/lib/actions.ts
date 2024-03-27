import { supabaseBrowserClient } from "./supabase";

export async function signUpNewUser(formData: FormData) {
    const response = await supabaseBrowserClient.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string
    });

    if (!response.error) {
        const user = {
            email: formData.get("email") as string,
            username: formData.get("username") as string,
            display_name: formData.get("display_name") as string,
        };

        const response = await supabaseBrowserClient.from("users").insert(user).select();

        if (!response.error) {
            return "success";
        } else {
            return "error";
        }
    } else {
        return "error";
    }
}

export async function signInWithEmail(formData: FormData) {
    const response = await supabaseBrowserClient.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!response.error) {
        return "success";
    } else {
        return "error";
    }
}

export async function signOut() {
    const response = await supabaseBrowserClient.auth.signOut();

    if (!response.error) {
        return "success";
    } else {
        return "error";
    }
}