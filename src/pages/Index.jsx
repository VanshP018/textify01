
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to login page after a short delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-textify-light to-white">
      <div className="text-center animate-bounce-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-textify-primary p-5 rounded-full shadow-lg">
            <MessageCircle size={50} className="text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-textify-dark mb-3">Textify</h1>
        <p className="text-xl text-gray-600 mb-8">Connect with friends and family</p>
        <div className="mt-6 relative">
          <div className="w-12 h-1 bg-textify-primary mx-auto rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
