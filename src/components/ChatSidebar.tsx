
import { useState } from 'react';
import { User, Search, MessageCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';

interface ChatSidebarProps {
  onLogout: () => void;
}

const ChatSidebar = ({ onLogout }: ChatSidebarProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    { id: '1', name: 'Alice Johnson', status: 'online', avatar: '/placeholder.svg', lastMessage: 'Hey, how are you?' },
    { id: '2', name: 'Bob Smith', status: 'offline', avatar: '/placeholder.svg', lastMessage: 'Can we meet tomorrow?' },
    { id: '3', name: 'Carol White', status: 'online', avatar: '/placeholder.svg', lastMessage: 'I sent you the files' },
    { id: '4', name: 'Dave Miller', status: 'offline', avatar: '/placeholder.svg', lastMessage: 'Thanks for your help!' },
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-textify-primary p-2 rounded-md">
              <MessageCircle size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Textify</h1>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Separator />

      {/* User Profile */}
      <div className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-textify-primary text-white">
            {user?.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{user?.username}</h3>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onLogout}>
          <LogOut size={18} />
        </Button>
      </div>

      <Separator />

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="px-4 py-2 text-sm font-medium text-gray-500">Recent Chats</h2>
        <div className="space-y-1">
          {filteredContacts.map(contact => (
            <button
              key={contact.id}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span 
                  className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                    contact.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              </div>
              <div className="flex-1 truncate">
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
