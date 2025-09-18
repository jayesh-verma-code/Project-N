"use client";
import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";
import NoiseTexture from "@/components/shared/noise-texture";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, MessageSquarePlus, Settings, LogOut, HeartPulse, Trash2, User, Globe } from 'lucide-react';
import CustomCursor from "@/components/shared/custom-cursor";
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
  sources?: string[]; // Added for source documents
  advice?: string;   // Added for structured advice
};
type ChatHistoryItem = {
  id: string;
  title: string;
  timestamp: Date;
  sessionId: string | null;
  messages: Message[];
  persona: string;
  language: string;
};
// Backend API configuration
const API_BASE_URL = "https://indianearlyadult-662622027382.europe-west1.run.app"; // Update this to your Flask API URL
// Supported personas and languages from backend
const SUPPORTED_PERSONAS = {
  'best_friend': 'Best Friend',
  'roommate': 'Roommate', 
  'elder_brother': 'Elder Brother',
  'elder_sister': 'Elder Sister',
  'younger_brother': 'Younger Brother',
  'younger_sister': 'Younger Sister'
};
const SUPPORTED_LANGUAGES = {
  'en': 'English',
  'hi': 'Hindi',
  'bn': 'Bengali', 
  'ta': 'Tamil',
  'te': 'Telugu'
};
export default function AyurvedaChat() {
  const [inputValue, setInputValue] = useState<string>('');
  const [initialMessage] = useState<string>('Hey! Choose your preferred persona and language to get started. How can I help you today?');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [conversation, setConversation] = useState<any[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  // New state for persona and language
  const [selectedPersona, setSelectedPersona] = useState<string>('best_friend');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  // Initialize session and load chat history
  useEffect(() => {
    // Try to get session ID from localStorage first
    const savedSessionId = localStorage.getItem('chatbotSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    } else {
      // Create new session if none exists
      createNewSession();
    }
    // Load chat history from localStorage
    const storedHistory = localStorage.getItem('chatbotChatHistory');
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        // Convert string timestamps back to Date objects
        const historyWithDates = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
          messages: item.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatHistory(historyWithDates);
      } catch (error) {
        console.error('Error parsing chat history:', error);
      }
    }
    // Load saved persona and language
    const savedPersona = localStorage.getItem('chatbotPersona');
    const savedLanguage = localStorage.getItem('chatbotLanguage');
    if (savedPersona && SUPPORTED_PERSONAS[savedPersona as keyof typeof SUPPORTED_PERSONAS]) {
      setSelectedPersona(savedPersona);
    }
    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage as keyof typeof SUPPORTED_LANGUAGES]) {
      setSelectedLanguage(savedLanguage);
    }
    // Set initial welcome message
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, [initialMessage]);
  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // Save chat history to localStorage when it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatbotChatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);
  // Save session ID to localStorage when it changes
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('chatbotSessionId', sessionId);
    }
  }, [sessionId]);
  // Save persona and language to localStorage
  useEffect(() => {
    localStorage.setItem('chatbotPersona', selectedPersona);
  }, [selectedPersona]);
  useEffect(() => {
    localStorage.setItem('chatbotLanguage', selectedLanguage);
  }, [selectedLanguage]);
  const createNewSession = async () => {
    // Generate a local session ID since we're using a different backend
    setSessionId(generateId());
  };
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    // Clear session data on logout
    localStorage.removeItem('chatbotSessionId');
    localStorage.removeItem('chatbotChatHistory');
    localStorage.removeItem('chatbotPersona');
    localStorage.removeItem('chatbotLanguage');
    router.push("/HealthMatesecondLanding");
  };
  const handleNewChat = () => {
    if (messages.length > 1) { // Only save if there's more than just the initial message
      const firstUserMessage = messages.find(msg => msg.sender === 'user');
      const chatTitle = firstUserMessage 
        ? firstUserMessage.text.slice(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '')
        : 'New Chat';
      const newChatItem: ChatHistoryItem = {
        id: generateId(),
        title: chatTitle,
        timestamp: new Date(),
        sessionId,
        messages,
        persona: selectedPersona,
        language: selectedLanguage
      };
      setChatHistory(prev => [newChatItem, ...prev]);
    }
    // Clear current chat
    clearChat();
    // Create a new session for the new chat
    createNewSession();
    // Reset conversation history
    setConversation([]);
  };
  const loadChat = (chatId: string) => {
    const chatToLoad = chatHistory.find(chat => chat.id === chatId);
    if (chatToLoad) {
      setMessages(chatToLoad.messages);
      setSessionId(chatToLoad.sessionId);
      setSelectedPersona(chatToLoad.persona || 'best_friend');
      setSelectedLanguage(chatToLoad.language || 'en');
      // Rebuild conversation history from messages
      const chatConversation = chatToLoad.messages
        .filter(msg => msg.sender !== 'bot' || !msg.text.includes('Hey! Choose your preferred'))
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
      setConversation(chatConversation);
      setIsOpen(false); // Close sidebar after loading
    }
  };
  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering loadChat
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return; 
    setIsLoading(true); 
    try {
      const userMessage: Message = {
        id: generateId(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      const messageToSend = inputValue;
      setInputValue('');
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageToSend,
          persona: selectedPersona,
          conversation: conversation,
          lang: selectedLanguage
        })
      });
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      const botMessage: Message = {
        id: generateId(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      // Update conversation history
      setConversation(data.conversation || []); 
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: generateId(),
        text: "Sorry, I couldn't process your message. Please check if the backend server is running and try again.",
        sender: 'bot',
        timestamp: new Date()
      }; 
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const clearChat = () => {
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setInputValue('');
    setConversation([]);
  };
  const handlePersonaChange = (persona: string) => {
    setSelectedPersona(persona);
    setShowPersonaSelector(false);
  };
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ParticlesBackground />
       <CustomCursor
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
              />
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-2 rounded-full transition-all ${
          isOpen
            ? "left-64 top-6 bg-gray-700/50"
            : "left-6 top-6 bg-indigo-600"
        }`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <X className="text-white w-5 h-5" />
        ) : (
          <Menu className="text-white w-5 h-5" />
        )}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed h-screen w-72 bg-white/10 backdrop-blur-lg border-r border-gray-700/20 flex flex-col z-40 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex flex-row p-6 gap-2 border-b border-gray-700/10">
          <HeartPulse className="text-indigo-600 w-10 h-10" />
          <h1 className="font-semibold text-lg text-white">Chatbot</h1>
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <div className="space-y-1">
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <MessageSquarePlus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
            <div className="mt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Recent Chats</h3>
              <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                {chatHistory.map(chat => (
                  <div 
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{chat.title}</p>
                      <p className="text-xs text-gray-400">{formatDate(chat.timestamp)}</p>
                      <p className="text-xs text-gray-500">
                        {SUPPORTED_PERSONAS[chat.persona as keyof typeof SUPPORTED_PERSONAS] || 'Best Friend'} • {SUPPORTED_LANGUAGES[chat.language as keyof typeof SUPPORTED_LANGUAGES] || 'English'}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => deleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 p-1"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {chatHistory.length === 0 && (
                  <p className="text-xs text-gray-500 px-2 py-1">No chat history yet</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={toggleSidebar}
        />
      )}
      {/* Main content */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 rounded-lg my-4">
        {/* Header */}
        <div className="text-center mb-4 pb-4">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">AI Companion</h1>
          <div className="inline-flex items-center bg-black rounded-full px-3 py-1 border border-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
        {/* Persona and Language Selection */}
        <div className="flex flex-wrap gap-4 mb-4 justify-center">
          {/* Persona Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaSelector(!showPersonaSelector)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>{SUPPORTED_PERSONAS[selectedPersona as keyof typeof SUPPORTED_PERSONAS]}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {showPersonaSelector && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10">
                {Object.entries(SUPPORTED_PERSONAS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handlePersonaChange(key)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                      selectedPersona === key ? 'bg-gray-700 text-blue-400' : 'text-white'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{SUPPORTED_LANGUAGES[selectedLanguage as keyof typeof SUPPORTED_LANGUAGES]}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10">
                {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleLanguageChange(key)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                      selectedLanguage === key ? 'bg-gray-700 text-blue-400' : 'text-white'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 mb-4 overflow-y-auto max-h-[50vh] px-2">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${
                  message.sender === 'user' 
                    ? 'bg-blue-800 text-white self-end rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                    : 'bg-blue-600 text-white self-start rounded-tr-lg rounded-br-lg rounded-bl-lg'
                } p-4 max-w-[80%] shadow`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-800 text-white p-3 rounded-lg self-start flex items-center space-x-2">
                <span>Processing</span>
                <span className="flex space-x-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse" style={{animationDelay: '0.2s'}}>.</span>
                  <span className="animate-pulse" style={{animationDelay: '0.4s'}}>.</span>
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Input Area */}
        <div className="relative bottom-0 bg-gray-800 text-white rounded-full px-4 py-3 pr-36 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-[90%] bg-transparent focus:outline-none text-sm text-white placeholder-gray-400"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute right-2 bottom-2 flex space-x-3 items-center">
            {/* Send button */}
            <button 
              className={`${
                inputValue.trim() 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white rounded-full w-8 h-8 flex items-center justify-center`}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              title="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </main>
      {/* Click outside to close dropdowns */}
      {(showPersonaSelector || showLanguageSelector) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowPersonaSelector(false);
            setShowLanguageSelector(false);
          }}
        />
      )}
    </div>
    </ThemeProvider>
  );
}