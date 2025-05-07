import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { MessageCircle, Settings, Send, LogOut, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ChatSidebar from '@/components/ChatSidebar';
import MessageList from '@/components/MessageList';
import { useIsMobile } from '@/hooks/use-mobile';

const Chat = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hey there! Welcome to Textify 👋',
      sender: 'system',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      text: 'This is a demo chat interface. Try sending a message!',
      sender: 'system',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [showSidebar, setShowSidebar] = useState(true);
  const messageEndRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate('/login');
    }

    // Auto-hide sidebar on mobile
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [user, navigate, isMobile]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleLogout = () => {
    logout();
    toast({
      description: "You have been logged out",
    });
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 border-r border-gray-200 bg-white flex-shrink-0 shadow-sm">
          <ChatSidebar onLogout={handleLogout} />
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden"
            >
              <MessageCircle size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-textify-primary text-white">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">Textify Chat</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut size={18} />
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
          <MessageList messages={messages} currentUserId={user.id} />
          <div ref={messageEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-textify-primary hover:bg-textify-accent transition-colors flex gap-2 items-center">
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
