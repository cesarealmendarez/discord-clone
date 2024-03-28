import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { signUpNewUser } from "@/lib/actions";

export default function Register() {
    const router = useRouter()

    const [registrationFormData, setRegistrationFormData] = useState<FormData>(new FormData());

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        registrationFormData.set(name, value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await signUpNewUser(registrationFormData);

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
                    Display Name:
                    <input type="text" name="display_name" onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}