"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! I'm Neonix, your personal health assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [buttonHovered, setButtonHovered] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I'm here to help with your health and wellness needs. Is there something specific you'd like to know about NIRVEON'X services?",
        },
      ])
    }, 2000)

    setInput("")
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-white/10 rounded-2xl shadow-xl w-80 sm:w-96 mb-4 overflow-hidden"
          >
            <div className="bg-white/10 backdrop-blur-sm p-4 flex justify-between items-center">
              <div className="flex items-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="mr-2"
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-white font-bold">Neonix</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user" ? "bg-white text-black" : "bg-white/10 text-white"
                    }`}
                  >
                    {message.content}
                  </motion.div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white/10 text-white">
                    <motion.div
                      className="flex space-x-1"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-white/5 border-white/10 focus:ring-white text-white"
              />
              <Button type="submit" size="icon" className="ml-2 bg-white text-black hover:bg-white/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        onHoverStart={() => setButtonHovered(true)}
        onHoverEnd={() => setButtonHovered(false)}
        className="bg-white text-black hover:bg-white/90 rounded-full p-4 shadow-lg flex items-center justify-center relative cursor-hover-trigger"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <motion.div
          className="absolute -inset-1 rounded-full bg-white/20"
          animate={{
            scale: buttonHovered ? [1, 1.2, 1] : 1,
            opacity: buttonHovered ? [0.2, 0.5, 0.2] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </motion.button>
    </div>
  )
}

