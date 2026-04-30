/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const QA_LIST = [
  { q: "What is Getsetai Innovations?", a: "We are a premier digital innovation agency specializing in AI-driven software, robotics, and full-stack development." },
  { q: "Do you offer internships?", a: "Yes! Check out our Careers page for available SDE, UI/UX, and Robotics internships." },
  { q: "Tell me about the AI courses.", a: "We offer hands-on Artificial Intelligence and Machine Learning courses starting from ₹1000." },
  { q: "How can I contact the team?", a: "You can reach us through the 'Contact' page or apply for services via our Services section!" },
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{type: "bot" | "user", text: string}[]>([
    { type: "bot", text: "Hello! Welcome to Getsetai Innovations 🚀 How can I assist you today?" }
  ]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleAsk = (qa: {q: string, a: string}) => {
    setMessages(prev => [...prev, { type: "user", text: qa.q }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", text: qa.a }]);
      // Scroll to bottom manually if needed, but flex-col-reverse or overflow-auto handles it.
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(168,85,247,0.6)" }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg z-50 ${isOpen ? "hidden" : "flex"}`}
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.2)] z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
                <div className="font-semibold text-white">Getsetai Assistant</div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0a0a0a] to-[#121212]">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.type === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === "bot" ? "bg-white/10 text-white rounded-tl-sm" : "bg-purple-600 text-white rounded-tr-sm"}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Q&A Options */}
            <div className="p-4 border-t border-white/10 bg-[#050505] space-y-2 max-h-[150px] overflow-y-auto">
               <p className="text-xs text-gray-400 mb-2 font-medium">Frequently Asked Questions:</p>
               {QA_LIST.map((qa, i) => (
                 <button 
                   key={i} 
                   onClick={() => handleAsk(qa)}
                   className="block w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs text-purple-300 hover:text-purple-200"
                 >
                   {qa.q}
                 </button>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
