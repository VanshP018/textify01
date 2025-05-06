
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other' | 'system';
  timestamp: string;
}

export interface Contact {
  id: string;
  name: string;
  status: 'online' | 'offline';
  avatar: string;
  lastMessage?: string;
}
