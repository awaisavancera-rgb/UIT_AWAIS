'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Webhook URL from your provider
    const WEBHOOK_URL = "https://tes170.app.n8n.cloud/webhook/uitu-chatbot";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Add welcome message when chat opens for the first time
            setMessages([{
                text: "Hello! I'm the UIT University assistant. Ask me about programs, fees, scholarships, or admissions. Example: \"What is the fee for BSCS?\"",
                sender: 'bot',
                timestamp: new Date()
            }]);
        }
    }, [isOpen, messages.length]);

    const escapeHtml = (unsafe: string) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const extractTextFromResponse = async (resp: Response): Promise<string> => {
        try {
            const json = await resp.clone().json().catch(() => null);
            if (json) {
                if (typeof json === 'string') return json;
                if (json.answer) return json.answer;
                if (Array.isArray(json) && json.length && typeof json[0] === 'object') {
                    for (const item of json) {
                        if (item.answer) return item.answer;
                        if (item.text) return item.text;
                        if (item.generated_text) return item.generated_text;
                        if (item.output) return item.output;
                    }
                }
                if (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) {
                    return json.choices[0].message.content;
                }
                if (json.generated_text) return json.generated_text;
                return JSON.stringify(json);
            }
        } catch (e) {
            // not JSON
        }

        try {
            const text = await resp.text();
            if (text) return text;
        } catch (e) {
            // give up
        }

        return "I couldn't read the response from the server. Please try again later.";
    };

    const sendMessage = async () => {
        const text = inputValue.trim();
        if (!text || isLoading) return;

        setError('');

        // Add user message
        const userMessage: Message = {
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const res = await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            if (!res.ok) {
                const errText = await res.text().catch(() => res.statusText || 'Unknown error');
                throw new Error(`Server error ${res.status}: ${errText}`);
            }

            const answer = await extractTextFromResponse(res);

            // Add bot response
            const botMessage: Message = {
                text: answer,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (err) {
            const errMsg = err instanceof Error ? err.message : 'Network error';
            const errorMessage: Message = {
                text: `Sorry — there was a problem sending your message. Error: ${errMsg}`,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
            setError(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                    size="icon"
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <MessageCircle className="h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[440px] bg-white rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold">
                                UI
                            </div>
                            <div>
                                <div className="font-semibold text-foreground">UIT University Assistant</div>
                                <div className="text-xs text-muted-foreground">
                                    Ask about programs, fees, scholarships, and admissions
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-primary/2 to-transparent">
                        <div className="space-y-3">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[78%] p-3 rounded-xl leading-relaxed ${message.sender === 'user'
                                        ? 'ml-auto bg-gradient-to-r from-primary to-primary/90 text-white rounded-br-sm'
                                        : 'mr-auto bg-slate-50 text-slate-800 rounded-bl-sm'
                                        }`}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: escapeHtml(message.text) }} />
                                </div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <div className="max-w-[78%] mr-auto bg-slate-50 text-slate-800 rounded-xl rounded-bl-sm p-3">
                                    <div className="text-xs text-muted-foreground mb-2">Assistant is typing</div>
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-3 border-t border-border bg-white">
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your question (e.g., 'What is the fee for BSCS?')"
                                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                size="sm"
                                className="px-3"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-2">
                            Powered by UIT University chatbot — for official details contact info@uitu.edu.pk
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}