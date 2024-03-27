import { useRouter } from "next/router";
import { signOut } from "@/lib/actions";

export default function Dashboard() {
    const router = useRouter()

    const handSignOut = async () => {
        const response = await signOut();

        if (response === "success") {
            router.push("/dashboard");
        } else {
            console.log("Error");
        }
    };

    return (
        <div>
            <h1>
                Dashboard
            </h1>
            <button onClick={handSignOut}>
                <p>Sign Out</p>
            </button>
        </div>
    );
}