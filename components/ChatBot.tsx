"use client"
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! 👋 Welcome to The STEM Park! How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Browse STEM Kits",
    "3D Printer Rental",
    "STEM Programs",
    "Track Order",
  ];

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "Browse STEM Kits": "Great choice! 🚀 We have robotics kits, solar kits, drone kits, and more. Visit our Shop page to explore all products!",
        "3D Printer Rental": "Our 3D printer rental starts at $15/hour. You can book time slots online and we'll have your designs printed and ready!",
        "STEM Programs": "We offer STEM Clubs for hands-on learning and Academic Support for tutoring. Check our Programs page for schedules!",
        "Track Order": "To track your order, please provide your order number or email, and I'll look it up for you!",
      };

      const botMessage: Message = {
        id: Date.now(),
        text: botResponses[messageText] || "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our shop or programs!",
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-foreground" : "bg-accent hover:brightness-110"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-background" />
        ) : (
          <MessageCircle className="w-6 h-6 text-accent-foreground" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="gradient-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold">STEM Park Assistant</h3>
                <p className="text-xs opacity-80">Usually replies instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? "bg-primary" : "bg-accent"
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <User className="w-4 h-4 text-accent-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? "bg-card text-card-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={() => handleSend()}
                size="icon"
                variant="cta"
                className="rounded-full"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
