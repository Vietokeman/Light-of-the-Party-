import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { subscribeToOnlineUsers } from '@/services/visitorService';

const VisitorCounter: React.FC = () => {
  const [onlineCount, setOnlineCount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = subscribeToOnlineUsers((count) => {
      setOnlineCount(count);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full border border-green-300">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <Users size={14} className="text-green-600" />
      <span className="text-xs font-medium text-green-700">
        {onlineCount} đang online
      </span>
    </div>
  );
};

export default VisitorCounter;
