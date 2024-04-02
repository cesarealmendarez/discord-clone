import { useEffect, useState } from "react";
import { supabase, supabaseBrowserClient } from "./supabase";;

export const useStoreUpdated = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, handleNewMessage] = useState(null)

    useEffect(() => {
        const messageListener = supabaseBrowserClient.channel('messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) =>
            handleNewMessage(payload.new)
        ).subscribe()
    }, []);

    useEffect(() => {
        if (props.channelID) {
            fetchMessages(props.channelID, (messages) => {
                setMessages(messages);
            });
        }
    }, [props.channelID]);

    useEffect(() => {
        if (newMessage && newMessage.channel_id == props.channelID) {
            const handleAsync = async () => {
                setMessages(messages.concat(newMessage));
            };
            handleAsync();
        }
    }, [newMessage])

    return { messages: messages };
}

export const useStore = (props) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, handleNewMessage] = useState(null);

    useEffect(() => {



        // console.log("Props from useStore: ", props);
        const messageListener = supabaseBrowserClient.channel("messages").on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) =>
            handleNewMessage(payload.new)
        ).subscribe();

        return () => { supabaseBrowserClient.removeChannel(supabaseBrowserClient.channel(messageListener)) };
    }, []);

    useEffect(() => {
        if (props?.channelID > 0) {
            fetchMessages(props.channelID, (messages) => {
                setMessages(messages);

            });
        }
    }, [props.channelID]);

    useEffect(() => {
        const handleAsync = async () => {
            setMessages(messages.concat(newMessage));
        };

        handleAsync();
    }, [newMessage]);

    return { messages: messages };
}

export const fetchMessages = async (channelID: string, setState) => {
    try {
        let messagesSelectResponse = await supabaseBrowserClient.from("messages").select("*").eq("channel_id", channelID).order("inserted_timestamp", { ascending: true });

        if (setState) {
            setState(messagesSelectResponse.data);
        }

        return messagesSelectResponse.data;

    } catch (error) {
        // console.log(error); 
    }
}

export const addMessage = async (message: string, channelID: string, userID: string) => {
    // console.log(message, channelID, userID)
    try {
        let messagesInsertResponse = await supabase.from("messages").insert([{ message: message, channel_id: channelID, user_id: userID }]).select();

        // console.log(messagesInsertResponse)
        return messagesInsertResponse.data![0];
    } catch (error) { }
}