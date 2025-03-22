"use client";

import { RainbowButton } from '@/components/magicui/rainbow-button-white';
import { Input } from '@/components/ui/input';
import { GripVertical, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

// Sample message type
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const Chats: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hey I am interested, could you schedule a class for me?", sender: 'user' },
        { id: 2, text: "Hey sure I have a class upcoming tomorrow, for Python 101 at 6PM HKT! What's your name?", sender: 'bot' },
        { id: 3, text: "I am a beginner... But tomorrow sounds great!", sender: 'user' },

    ]);

    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage: Message = {
                id: messages.length + 1,
                text: inputValue,
                sender: 'user',
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
            // Simulate a bot response
            setTimeout(() => {
                const botResponse: Message = {
                    id: messages.length + 2,
                    text: "Thanks for your message!",
                    sender: 'bot',
                };
                setMessages((prevMessages) => [...prevMessages, botResponse]);
            }, 1000);
        }
    };

    return (
        <div className='w-full h-full flex space-x-4'>
            <div className="flex flex-col w-[400px] h-full rounded-xl border border-border p-6">
                <div className='justify-between flex items-center'>
                    <div className='flex space-x-3 items-center'>
                        <MessageCircle className='size-4' />
                        <span className='text-lg font-bold'>My chats</span>
                    </div>
                    <GripVertical className='size-5 text-accent-foreground' />

                </div>

                <RainbowButton className='mt-4'>
                    Add Chat
                </RainbowButton>

                <p className='mt-2 text-xs text-accent-foreground'>My Chats (1)</p>

                <div className='w-full p-2 px-3 border-[4px] border-blue-500 flex items-center space-x-4 rounded-xl mt-2'>
                    <img className='w-8 h-8 rounded-full' src={"https://lh3.googleusercontent.com/a/ACg8ocL4JC4ou_sWpAbaqewDmnJbzpx1nfus_5PaNOx0FJAczrOusA=s96-c"} />
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>vivaan</h1>
                        <p className='text-xs text-accent-foreground'></p>
                    </div>
                </div>

                <div className='w-full p-2 px-3 border flex items-center space-x-4 rounded-xl mt-2'>
                    <img className='w-8 h-8 rounded-full' src={"https://fastly.picsum.photos/id/50/536/354.jpg?hmac=2kYEUrY-35l_kYy_oOoLaSfnrEtnw5-CQThRArnHC7o"} />
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>vivaan account 2</h1>
                        <p className='text-xs text-accent-foreground'></p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-full rounded-xl border border-border p-4">
                <div className="flex-1 overflow-auto bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex flex-col space-y-2">
                        <div className='flex space-x-2 items-center'>
                            <img className='w-6 h-6 rounded-full' src={"https://lh3.googleusercontent.com/a/ACg8ocL4JC4ou_sWpAbaqewDmnJbzpx1nfus_5PaNOx0FJAczrOusA=s96-c"} />
                            <p className='font-semibold w-full text-2xl justify-center text-center py-4'>Your chat with , Vivaan, starts here</p>
                        </div>
                        {messages.map((message) => (
                            <div key={message.id} className={`p-2 px-4 rounded-lg ${message.sender === 'user' ? 'bg-white text-black self-end' : 'bg-zinc-700 text-white self-start'}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex space-x-4 items-center">
                    <Input className='w-full' placeholder="Send Message" />
                    <RainbowButton>Send</RainbowButton>
                </div>
            </div>
        </div>
    );
};

export default Chats;