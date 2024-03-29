import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useStore, addMessage, useStoreUpdated } from "@/lib/Store";
import { usePathname } from 'next/navigation'

export default function ChannelsPage() {
    const router = useRouter();
    const { id: channelID } = router.query
    const { messages } = useStoreUpdated({ channelID })

    const [newMessageFormData, setNewMessageFormData] = useState<FormData>(new FormData());

    const handleNewMessageFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        newMessageFormData.set(name, value);
    };

    const handleNewMessageFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log("channelID: ", channelID)
        addMessage(newMessageFormData.get("messageText") as string, channelID, "13ede475-5074-47f8-9721-4bb38ef70b4f");
    };

    return (
        <div>
            <h1>Channel: {channelID}</h1>

            <p>{messages.length} messages</p>

            <form onSubmit={handleNewMessageFormSubmit} className="flex flex-row">
                <label> New Message: <input type="text" name="messageText" onChange={handleNewMessageFormInputChange} /></label>
                <br />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message, messageIDX) => {
                    return (
                        <li key={messageIDX} className="border-2 border-black">
                            <p>{message.message}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}