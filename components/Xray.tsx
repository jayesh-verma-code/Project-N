"use client";
import { useState, useEffect, useRef } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string; // Base64 encoded image
};

type AnalysisData = {
  body_part: {
    prediction: string;
    confidence: number;
    class_probabilities: Record<string, number>;
  };
  fracture: {
    prediction: string;
    confidence: number;
    class_probabilities: Record<string, number>;
  };
  summary: string;
  explanation: string;
};

export default function XRayAnalyzer() {
  const [inputValue, setInputValue] = useState<string>('');
  const [initialMessage] = useState<string>('Welcome to the X-ray Analysis section. Please upload an X-ray scan image first to begin analysis and discussion.');
  const apiUrl = "https://xray-662622027382.europe-west1.run.app";
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, [initialMessage]);

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

  // Helper function to safely access nested properties
  const safeGetAnalysisValue = (obj: any, path: string[], defaultValue: any = 'Unknown') => {
    try {
      return path.reduce((current, key) => current && current[key], obj) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const handleUploadXRay = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);

    const processingMessage: Message = {
      id: generateId(),
      text: "Analyzing your X-ray scan...",
      sender: 'bot',
      timestamp: new Date()
    };
    
    try {
      // Add user message with image
      const userMessage: Message = {
        id: generateId(),
        text: "Please analyze this X-ray scan.",
        sender: 'user',
        timestamp: new Date(),
        image: previewImage || undefined
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      // Add processing message
      setMessages(prev => [...prev, processingMessage]);
      
      // Make API call to analyze endpoint
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('X-ray analysis response:', data);
      
      // Remove the processing message
      setMessages(prev => prev.filter(msg => msg.id !== processingMessage.id));
      
      // Handle different possible response structures
      let summaryText = `Analysis Complete!\n\n`;
      
      // Try to extract analysis data with safe access
      const analysis = data.analysis || data;
      
      // Handle body part prediction
      const bodyPartPrediction = safeGetAnalysisValue(analysis, ['body_part', 'prediction'], 'Unknown');
      const bodyPartConfidence = safeGetAnalysisValue(analysis, ['body_part', 'confidence'], 0);
      const bodyPartConfidencePercent = typeof bodyPartConfidence === 'number' ? (bodyPartConfidence * 100).toFixed(1) : 'Unknown';
      
      // Handle fracture prediction
      const fracturePrediction = safeGetAnalysisValue(analysis, ['fracture', 'prediction'], 'Unknown');
      const fractureConfidence = safeGetAnalysisValue(analysis, ['fracture', 'confidence'], 0);
      const fractureConfidencePercent = typeof fractureConfidence === 'number' ? (fractureConfidence * 100).toFixed(1) : 'Unknown';
      
      // Handle explanation
      const explanation = data.explanation || data.summary || 'Analysis completed successfully.';
      
      summaryText += `Body Part: ${bodyPartPrediction} (${bodyPartConfidencePercent}%)\n`;
      summaryText += `Fracture Status: ${fracturePrediction} (${fractureConfidencePercent}%)\n\n`;
      summaryText += `Medical Analysis:\n${explanation}\n\nYou can now ask me questions about this analysis.`;
      
      // Store analysis data and session ID
      setAnalysisData(analysis);
      setSessionId(data.session_id || generateId()); // Fallback session ID if not provided
      setAnalysisComplete(true);
      
      // Add analysis result message
      const resultMessage: Message = {
        id: generateId(),
        text: summaryText,
        sender: 'bot',
        timestamp: new Date(),
        image: previewImage || undefined
      };
      
      setMessages(prev => [...prev, resultMessage]);
      
      // Reset image selection
      setSelectedImage(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error uploading X-ray scan:', error);
      // Remove processing message if it exists
      setMessages(prev => prev.filter(msg => msg.id !== processingMessage.id));
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        text: `Sorry, there was an error analyzing your X-ray scan: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
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
    
    // If no analysis has been done yet, prompt user to upload first
    if (!analysisComplete || !sessionId) {
      const promptMessage: Message = {
        id: generateId(),
        text: "Please upload an X-ray image first before asking questions. I need to analyze an image to provide meaningful discussion.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, promptMessage]);
      setInputValue('');
      return;
    }
    
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

      // Make API call to chat endpoint with JSON payload
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          session_id: sessionId
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Chat response:', data);
      
      // Add bot response
      const botMessage: Message = {
        id: generateId(),
        text: data.response || data.message || 'I received your message but couldn\'t generate a proper response.',
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
        text: `Sorry, I couldn't process your message: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
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
    
    const bodyPartPrediction = safeGetAnalysisValue(analysisData, ['body_part', 'prediction'], 'Unknown');
    const bodyPartConfidence = safeGetAnalysisValue(analysisData, ['body_part', 'confidence'], 0);
    const bodyPartConfidencePercent = typeof bodyPartConfidence === 'number' ? (bodyPartConfidence * 100).toFixed(1) : 'Unknown';
    
    const fracturePrediction = safeGetAnalysisValue(analysisData, ['fracture', 'prediction'], 'Unknown');
    const fractureConfidence = safeGetAnalysisValue(analysisData, ['fracture', 'confidence'], 0);
    const fractureConfidencePercent = typeof fractureConfidence === 'number' ? (fractureConfidence * 100).toFixed(1) : 'Unknown';
    
    return (
      <div className="bg-gray-800 p-4 rounded-lg mt-4 mb-4">
        <h3 className="text-blue-400 font-bold mb-2">X-ray Analysis Results</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Body Part:</span>
            <span className="text-blue-300 font-bold">{bodyPartPrediction}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Confidence:</span>
            <span className="text-green-300 font-bold">{bodyPartConfidencePercent}%</span>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-300 font-medium">Fracture Status:</span>
            <span className={`font-bold ${
              fracturePrediction === 'Fracture' ? 'text-red-400' : 'text-green-400'
            }`}>
              {fracturePrediction}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Confidence:</span>
            <span className="text-green-300 font-bold">{fractureConfidencePercent}%</span>
          </div>
        </div>
      </div>
    );
  };

  const clearChat = () => {
    // Reset all states
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setAnalysisData(null);
    setSessionId(null);
    setAnalysisComplete(false);
    setSelectedImage(null);
    setPreviewImage(null);
    setInputValue('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 rounded-lg my-4">
        {/* Header */}
        <div className="text-center mb-4 pb-4">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">Healthmate</h1>
          <div className="inline-flex items-center bg-black rounded-full px-3 py-1 border border-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>

        {/* Analysis Status */}
        {!analysisComplete && (
          <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <span className="text-yellow-200 text-sm">Please upload an X-ray scan image to begin analysis</span>
            </div>
          </div>
        )}

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
                } p-3 max-w-[80%] shadow`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="X-ray scan" 
                    className="mt-2 max-h-64 rounded-lg border border-gray-300" 
                  />
                )}
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
        
        {/* X-ray Analysis Results */}
        {analysisData && renderAnalysisResults()}
        
        {/* Image preview for upload */}
        {previewImage && (
          <div className="relative self-start mb-4 w-full">
            <div className="bg-gray-800 p-3 rounded-lg">
              <h3 className="text-blue-400 font-bold mb-2">Ready to analyze X-ray scan:</h3>
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
                <button 
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center"
                  onClick={handleUploadXRay}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Analyzing...</span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 mr-2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Analyze X-ray Scan
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
            placeholder={analysisComplete 
              ? "Ask questions about the X-ray analysis..." 
              : "Upload an X-ray scan image first to enable chat"
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
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            {/* Upload X-ray button */}
            <button 
              className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              title="Upload X-ray scan"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            
            {/* Send Icon (Paper Plane) */}
            <button 
              className={`${
                inputValue.trim() && analysisComplete 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white rounded-full w-8 h-8 flex items-center justify-center`}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !analysisComplete || isLoading}
              title={!analysisComplete ? "Upload and analyze an X-ray scan first" : "Send message"}
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
          {!analysisComplete 
            ? "Step 1: Upload an X-ray scan image using the upload button above"
            : "Step 2: Ask questions about your X-ray analysis results"
          }
        </div>

        {/* Clear chat button for debugging */}
        {analysisComplete && (
          <div className="mt-2 text-center">
            <button 
              onClick={clearChat}
              className="text-gray-500 hover:text-gray-300 text-xs underline"
            >
              Clear Chat & Start Over
            </button>
          </div>
        )}
      </main>
    </div>
  );
}