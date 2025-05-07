'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleFadingArrowUp, Link2, LogOut, MenuIcon, Mic, Send, Settings, Smile, XIcon } from "lucide-react";
import Link from 'next/link';

type Msg = { id: number; text: string };
type ChatSession = {
  id: string;
  title: string;
  date: string;
  messages: Msg[];
};

export default function GoldencareLandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState(false);
  const [input, setInput] = useState('');
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);

  // Load chat sessions from localStorage on initial render
  useEffect(() => {
    const savedSessions = localStorage.getItem('goldencare-chat-sessions');
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions);
      setChatSessions(sessions);
      if (sessions.length > 0) {
        setCurrentChat(sessions[sessions.length - 1]);
      } else {
        createNewChat();
      }
    } else {
      createNewChat();
    }
  }, []);

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      date: new Date().toLocaleDateString(),
      messages: [
        { id: 2, text: "Hello! 😊 It's great to connect with you! I'm GoldenCare, your friendly health assistant. How can I help you today?" }
      ]
    };
    setCurrentChat(newChat);
    setChatSessions(prev => [...prev, newChat]);
    localStorage.setItem('goldencare-chat-sessions', JSON.stringify([...chatSessions, newChat]));
  };

  const switchChat = (chatId: string) => {
    const chat = chatSessions.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const clearCurrentChat = () => {
    createNewChat();
  };

  const handleSend = async () => {
    if (!input.trim() || !currentChat) return;

    // Update chat title if it's the first user message
    const isFirstUserMessage = currentChat.messages.filter(m => m.id === 1).length === 0;
    const newUserMsg: Msg = { id: 1, text: input };
    
    const updatedMessages = [...currentChat.messages, newUserMsg];
    const updatedChat = {
      ...currentChat,
      messages: updatedMessages,
      title: isFirstUserMessage ? input.slice(0, 30) + (input.length > 30 ? "..." : "") : currentChat.title
    };

    setCurrentChat(updatedChat);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://goldencare-api.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      // Add temporary typing message
      const typingMessages = [...updatedMessages, { id: 2, text: '' }];
      setCurrentChat({
        ...updatedChat,
        messages: typingMessages
      });

      // Simulate typing effect
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < data.response.length) {
          const newTypingMessages = [...updatedMessages, { 
            id: 2, 
            text: data.response.substring(0, i + 1) 
          }];
          setCurrentChat({
            ...updatedChat,
            messages: newTypingMessages
          });
          i++;
        } else {
          clearInterval(typingInterval);
          setLoading(false);
          // Update chat sessions after completion
          const updatedSessions = chatSessions.map(c => 
            c.id === updatedChat.id ? {
              ...updatedChat,
              messages: [...updatedMessages, { id: 2, text: data.response }]
            } : c
          );
          setChatSessions(updatedSessions);
          localStorage.setItem('goldencare-chat-sessions', JSON.stringify(updatedSessions));
        }
      }, 10);

    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessages = [...updatedMessages, { 
        id: 2, 
        text: "Sorry, I'm having trouble connecting to the server. Please try again later." 
      }];
      setCurrentChat({
        ...updatedChat,
        messages: errorMessages
      });
      const updatedSessions = chatSessions.map(c => 
        c.id === updatedChat.id ? {
          ...updatedChat,
          messages: errorMessages
        } : c
      );
      setChatSessions(updatedSessions);
      localStorage.setItem('goldencare-chat-sessions', JSON.stringify(updatedSessions));
      setLoading(false);
    }
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
              <Button 
                onClick={createNewChat}
                className="text-sm bg-blue-600 hover:bg-blue-700"
              >
                New Chat
              </Button>
              <Button onClick={() => setSidebarOpen(false)} className='bg-transparent cursor-pointer hover:bg-slate-800'>
                <XIcon className="size-6 text-white" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {chatSessions.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => switchChat(chat.id)}
                  className={`p-3 cursor-pointer hover:bg-gray-700 ${currentChat?.id === chat.id ? 'bg-gray-700' : ''}`}
                >
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-xs text-gray-400">{chat.date}</div>
                  {chat.messages.find(m => m.id === 1) && (
                    <div className="text-xs text-gray-300 truncate mt-1">
                      {chat.messages.find(m => m.id === 1)?.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <ul className="space-y-2 px-1 pb-4">
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
              <Button 
                onClick={createNewChat}
                className="text-sm bg-blue-600 hover:bg-blue-700"
              >
                New Chat
              </Button>
              <Button onClick={() => setSidebarDrawerOpen(false)} className='bg-transparent hover:bg-slate-800 cursor-pointer'>
                <XIcon className="size-6 text-white" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {chatSessions.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => switchChat(chat.id)}
                  className={`p-3 cursor-pointer hover:bg-gray-700 ${currentChat?.id === chat.id ? 'bg-gray-700' : ''}`}
                >
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-xs text-gray-400">{chat.date}</div>
                  {chat.messages.find(m => m.id === 1) && (
                    <div className="text-xs text-gray-300 truncate mt-1">
                      {chat.messages.find(m => m.id === 1)?.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <ul className="space-y-2 px-1 pb-4">
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
            {currentChat?.messages.map((m, idx) =>
              m.id === 1 ? (
                <UserBubble key={idx}>{m.text}</UserBubble>
              ) : (
                <BotBubble key={idx}>{m.text}</BotBubble>
              )
            )}
            {loading && currentChat?.messages[currentChat.messages.length - 1]?.id !== 2 && <LoadingBubble />}
          </div>
        </section>

        {/* Input area fixed at the bottom - IMPROVED FOR MOBILE */}
        <div className={`flex items-center justify-between px-2 py-2 bg-black shadow-md fixed bottom-0 left-0 right-0 w-full z-10 ${sidebarOpen ? 'lg:pl-52' : ''} ${sidebarDrawerOpen ? 'blur-xs' : ''}`}>
          <div className="flex items-center justify-between w-full gap-2 max-w-6xl mx-auto">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              className="h-12 md:h-14 p-2 md:p-3 text-yellow-400 bg-slate-950 text-sm rounded-md shadow-sm resize-none overflow-y-auto flex-grow outline-none border"
            />
            <div className="flex items-center gap-1 md:gap-2">
              <Button size="icon" variant="ghost" className="text-white hidden sm:flex">
                <Smile className="size-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hidden sm:flex">
                <Link2 className="size-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hidden md:flex">
                <Mic className="size-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hidden md:flex">
                <CircleFadingArrowUp className='size-5' />
              </Button>
              <Button onClick={handleSend} size="icon" variant="ghost" className="text-black bg-white rounded-full cursor-pointer p-1 md:p-2">
                <Send className="size-4 md:size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto flex max-w-[75%] md:max-w-[70%] items-end gap-2">
      <div className="rounded-2xl rounded-br-sm bg-[#BB891B] px-3 py-2 text-sm text-amber-100 shadow">
        {children}
      </div>
    </div>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="mr-auto flex max-w-[75%] md:max-w-[70%] items-end gap-2">
      <div className="rounded-2xl rounded-bl-sm bg-[#FEDAAD] text-black px-3 py-2 text-sm shadow">
        {children}
      </div>
    </div>
  );
}

function LoadingBubble() {
  return (
    <div className="mr-auto flex max-w-[75%] md:max-w-[70%] items-end gap-2">
      <div className="rounded-2xl rounded-bl-sm bg-[#FEDAAD] text-black px-4 py-2 text-sm shadow flex items-center gap-1">
        <div className="w-1 h-2 rounded-full bg-black animate-bounce [animation-delay:0s]" />
        <div className="w-1 h-2 rounded-full bg-black animate-bounce [animation-delay:0.2s]" />
        <div className="w-1 h-2 rounded-full bg-black animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}