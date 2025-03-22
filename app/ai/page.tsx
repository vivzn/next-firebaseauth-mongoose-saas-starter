"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button-white";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages: any) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prevMessages: any) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Python is a key programming language in STEM, especially for machine learning, due to its simple syntax and ease of use. It features powerful libraries like TensorFlow and Scikit-learn for building models and Pandas for data manipulation. In STEM, Python helps visualize data with tools like Matplotlib, making findings easier to understand. Its versatility allows applications in healthcare for disease prediction, finance for market analysis, and environmental science for climate modeling. Strong community support offers valuable resources, making Python an ideal choice for STEM professionals.",
      };
      setMessages((prevMessages: any) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white/5 min-h-[400px] p-4 mb-4 rounded-xl overflow-y-auto">
        {messages.map((message: any, index: any) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-2xl max-w-[80%] ${
                message.role === "user"
                  ? "bg-white text-black"
                  : "bg-zinc-600 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-2xl bg-gray-100 text-gray-400">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
       
        <Input type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-[40px]"
          placeholder="Type your prompt..."/>
       <RainbowButton>Ask</RainbowButton>
      </form>
    </div>
  );
};

export default Index;
