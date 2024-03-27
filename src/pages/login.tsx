import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmail } from "@/lib/actions";

export default function Login() {
    const router = useRouter()

    const [loginFormData, setLoginFormData] = useState<FormData>(new FormData());

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        loginFormData.set(name, value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await signInWithEmail(loginFormData);

        if (response === "success") {
            router.push("/dashboard");
        } else {
            console.log("Error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email" onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}