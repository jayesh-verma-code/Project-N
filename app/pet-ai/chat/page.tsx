'use client'
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleFadingArrowUp, Link2, LogOut, MenuIcon, Mic, Send, Settings, Smile, XIcon } from "lucide-react";
import Link from 'next/link';

// Define message type
type Msg = { id: number; text: string };

// Predefined chat responses
const predefinedChat: Msg[] = [
    { id: 2, text: "Hey there! 👋 Welcome to your daily dose of health tips." },
    { id: 2, text: "How are you feeling today? Remember, checking in with yourself is important." },
    { id: 2, text: "Getting enough sleep is key to staying healthy. Aim for 7–9 hours per night. 💤" },
    { id: 2, text: "Try to keep a consistent sleep schedule. Your body thrives on routine. 🕒" },
    { id: 2, text: "Stay active! Even a 20-minute walk can boost your energy and mood. 🚶‍♂️💪" },
    { id: 2, text: "Hydration matters—try to drink 6–8 glasses of water a day. 💧" },
    { id: 2, text: "Add more fruits and veggies to your meals for essential vitamins and fiber. 🥦🍎" },
    { id: 2, text: "Take breaks from screens and stretch regularly—it helps your body and mind. 🧘‍♀️" },
    { id: 2, text: "Feeling stressed? Take a deep breath. Inhale for 4 seconds, hold for 4, exhale for 4. 🧠" },
    { id: 2, text: "Mental health matters. It’s okay to ask for help or talk to someone. ❤️" },
    { id: 2, text: "Don’t skip regular checkups—preventive care can catch issues early. 🩺" }
  ];


export default function PetAIPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Msg[]>([]);
    const [loading, setLoading] = useState(false);
    const [responseIndex, setResponseIndex] = useState(0);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setMessages([{ id: 2, text: "How can I help you today?" }]);  // First bot message
            setLoading(false); // remove typing indicator
        }, 1000);

    }, []);
    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg: Msg = { id: 1, text: input };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            const nextResponse = predefinedChat[responseIndex % predefinedChat.length];
            setMessages(prev => [...prev, nextResponse]);
            setResponseIndex(prev => prev + 1);
        }, 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (
        <div className="flex h-screen overflow-hidden relative ">

            {/* Sidebar for desktop */}
            <div className={`bg-gray-900 text-white transition-all duration-300 fixed top-0 left-0 h-full z-30 ${sidebarOpen ? 'w-52' : 'w-0'} overflow-hidden hidden lg:block`}>
                {sidebarOpen && (
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center p-4">
                            <Link href={"/pet-ai"} className="text-xl font-bold p-2 rounded-md hover:bg-slate-800 transition-colors">
                                <CircleArrowLeft className='size-6 text-white' />
                            </Link>
                            <Button onClick={() => setSidebarOpen(false)} className='bg-transparent cursor-pointer hover:bg-slate-800'>
                                <XIcon className="size-6 text-white" />
                            </Button>
                        </div>
                        <div>
                            <h1 className='flex h-full items-center justify-center text-xl mt-3 gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md -translate-x-1'>Start a new chat</h1>
                        </div>
                        <ul className="flex flex-col h-full justify-end overflow-y-auto space-y-2 px-1 pb-8">
                            <li className='flex  gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                                <Settings className='size-5 text-white' /> Settings
                            </li>
                            <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                                <LogOut className='size-5 text-white' /> Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Sidebar for mobile */}
            <div className={`fixed top-0 left-0 h-screen w-60 bg-white/10 backdrop-blur-md text-white p-4 z-40 transform transition-transform duration-300 ease-in-out border-r border-white/20 shadow-lg ${sidebarDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarDrawerOpen && (
                    <div className="flex flex-col h-full ">
                        <div className="flex justify-between items-center p-1">
                            <Link href={"/pet-ai"} className="text-xl font-bold">
                                <CircleArrowLeft className='size-6 text-white' />
                            </Link>
                            <Button onClick={() => setSidebarDrawerOpen(false)} className='bg-transparent hover:bg-slate-800 cursor-pointer'>
                                <XIcon className="size-6 text-white" />
                            </Button>
                        </div>
                        <div>
                            <h1 className='text-center text-lg mt-3'>Start a new chat</h1>
                        </div>
                        <ul className="flex flex-col h-full justify-end overflow-y-auto space-y-2 px-1 pb-8">
                            <li className='flex  gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                                <Settings className='size-5 text-white' /> Settings
                            </li>
                            <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                                <LogOut className='size-5 text-white' /> Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex-col bg-gray-100 overflow-y-auto relative cursor-default transition-all duration-300 ${sidebarOpen ? 'lg:pl-52' : ''}`}>

                {/* Top bar */}
                <div className='bg-[#030712] p-4  text-blue-700 fixed w-full z-20'>
                    {/* Sidebar for desktop */}
                    {!sidebarOpen && (
                        <Button
                            onClick={() => setSidebarOpen(true)}
                            className="absolute top-4 left-4 z-10 bg-transparent hover:bg-gray-600 cursor-pointer sm:hidden lg:block"
                        >
                            <MenuIcon className="size-6 text-white" />
                        </Button>
                    )}

                    {/* Sidebar toggle botton for mobile */}
                    {!sidebarDrawerOpen && (
                        <button
                            onClick={() => setSidebarDrawerOpen(true)}
                            className="absolute top-4 left-4 z-10 bg-transparent flex items-center justify-center p-2 rounded cursor-pointer shadow sm:block lg:hidden"
                        >
                            <MenuIcon className="text-gray-100 size-6" />
                        </button>
                    )}
                    <h1 className={`text-5xl  font-semibold text-white ${sidebarOpen ? 'pl-[35%]' : 'text-center'} ${sidebarDrawerOpen && 'blur-xs'}`}>
                        Pet AI
                        <br />
                        <span className={`w-16 text-xs  border border-green-600 px-2 py-1 rounded-full mt-2 ${sidebarOpen ? 'ml-[2.5%]' : 'text-center'} `}>🟢 Online</span>
                    </h1>
                </div>

                {/* Chat messages */}
                <section className={`flex-1 min-h-screen overflow-y-auto py-35 px-2 w-full lg:px-24 scroll-smooth ${sidebarDrawerOpen ? 'blur-xs' : ''} bg-[#030712]`}>
                    <div className="flex flex-col gap-3">
                        {messages.map((m, idx) =>
                            m.id === 1 ? (
                                <UserBubble key={idx}>{m.text}</UserBubble>
                            ) : (
                                <BotBubble key={idx}>{m.text}</BotBubble>
                            )
                        )}
                        {loading && <LoadingBubble />}
                    </div>
                </section>

                {/* Input area */}
                {/* Input area fixed at the bottom */}
                <div className={`flex items-center justify-center px-4 py-2 bg-[#030712] shadow-md fixed bottom-0 left-0 w-full lg:px-8 gap-2 z-10 ${sidebarOpen ? 'lg:pl-64' : ''} ${sidebarDrawerOpen ? 'blur-xs' : ''}`}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Send a message..."
                        className="h-14 p-3 text-blue-400 bg-[#111113] text-sm rounded-2xl shadow-sm resize-none overflow-y-auto w-[80%] outline-none border border-[#6C6D74] placeholder:text-[#6C6D74]"
                    />
                    <div className="flex items-center right-[8.5%] gap-2 ">
                        <Button size="icon" variant="ghost" className="text-white">
                            <Smile className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                            <Link2 className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                            <Mic className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">

                            <CircleFadingArrowUp className='size-5' />
                        </Button>
                        <Button onClick={handleSend} size="icon" variant="ghost" className="text-black bg-white rounded-full cursor-pointer">
                            <Send className="size-5 " />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserBubble({ children }: { children: React.ReactNode }) {
    return (
        <div className="ml-auto flex max-w-[75%] items-end gap-2">
            <div className="rounded-2xl rounded-br-sm bg-green-600 px-4 py-2 text-sm text-white shadow">
                {children}
            </div>
        </div>
    );
}

function BotBubble({ children }: { children: React.ReactNode }) {
    return (
        <div className="mr-auto flex max-w-[75%] items-start gap-2">
            <div className="rounded-2xl rounded-bl-sm bg-gray-50 text-gray-800 px-4 py-2 text-sm shadow">
                {children}
            </div>
        </div>
    );
}

function LoadingBubble() {
    return (
        <div className="mr-auto flex max-w-[75%] items-end gap-2">
            <div className="rounded-2xl rounded-bl-sm bg-gray-50 text-gray-800 px-4 py-2 text-sm shadow flex items-center gap-1">
                <div className="w-1 h-2 rounded-full bg-[#030712] animate-bounce [animation-delay:0s]" />
                <div className="w-1 h-2 rounded-full bg-[#030712] animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-2 rounded-full bg-[#030712] animate-bounce [animation-delay:0.4s]" />
            </div>
        </div>
    );
}