'use client'
import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold">Itinerary Generated!</h1>
          <p className="mt-4 text-gray-600">Your itinerary is now ready to review.</p>
          {/* Insert further itinerary details or navigation options here */}
        </div>
      )}
    </div>
  );
};

export default Page;
