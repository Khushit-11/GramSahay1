'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiHelpChatbot } from '@/ai/flows/ai-help-chatbot';
import { useToast } from '@/hooks/use-toast';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  id: number;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you with your loan today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const result = await aiHelpChatbot({ query: currentInput });
      const botResponse: Message = {
        id: Date.now() + 1,
        text: result.response,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
        console.error("Error with chatbot:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "The AI assistant is currently unavailable. Please try again later.",
        });
        const botErrorResponse: Message = {
            id: Date.now() + 1,
            text: "Sorry, I'm having trouble connecting. Please try again in a moment.",
            sender: 'bot',
        };
        setMessages((prev) => [...prev, botErrorResponse]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <Card className="flex-1 flex flex-col shadow-lg">
      <CardHeader>
        {/* Header can be added here if needed */}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-2',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md p-3 rounded-lg',
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-secondary text-secondary-foreground rounded-bl-none'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
                 <div className="flex items-end gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-lg rounded-bl-none">
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                        </div>
                    </div>
                 </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSend} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
