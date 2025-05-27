import { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageSquarePlus, Settings, LogOut, HeartPulse, Trash2, Minimize2, Maximize2 } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string; // Base64 encoded image
};

type CTAnalysisData = {
  prediction: string;
  confidence: number;
  explanation: string;
  result_image: string;
  session_id: string;
};

type ChatHistoryItem = {
  id: string;
  title: string;
  timestamp: Date;
  sessionId: string | null;
  messages: Message[];
};

export default function KidneyCTAnalysis() {
  const [inputValue, setInputValue] = useState<string>('');
  const [initialMessage] = useState<string>('Welcome to the Kidney CT Analysis section. Please upload a kidney CT scan image first to begin analysis and discussion.');
  const apiUrl = "https://kidney-ct-258649051254.asia-south2.run.app";
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageMinimized, setImageMinimized] = useState<boolean>(false);
  const [resultsMinimized, setResultsMinimized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ctData, setCTData] = useState<CTAnalysisData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize with welcome message and load chat history
  useEffect(() => {
    const storedHistory = JSON.parse('[]');
    try {
      const stored = storedHistory;
      if (stored && stored.length > 0) {
        // Convert string timestamps back to Date objects
        const historyWithDates = stored.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
          messages: item.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatHistory(historyWithDates);
      }
    } catch (error) {
      console.error('Error parsing chat history:', error);
    }

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

  // Save chat history when it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      // localStorage.setItem('kidneyCTChatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleNewChat = () => {
    if (messages.length > 1) {
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

    clearChat();
  };

  const loadChat = (chatId: string) => {
    const chatToLoad = chatHistory.find(chat => chat.id === chatId);
    if (chatToLoad) {
      setMessages(chatToLoad.messages);
      setSessionId(chatToLoad.sessionId);
      setAnalysisComplete(!!chatToLoad.sessionId);
      setIsOpen(false);
    }
  };

  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageMinimized(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setImageMinimized(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleImageMinimize = () => {
    setImageMinimized(!imageMinimized);
  };

  const toggleResultsMinimize = () => {
    setResultsMinimized(!resultsMinimized);
  };

  const handleUploadCT = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    
    try {
      const userMessage: Message = {
        id: generateId(),
        text: "Please analyze this kidney CT scan.",
        sender: 'user',
        timestamp: new Date(),
        image: previewImage || undefined
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      const processingMessage: Message = {
        id: generateId(),
        text: "Analyzing your kidney CT scan...",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, processingMessage]);
      
      const response = await fetch(`${apiUrl}/analyze-ct/`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data: CTAnalysisData = await response.json();
      
      setCTData(data);
      setSessionId(data.session_id);
      setAnalysisComplete(true);
      
      setMessages(prev => prev.filter(msg => msg.id !== processingMessage.id));
      
      const resultMessage: Message = {
        id: generateId(),
        text: `Analysis Complete!\n\nCondition: ${data.prediction}\nConfidence: ${data.confidence.toFixed(1)}%\n\n${data.explanation}\n\nYou can now ask me questions about this analysis.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, resultMessage]);
      
      setSelectedImage(null);
      setPreviewImage(null);
      setImageMinimized(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error uploading CT scan:', error);
      setMessages(prev => prev.filter(msg => msg.text !== "Analyzing your kidney CT scan..."));
      
      const errorMessage: Message = {
        id: generateId(),
        text: "Sorry, there was an error analyzing your CT scan. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    if (!analysisComplete) {
      const promptMessage: Message = {
        id: generateId(),
        text: "Please upload a kidney CT scan image first before asking questions. I need to analyze an image to provide meaningful discussion.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, promptMessage]);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userMessage: Message = {
        id: generateId(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      const response = await fetch(`${apiUrl}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputValue,
          session_id: sessionId
        })
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      
      const botMessage: Message = {
        id: generateId(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setInputValue('');
      
    } catch (error) {
      console.error('Error sending message:', error);
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
    if (!ctData) return null;
    
    return (
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl mt-4 mb-6 border border-gray-600 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-blue-400 font-bold text-lg flex items-center gap-2">
            <HeartPulse className="w-5 h-5" />
            CT Analysis Results
          </h3>
          <button 
            onClick={toggleResultsMinimize}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-all"
            title={resultsMinimized ? "Maximize results" : "Minimize results"}
          >
            {resultsMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>

        {resultsMinimized ? (
          <div className="p-3 bg-gray-900/50 rounded-lg">
            <p className="text-gray-400 text-sm">
              Analysis results minimized - {ctData.prediction} ({ctData.confidence.toFixed(1)}% confidence)
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                <span className="text-gray-300 font-medium">Condition:</span>
                <span className="text-blue-300 font-bold">{ctData.prediction}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                <span className="text-gray-300 font-medium">Confidence:</span>
                <span className="text-green-300 font-bold">{ctData.confidence.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${ctData.confidence}%` }}
                ></div>
              </div>
            </div>
            {ctData.result_image && (
              <div className="mt-6">
                <h4 className="text-gray-300 text-sm mb-3">Analyzed Image:</h4>
                <img 
                  src={ctData.result_image} 
                  alt="Analyzed CT scan" 
                  className="max-h-48 rounded-xl border border-gray-600 shadow-lg"
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const clearChat = () => {
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setCTData(null);
    setSessionId(null);
    setAnalysisComplete(false);
    setSelectedImage(null);
    setPreviewImage(null);
    setImageMinimized(false);
    setResultsMinimized(false);
    setInputValue('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col">
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-3 rounded-xl transition-all duration-300 shadow-lg ${
          isOpen
            ? "left-56 top-6 bg-gray-700 hover:bg-gray-600 border border-gray-500"
            : "left-6 top-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
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
        className={`fixed h-screen w-72 bg-gray-800/90 backdrop-blur-xl border-r border-gray-700/50 flex flex-col z-40 transition-all duration-300 shadow-2xl ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex flex-row p-6 gap-3 border-b border-gray-700/30">
          <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
            <HeartPulse className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Healthmate</h1>
            <p className="text-gray-400 text-sm">AI Medical Assistant</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between p-4">
          <div className="space-y-2">
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <MessageSquarePlus className="w-5 h-5" />
              <span>New Chat</span>
            </button>

            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Recent Chats</h3>
              <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                {chatHistory.map(chat => (
                  <div 
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{chat.title}</p>
                      <p className="text-xs text-gray-400">{formatDate(chat.timestamp)}</p>
                    </div>
                    <button 
                      onClick={(e) => deleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/20"
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

          <div className="space-y-1 border-t border-gray-700/30 pt-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={toggleSidebar}
        />
      )}
      
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 rounded-lg my-4">
        {/* Header */}
        <div className="text-center mb-6 pb-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">Healthmate</h1>
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-green-500/50 shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm text-green-400 font-medium">Online</span>
          </div>
        </div>

        {/* Analysis Status */}
        {!analysisComplete && (
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-600/50 rounded-2xl p-4 mb-6 backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <span className="text-yellow-200 font-medium">Please upload a kidney CT scan image to begin analysis</span>
            </div>
          </div>
        )}

        {/* Chat Area - Made wider */}
        <div ref={chatContainerRef} className="flex-1 mb-4 overflow-y-auto min-h-[60vh] max-h-[60vh] px-2">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white self-end rounded-2xl rounded-br-lg shadow-lg max-w-[70%]' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-600 text-white self-start rounded-2xl rounded-bl-lg shadow-lg max-w-[85%]'
                } p-4 backdrop-blur-sm border border-white/10`}
              >
                <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="User uploaded" 
                    className="mt-3 max-h-64 rounded-xl border border-white/20" 
                  />
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white p-4 rounded-2xl rounded-bl-lg self-start flex items-center space-x-3 shadow-lg max-w-[85%]">
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
        
        {/* CT Analysis Results */}
        {ctData && renderAnalysisResults()}
        
        {/* Image preview for upload */}
        {previewImage && (
          <div className="relative self-start mb-4 w-full">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-2xl border border-gray-600 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-blue-400 font-bold">Ready to analyze kidney CT scan:</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleImageMinimize}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-all"
                    title={imageMinimized ? "Maximize" : "Minimize"}
                  >
                    {imageMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={removeImage}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {!imageMinimized && (
                <div className="relative inline-block mb-3">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-h-64 rounded-xl border border-gray-600"
                  />
                </div>
              )}
              
              {imageMinimized && (
                <div className="mb-3 p-3 bg-gray-900/50 rounded-lg">
                  <p className="text-gray-400 text-sm">Image ready for analysis (minimized)</p>
                </div>
              )}
              
              <div>
                <button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl px-6 py-3 font-medium flex items-center transition-all duration-200 shadow-lg"
                  onClick={handleUploadCT}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Analyzing...</span>
                  ) : (
                    <>
                      <HeartPulse className="w-5 h-5 mr-2" />
                      Analyze CT Scan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="relative bg-gray-800/80 backdrop-blur-xl text-white rounded-2xl px-4 py-3 pr-36 border border-gray-600/50 shadow-2xl">
          <input
            type="text"
            placeholder={analysisComplete 
              ? "Ask questions about the CT analysis..." 
              : "Upload a CT scan image first to enable chat"
            }
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
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <button 
              className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-700/50 transition-all"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              title="Upload kidney CT scan"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            
            <button 
              className={`${
                inputValue.trim() && analysisComplete 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg' 
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white rounded-full w-8 h-8 flex items-center justify-center transition-all`}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !analysisComplete || isLoading}
              title={!analysisComplete ? "Upload and analyze a CT scan first" : "Send message"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl px-4 py-2 inline-block">
            {!analysisComplete 
              ? "Step 1: Upload a kidney CT scan image using the upload button above"
              : "Step 2: Ask questions about your CT analysis results"
            }
          </div>
        </div>
      </main>
    </div>
  );
}