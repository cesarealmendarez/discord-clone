import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            console.log(router);
        }
    }, [router]);

    return (
        <div className="w-screen h-screen flex flex-row bg-rose-500">
            <ul
                id="navigation-bar"
                className="w-[72px] h-screen flex flex-col overflow-y-scroll bg-[#1e2124] space-y-2 py-[12px] no-scrollbar"
            >
                <li className="relative flex col items-center justify-center">
                    <div className="absolute left-0 my-auto h-[40px] w-[4px] bg-white rounded-tr-xl rounded-br-xl" />

                    <a
                        href="#"
                        className="w-[48px] h-[48px] flex flex-col items-center justify-center bg-indigo-500 rounded-2xl"
                    >

                    </a>
                </li>
            </ul>

            <div
                id="channel-navigation-bar"
                className="w-[240px] h-screen flex flex-col bg-[#2a2d31]"
            >
                {/* <div className="w-full h-[48px] border-b-[1px] border-neutral-900">

                </div>

                <ul className="px-3 pt-2">
                    <li className="">
                        <a
                            href="/channels/@me"
                            className="w-[221px] flex px-4 py-2 bg-white/10 rounded"
                        >
                            <p className="text-left text-white font-medium">Friends</p>
                        </a>
                    </li>
                </ul> */}
                {/* <a
                    href="/channels/@me"

                >
                    <p>Friends</p>
                </a>

                <p>Direct Messages</p>
                <ul>
                    <li>
                        <a
                            href="/channels/@me/693cf301-db6b-4bc2-b975-a8d8dfcd913c"
                        >
                            <p>693cf301-db6b-4bc2-b975-a8d8dfcd913c</p>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/channels/@me/f3ad5dfc-090a-4fa7-8390-c0430f5c9461"
                        >
                            <p>f3ad5dfc-090a-4fa7-8390-c0430f5c9461</p>
                        </a>
                    </li>
                </ul> */}
            </div>

            {/* 
                if discord.com/channels/@me: friends list
                else if discord.com/channels/@me/channelID: chat
            */}
            {/* <div
                id="content"
                className="h-screen flex flex-col grow bg-[#323338]"
            >


            </div> */}
            {/* <div className="bg-neutral-900">
                <p>Servers Sidebar</p>
            </div>

            <div className="bg-neutral-800">
                <p>Server Channel Navigation Bar</p>
            </div>

            <main className="bg-neutral-700">
                {children}
            </main> */}

            {children}
        </div>
    );
}