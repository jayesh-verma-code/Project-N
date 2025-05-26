// components/Healthmate.tsx
import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { Menu, X, MessageSquarePlus, Settings, LogOut, HeartPulse, Trash2 } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string; // Base64 encoded image
};

type AnalysisData = {
  predicted_class: string;
  confidence: number;
  explanation: string;
  all_predictions?: Record<string, number>;
};

type ChatHistoryItem = {
  id: string;
  title: string;
  timestamp: Date;
  sessionId: string | null;
  messages: Message[];
};


export default function Sonography() {
  const [inputValue, setInputValue] = useState<string>('');
  const [initialMessage] = useState<string>('Welcome to Medical Image Analysis. Upload an image or ask questions about medical imaging.');
  const apiUrl = "https://sonography-258649051254.europe-west1.run.app";
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const router = useRouter();
  
  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, [initialMessage]);




  const toggleSidebar = () => setIsOpen(!isOpen);
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
        messages
      };

      setChatHistory(prev => [newChatItem, ...prev]);
    }

    // Clear current chat
    clearChat();
  };


  const loadChat = (chatId: string) => {
    const chatToLoad = chatHistory.find(chat => chat.id === chatId);
    if (chatToLoad) {
      setMessages(chatToLoad.messages);
      setSessionId(chatToLoad.sessionId);
      setAnalysisComplete(!!chatToLoad.sessionId);
      // You might need to set other states based on the loaded chat
      setIsOpen(false); // Close sidebar after loading
    }
  };

  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering loadChat
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const handleLogout = () => {
    router.push("/HealthMatesecondLanding");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };




  // Generate a unique ID for messages
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    
    try {
      // Add user message with image
      const userMessage: Message = {
        id: generateId(),
        text: inputValue.trim() || "Please analyze this medical image.",
        sender: 'user',
        timestamp: new Date(),
        image: previewImage || undefined
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Add processing message
      const processingMessage: Message = {
        id: generateId(),
        text: "Analyzing your medical image...",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, processingMessage]);
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      // Make API call to analyze endpoint
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      console.log('Image analysis response:', data);
      
      // Store analysis data and session ID
      setAnalysisData({
        predicted_class: data.predicted_class,
        confidence: data.confidence,
        explanation: data.explanation
      });
      setSessionId(data.session_id);
      
      // Remove the processing message
      setMessages(prev => prev.filter(msg => msg.id !== processingMessage.id));
      
      // Add response message with analysis results
      const resultMessage: Message = {
        id: generateId(),
        text: data.explanation,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, resultMessage]);
      
      // Reset input and image
      setInputValue('');
      setSelectedImage(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        text: "Sorry, there was an error analyzing your image. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    
    // If there is an image selected, analyze it first
    if (selectedImage) {
      await analyzeImage();
      return;
    }
    
    // If we have a session ID but no image, continue the chat
    if (sessionId) {
      await continueChat();
      return;
    }
    
    // Otherwise, just send a generic message
    await sendGenericMessage();
  };

  const continueChat = async () => {
    if (!inputValue.trim() || !sessionId) return;
    
    setIsLoading(true);
    
    try {
      // Add user message
      const userMessage: Message = {
        id: generateId(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Make API call to chat endpoint
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: inputValue
        })
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      console.log('Chat response:', data);
      
      // Add bot response
      const botMessage: Message = {
        id: generateId(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Reset input
      setInputValue('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        text: "Sorry, I couldn't process your message. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendGenericMessage = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Add user message
      const userMessage: Message = {
        id: generateId(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // For generic messages without a session, we'll just echo back
      // In a real app, you might want to call a different endpoint
      const botMessage: Message = {
        id: generateId(),
        text: "I can help analyze medical images. Please upload an image for detailed analysis.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Reset input
      setInputValue('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        text: "Sorry, I couldn't process your message. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisData) return null;
    
    return (
      <div className="bg-gray-800 p-4 rounded-lg mt-4 mb-4">
        <h3 className="text-blue-400 font-bold mb-2">Analysis Results</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Predicted Condition:</span>
            <span className="text-blue-300">{analysisData.predicted_class}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Confidence:</span>
            <span className="text-blue-300">{(analysisData.confidence * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    );
  };

  const clearChat = async () => {
    try {
      // Reset all states
      setMessages([{
        id: generateId(),
        text: initialMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setAnalysisData(null);
      setSessionId(null);
      setSelectedImage(null);
      setPreviewImage(null);
      setInputValue('');
      
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      

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

<div
  className={`fixed h-screen w-72 bg-white/10 backdrop-blur-lg border-r border-gray-700/20 flex flex-col z-40 transition-all duration-300 ${
    isOpen ? "left-0" : "-left-full"
  }`}
>
  <div className="flex flex-row p-6 gap-2 border-b border-gray-700/10">
    <HeartPulse className="text-indigo-600 w-10 h-10" />
    <h1 className="font-semibold text-lg text-white">Healthmate</h1>
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







      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 rounded-lg my-4">
        {/* Header */}
        <div className="text-center mb-4 pb-4">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">Medical Image Analysis</h1>
          <div className="inline-flex items-center bg-black rounded-full px-3 py-1 border border-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 mb-4 overflow-y-auto max-h-[60vh] px-2">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${
                  message.sender === 'user' 
                    ? 'bg-blue-800 text-white self-end rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                    : 'bg-blue-600 text-white self-start rounded-tr-lg rounded-br-lg rounded-bl-lg'
                } p-3 max-w-[80%] shadow`}
              >
                <p>{message.text}</p>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="User uploaded" 
                    className="mt-2 max-h-64 rounded-lg" 
                  />
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gray-800 text-white p-3 rounded-lg self-start flex items-center space-x-2">
                <span>Analyzing</span>
                <span className="flex space-x-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse animation-delay-200">.</span>
                  <span className="animate-pulse animation-delay-400">.</span>
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Analysis Results */}
        {analysisData && renderAnalysisResults()}
        
        {/* Image preview */}
        {previewImage && (
          <div className="relative self-start mb-4 w-full">
            <div className="bg-gray-800 p-3 rounded-lg">
              <h3 className="text-blue-400 font-bold mb-2">Ready to analyze:</h3>
              <div className="relative inline-block">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="max-h-64 rounded-lg border border-gray-600"
                />
                <button 
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="mt-3">
                <p className="text-gray-300 text-sm mb-2">Add a message with your image (optional):</p>
                <input
                  type="text"
                  placeholder="Describe any symptoms or concerns..."
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                />
                <button 
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center"
                  onClick={analyzeImage}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Analyzing...</span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 mr-2">
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                        <path d="M16 5V3"></path>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <path d="M9 9h.01"></path>
                        <path d="M15 9h.01"></path>
                      </svg>
                      Analyze Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="relative bg-gray-800 text-white rounded-full px-4 py-3 pr-36 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
            type="text"
            placeholder={selectedImage ? "Add message (optional)" : "Ask about medical imaging or upload an image..."}
            className="w-[90%] bg-transparent focus:outline-none text-sm text-white placeholder-gray-400"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute right-2 bottom-2 flex space-x-3 items-center">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            {/* Upload image button */}
            <button 
              className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            
            {/* Clear chat button */}
            <button 
              className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center"
              onClick={clearChat}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            
            {/* Send button */}
            <button 
              className={`${
                (inputValue.trim() || selectedImage) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 cursor-not-allowed'
              } text-white rounded-full w-8 h-8 flex items-center justify-center`}
              onClick={handleSendMessage}
              disabled={(!inputValue.trim() && !selectedImage) || isLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}