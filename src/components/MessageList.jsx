
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.sender === 'user';
        const isSystem = message.sender === 'system';
        
        return (
          <div
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${isSystem ? 'justify-center' : ''}`}
          >
            {!isCurrentUser && !isSystem && (
              <Avatar className="mr-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
            )}
            
            {isSystem ? (
              <div className="bg-gray-100 text-gray-800 p-3 rounded-xl max-w-[80%] text-center animate-fade-in">
                <p>{message.text}</p>
              </div>
            ) : (
              <div className={isCurrentUser ? 'message-bubble-sent' : 'message-bubble-received'}>
                <p>{message.text}</p>
                <div 
                  className={`text-[10px] mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-500'} text-right`}
                >
                  {format(new Date(message.timestamp), 'p')}
                </div>
              </div>
            )}
            
            {isCurrentUser && (
              <Avatar className="ml-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
