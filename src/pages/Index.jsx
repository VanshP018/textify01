
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to login page
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-textify-light to-white">
      <div className="text-center animate-bounce-in">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-textify-primary p-4 rounded-full">
            <MessageCircle size={40} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-textify-dark">Textify</h1>
        <p className="text-gray-500 mt-2">Connect with friends and family</p>
        <p className="text-gray-400 mt-6">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default Index;
