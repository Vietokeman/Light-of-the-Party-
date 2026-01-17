import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { subscribeToVisitorStats } from '@/services/visitorService';
import { VisitorStats } from '@/types';

const VisitorCounter: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToVisitorStats((newStats) => {
      setStats(newStats);
    });

    return () => unsubscribe();
  }, []);

  if (!stats) return null;

  return (
    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-party-gold-100 rounded-full border border-party-gold-300">
      <Users size={14} className="text-party-gold-600" />
      <span className="text-xs font-medium text-party-gold-700">
        {stats.totalVisitors.toLocaleString()} lượt truy cập
      </span>
    </div>
  );
};

export default VisitorCounter;
