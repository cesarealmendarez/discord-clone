import { useState } from "react";

export default function Friends() {
    const [addFriendFormOpen, setAddFriendFormOpen] = useState<boolean>(false);

    return (
        <div
            className="h-screen flex flex-col grow bg-[#313338]"
        >
            <div
                id="friends-toolbar"
                className="w-full h-[48px] flex flex-row items-center justify-start px-4 border-b-[1px] border-neutral-800"
            >
                <ul className="flex flex-row items-center justify-start space-x-2">
                    <li>
                        <button
                            className="flex flex-row items-center justify-center px-3 py-[0.5px] rounded"
                            onClick={() => {
                                setAddFriendFormOpen(false);
                            }}
                        >
                            <p className="text-center text-base text-neutral-400 font-medium">Online</p>
                        </button>
                    </li>
                    <li>
                        <button
                            className="flex flex-row items-center justify-center px-3 py-[0.5px] bg-white/10 rounded"
                            onClick={() => {
                                setAddFriendFormOpen(false);
                            }}
                        >
                            <p className="text-center text-base text-white font-medium">All</p>
                        </button>
                    </li>
                    <li>
                        <button
                            className="flex flex-row items-center justify-center px-3 py-[0.5px] rounded"
                            onClick={() => {
                                setAddFriendFormOpen(false);
                            }}
                        >
                            <p className="text-center text-base text-neutral-400 font-medium">Pending</p>
                        </button>
                    </li>
                    <li>
                        <button
                            className="flex flex-row items-center justify-center px-3 py-[0.5px] rounded"
                            onClick={() => {
                                setAddFriendFormOpen(false);
                            }}
                        >
                            <p className="text-center text-base text-neutral-400 font-medium">Blocked</p>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => { if (!addFriendFormOpen) { setAddFriendFormOpen(true); } }}
                            className="flex flex-row items-center justify-center px-3 py-[0.5px] bg-[#258046] rounded"
                        >
                            <p className="text-center text-base text-white font-medium">Add Friend</p>
                        </button>
                    </li>
                </ul>

                <ul className="space-x-2 grow">
                    <li>

                    </li>

                    <div className="h-full border-r-[1px] border-neutral-500" />

                    <li>

                    </li>
                    <li>

                    </li>
                </ul>
            </div>

            <div
                className="w-full grow flex flex-row"
            >
                <div
                    className="flex flex-col grow h-full border-r-[0.5px] border-neutral-700"
                >
                    {addFriendFormOpen ?
                        <form className="w-full flex flex-col items-start justify-start px-8 py-4 border-b-[0.5px] border-neutral-700 space-y-4">
                            <div className="w-full flex flex-col items-start justify-start space-y-2">
                                <h1 className="text-left text-base text-white font-semibold">ADD FRIEND</h1>
                                <p className="text-left text-xs text-neutral-400 font-normal">You can add friends with their Discord username.</p>
                            </div>

                            <div className="w-full flex flex-row items-center justify-center px-2 py-2 bg-neutral-900 rounded-lg border-2 border-black space-x-4">
                                <input placeholder="You can add friends with their Discord username." className="grow text-sm bg-transparent" />
                                <button className="flex flex-row items-center justify-center bg-violet-600 px-4 py-2 rounded">
                                    <p className="text-center text-xs text-white font-medium">Send Friend Request</p>
                                </button>
                            </div>
                        </form>
                        :
                        <div className="w-full flex flex-col items-start justify-start px-8 py-4 ">
                            <ul className="w-full flex flex-col">
                                <li>
                                    <button className="w-full flex flex-row items-center border-t-[1px] border-t-[0.5px] border-neutral-600 py-3">

                                        <div className="flex flex-row grow items-center space-x-2">
                                            <img src="https://picsum.photos/200/300" className="w-[32px] h-[32px] object-cover rounded-full" />

                                            <div className="flex flex-col items-start justify-start">
                                                <h1 className="text-left text-sm text-white font-medium">RaidenGodly</h1>
                                                <p className="text-left text-sm text-neutral-400 font-normal">Offline</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center justify-end space-x-4">
                                            <a>
                                                Message
                                            </a>
                                            <a>
                                                More
                                            </a>
                                        </div>
                                    </button>
                                </li>
                                <li className="w-full flex flex-row items-center border-t-[1px] border-t-[0.5px] border-neutral-600 py-4">

                                </li>
                                <li className="w-full flex flex-row items-center border-t-[1px] border-t-[0.5px] border-neutral-600 py-4">

                                </li>
                            </ul>
                        </div>
                    }
                </div>

                <div id="friends-activity" className="hidden xl:flex xl:w-[358px] h-full">
                    {/* Friends activity content */}
                </div>
            </div>
        </div>
    );
}