'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleFadingArrowUp, Link2, LogOut, MenuIcon, Mic, Send, Settings, Smile, XIcon } from "lucide-react";
import Link from 'next/link';

// Define message type
type Msg = { id: number; text: string };

// Predefined chat responses
const predefinedChat: Msg[] = [
    
    { id: 2, text: "How can I stay active and healthy?" },
    { id: 2, text: "It's important to stay active. You can start by taking daily walks, doing stretches, or joining a fitness class!" },
    { id: 2, text: "What are some tips for a balanced diet?" },
    { id: 2, text: "Eat a variety of whole foods, including vegetables, fruits, lean proteins, and whole grains. Drink plenty of water and avoid processed foods." },
    { id: 2, text: "How do I manage stress?" },
    { id: 2, text: "Try meditation, deep breathing exercises, or yoga. Regular physical activity can also help reduce stress." },
    { id: 2, text: "What should I do to get better sleep?" },
    { id: 2, text: "Create a relaxing bedtime routine, avoid caffeine in the evening, and make sure your bedroom is quiet and dark." },
    { id: 2, text: "Can you recommend ways to improve mental health?" },
    { id: 2, text: "Consider practicing mindfulness, seeking social support, and talking to a mental health professional if needed." },
    { id: 2, text: "How much water should I drink daily?" },
    { id: 2, text: "The general recommendation is 8 cups (64 ounces) a day, but it depends on your body, activity level, and climate." },
    { id: 2, text: "What are some good habits for staying healthy long-term?" },
    { id: 2, text: "Get regular exercise, eat nutritious foods, stay hydrated, sleep well, manage stress, and avoid harmful habits like smoking or excessive drinking." },
    { id: 2, text: "Thanks for the tips! 👏" },
    { id: 2, text: "You're welcome! Stay healthy and feel free to ask if you need more advice!" }
];


export default function GoldencareLandingPage() {
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
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar for desktop */}
      <div className={`bg-gray-900 text-white transition-all duration-300 fixed top-0 left-0 h-full z-30 ${sidebarOpen ? 'w-52' : 'w-0'} overflow-hidden hidden lg:block`}>
        {sidebarOpen && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4">
              <Link href="#" className="text-xl font-bold">
                <CircleArrowLeft className='size-6 text-white' />
              </Link>
              <Button onClick={() => setSidebarOpen(false)} className='bg-transparent cursor-pointer hover:bg-slate-800'>
                <XIcon className="size-6 text-white" />
              </Button>
            </div>
            <div>
              <h1 className='text-center text-lg mt-3'>Start a new chat</h1>
            </div>
            <ul className="flex flex-col h-full justify-end overflow-y-auto space-y-2 px-1 pb-8">
              <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
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
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-1">
              <Link href="#" className="text-xl font-bold">
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
              <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                <Settings className='size-5' /> Settings
              </li>
              <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                <LogOut className='size-5' /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex-col bg-black overflow-y-auto relative cursor-default transition-all duration-300 ${sidebarOpen ? 'lg:pl-52' : ''}`}>
        {/* Top bar */}
        <div className='bg-black p-4 text-blue-700 fixed w-full z-20'>
          {!sidebarOpen && (
            <Button
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 z-10 bg-transparent hover:bg-gray-600 cursor-pointer sm:hidden lg:block"
            >
              <MenuIcon className="size-6" />
            </Button>
          )}
          {!sidebarDrawerOpen && (
            <button
              onClick={() => setSidebarDrawerOpen(true)}
              className="absolute top-4 left-4 z-10 bg-transparent flex items-center justify-center p-2 rounded cursor-pointer shadow sm:block lg:hidden"
            >
              <MenuIcon className="text-gray-100 size-6" />
            </button>
          )}
          <h1 className={`text-3xl font-semibold text-white ${sidebarOpen ? 'pl-[35%]' : 'text-center'} ${sidebarDrawerOpen && 'blur-xs'}`}>
            Goldencare
            <br />
            <span className={`w-16 text-xs border border-green-600 px-2 py-1 rounded-full mt-2 ${sidebarOpen ? 'ml-[3%]' : 'text-center'}`}>🟢 Online</span>
          </h1>
        </div>

        {/* Chat messages */}
        <section className={`flex-1 min-h-screen overflow-y-auto py-28 px-2 w-full lg:px-24 scroll-smooth ${sidebarDrawerOpen ? 'blur-xs' : ''} bg-black`}>
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

        {/* Input area fixed at the bottom */}
        <div className={`flex items-center justify-center px-4 py-2 bg-black shadow-md fixed bottom-0 left-0 w-full lg:px-8 gap-2 z-10 ${sidebarOpen ? 'lg:pl-64' : ''} ${sidebarDrawerOpen ? 'blur-xs' : ''}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="h-14 p-3 text-yellow-400 bg-slate-950 text-sm rounded-md shadow-sm resize-none overflow-y-auto w-[80%] outline-none border"
          />
          <div className="flex items-center right-[8.5%] gap-2">
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
              <Send className="size-5" />
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
      <div className="rounded-2xl rounded-br-sm bg-[#BB891B] px-4 py-2 text-sm text-amber-100 shadow">
        {children}
      </div>
    </div>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="mr-auto flex max-w-[75%] items-end gap-2">
      <div className="rounded-2xl rounded-bl-sm bg-[#FEDAAD] text-black px-4 py-2 text-sm shadow">
        {children}
      </div>
    </div>
  );
}

function LoadingBubble() {
  return (
    <div className="mr-auto flex max-w-[75%] items-end gap-2">
      <div className="rounded-2xl rounded-bl-sm bg-[#FEDAAD] text-black px-4 py-2 text-sm shadow flex items-center gap-1">
        <div className="w-1 h-2 rounded-full bg-black animate-bounce [animation-delay:0s]" />
        <div className="w-1 h-2 rounded-full bg-black animate-bounce [animation-delay:0.2s]" />
        <div className="w-1 h-2 rounded-full bg-black animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}