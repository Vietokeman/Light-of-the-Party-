import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { subscribeToTotalUsers } from '@/services/userStatsService';

export const UserStats: React.FC = () => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to total users
    const unsubscribeTotal = subscribeToTotalUsers((count) => {
      setTotalCount(count);
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => {
      unsubscribeTotal();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
        <span>Đang tải...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Users className="w-4 h-4 text-blue-600" />
      <span className="font-medium text-gray-700">
        {totalCount}
      </span>
      <span className="text-gray-500 hidden sm:inline">
        người dùng
      </span>
    </motion.div>
  );
};
