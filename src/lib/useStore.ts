import { useEffect, useState } from "react"
import { supabaseBrowserClient } from "./supabase";

export const useStore = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, handleNewMessage] = useState([]);
    const [deletedMessage, handleDeletedMessage] = useState(null)

    useEffect(() => {
        // Get Channels
        // fetchChannels(setChannels)
        // Listen for new and deleted messages
        const messageListener = supabaseBrowserClient
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) =>
                handleNewMessage(payload.new)
            )
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, (payload) =>
                handleDeletedMessage(payload.old)
            )
            .subscribe()
        // Listen for changes to our users
        // const userListener = supabaseBrowserClient
        //   .channel('public:users')
        //   .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) =>
        //     handleNewOrUpdatedUser(payload.new)
        //   )
        //   .subscribe()
        // Listen for new and deleted channels
        // const channelListener = supabase
        //   .channel('public:channels')
        //   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, (payload) =>
        //     handleNewChannel(payload.new)
        //   )
        //   .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'channels' }, (payload) =>
        //     handleDeletedChannel(payload.old)
        //   )
        //   .subscribe()
        // Cleanup on unmount
        return () => {
            supabaseBrowserClient.removeChannel(supabaseBrowserClient.channel(messageListener))
            //   supabaseBrowserClient.removeChannel(supabaseBrowserClient.channel(userListener))
            //   supabaseBrowserClient.removeChannel(supabaseBrowserClient.channel(channelListener))
        }
    }, [])

    useEffect(() => {

    }, [newMessage]);

    useEffect(() => {

    }, [deletedMessage]);

    return {
        // We can export computed values here to map the authors to each message
        messages: messages
        // channels: channels !== null ? channels.sort((a, b) => a.slug.localeCompare(b.slug)) : [],
        // users,
    }
}

/**
 * Fetch all messages and their authors
 * @param {number} channelID
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */

export const fetchMessages = async (channelID, setState) => {
    try {
        let { data } = await supabaseBrowserClient
            .from('messages')
            .select(`*`)
            .eq('channel_id', channelID)
            .order('inserted_timestamp', { ascending: true })
        if (setState) setState(data)
        return data
    } catch (error) {
        console.log('error', error)
    }
}

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async (message, channel_id, user_id) => {
    try {
        let { data } = await supabaseBrowserClient
            .from('messages')
            .insert([{ message, channel_id, user_id }])
            .select()
        return data
    } catch (error) {
        console.log('error', error)
    }
}

/**
 * Delete a message from the DB
 * @param {number} message_id
 */
export const deleteMessage = async (message_id) => {
    try {
        let { data } = await supabaseBrowserClient.from('messages').delete().match({ id: message_id })
        return data
    } catch (error) {
        console.log('error', error)
    }
}