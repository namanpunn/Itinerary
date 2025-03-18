import React from 'react';

const Loader = () => {
  return (
    <div
      role="alert"
      aria-busy="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
        {/* Message */}
        <h2 className="mt-4 text-xl font-semibold text-gray-700">
          Generating itinerary...
        </h2>
      </div>
    </div>
  );
};

export default Loader;
