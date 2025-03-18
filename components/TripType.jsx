'use client'
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'; 

export default function TripType() {
    const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [currentStep, setCurrentStep] = useState('calendar'); // 'calendar' or 'tripType'
  const [selectedTripType, setSelectedTripType] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);

  // Handler for purpose selection
  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
  };

  const saveSearch = (data) => {
    // Example: Save search details to localStorage (or replace with your own logic)
    localStorage.setItem('savedSearch', JSON.stringify(data));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate that a date range is selected
    if (!selectedRange.start || !selectedRange.end) {
      alert("Please select a valid date range.");
      return;
    }
  
    // Validate trip type selection
    if (!selectedTripType) {
      alert("Please select a trip type.");
      return;
    }
  
    // Validate trip purpose selection
    if (!selectedPurpose) {
      alert("Please select the purpose of your trip.");
      return;
    }
  
    
  
    // Save the search details
    saveSearch({
      startDate: selectedRange.start.toISOString(),
      endDate: selectedRange.end.toISOString(),
      tripType: selectedTripType,
      purpose: selectedPurpose,
    });
  
    // After 1.5 seconds, navigate to the itinerary page
    setTimeout(() => {
      router.push('/itinerary'); // Replace with your actual route if needed
    }, 1500);
  };
  

  // Get current month and next month
  const currentMonth = new Date(currentDate);
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  
  // Format month names
  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  // Generate days for a month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Adjust for Monday as first day
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = [];
    
    // Empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Actual days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  // Handle date selection
  const handleDateClick = (date) => {
    if (!date) return;
    
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Start new selection
      setSelectedRange({ start: date, end: null });
    } else {
      // Complete the selection
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
    }
  };
  
  // Check if a date is selected
  const isDateSelected = (date) => {
    if (!date || !selectedRange.start) return false;
    
    if (!selectedRange.end) {
      return date.getDate() === selectedRange.start.getDate() && 
             date.getMonth() === selectedRange.start.getMonth() && 
             date.getFullYear() === selectedRange.start.getFullYear();
    }
    
    return date >= selectedRange.start && date <= selectedRange.end;
  };
  
  // Check if date is the start or end of selection
  const isDateRangeEdge = (date) => {
    if (!date || !selectedRange.start || !selectedRange.end) return false;
    
    const isStart = date.getDate() === selectedRange.start.getDate() && 
                    date.getMonth() === selectedRange.start.getMonth() && 
                    date.getFullYear() === selectedRange.start.getFullYear();
                    
    const isEnd = date.getDate() === selectedRange.end.getDate() && 
                  date.getMonth() === selectedRange.end.getMonth() && 
                  date.getFullYear() === selectedRange.end.getFullYear();
                  
    return isStart || isEnd;
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };
  
  // Format selected date range for display
  const formatSelectedRange = () => {
    if (!selectedRange.start) return "Choose a date range, up to 7 days.";
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    if (!selectedRange.end) return `From ${formatDate(selectedRange.start)}`;
    
    // Calculate range in days
    const diffTime = Math.abs(selectedRange.end - selectedRange.start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)} (${diffDays} days)`;
  };
  
  // Check if a date range is valid (max 7 days)
  const isValidRange = () => {
    if (!selectedRange.start || !selectedRange.end) return true;
    
    const diffTime = Math.abs(selectedRange.end - selectedRange.start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays <= 7;
  };
  
  // Handle continue button click
  const handleContinue = () => {
    if (selectedRange.start && selectedRange.end && isValidRange()) {
      setCurrentStep('tripType');
    }
  };
  
  // Handle trip type selection
  const handleTripTypeSelect = (type) => {
    setSelectedTripType(type);
  };
  
  // Go back to calendar
  const goBackToCalendar = () => {
    setCurrentStep('calendar');
  };
  
  // Handle final continue button click
  const handleFinalContinue = () => {
    if (selectedTripType && selectedPurpose) {
      // Here you would typically navigate to the next step or submit the data
      console.log('Selected range:', selectedRange);
      console.log('Selected trip type:', selectedTripType);
      console.log('Selected purpose:', selectedPurpose);
      // Add your navigation or submission logic here
    }
  };
  
  // Render calendar step
  const renderCalendarStep = () => {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">When are you going?</h1>
          <p className="text-gray-600">{formatSelectedRange()}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Month Calendar */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-medium">{formatMonth(currentMonth)}</h2>
              <div className="w-6 h-6"></div> {/* Placeholder for alignment */}
            </div>
            
            <div className="px-4 pb-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="text-center font-medium text-gray-600 text-sm">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((date, i) => (
                  <div 
                    key={i}
                    onClick={() => handleDateClick(date)}
                    className={`
                      aspect-square flex items-center justify-center p-2 rounded-lg 
                      ${!date ? '' : 'cursor-pointer hover:bg-gray-100'} 
                      ${isDateSelected(date) && !isDateRangeEdge(date) ? 'bg-blue-100' : ''} 
                      ${isDateRangeEdge(date) ? 'bg-blue-600 text-white' : ''}
                    `}
                  >
                    {date ? date.getDate() : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Next Month Calendar */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4">
              <div className="w-6 h-6"></div> {/* Placeholder for alignment */}
              <h2 className="text-lg font-medium">{formatMonth(nextMonth)}</h2>
              <button 
                onClick={goToNextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-4 pb-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="text-center font-medium text-gray-600 text-sm">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(nextMonth).map((date, i) => (
                  <div 
                    key={i}
                    onClick={() => handleDateClick(date)}
                    className={`
                      aspect-square flex items-center justify-center p-2 rounded-lg 
                      ${!date ? '' : 'cursor-pointer hover:bg-gray-100'} 
                      ${isDateSelected(date) && !isDateRangeEdge(date) ? 'bg-blue-100' : ''} 
                      ${isDateRangeEdge(date) ? 'bg-blue-600 text-white' : ''}
                    `}
                  >
                    {date ? date.getDate() : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action button */}
        <div className="mt-6 text-center">
          <button 
            onClick={handleContinue}
            disabled={!selectedRange.start || !selectedRange.end || !isValidRange()} 
            className={`
              px-6 py-3 rounded-lg font-medium
              ${selectedRange.start && selectedRange.end && isValidRange() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            `}
          >
            Continue
          </button>
          
          {selectedRange.start && selectedRange.end && !isValidRange() && (
            <p className="text-red-500 mt-2">Please select a maximum of 7 days</p>
          )}
        </div>
      </div>
    );
  };
  
  // Render trip type selection step
  const renderTripTypeStep = () => {
    return (
      <div className="max-w-4xl mx-auto p-4">
        {/* Trip Type Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">What kind of trip are you planning?</h1>
          <p className="text-gray-600">Select one.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Solo Trip */}
          <div 
            onClick={() => handleTripTypeSelect('solo')}
            className={`
              relative p-6 rounded-lg border cursor-pointer flex flex-col items-center
              ${selectedTripType === 'solo' ? 'bg-emerald-400 border-emerald-500' : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="mb-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="font-medium">Solo Trip</div>
            {selectedTripType === 'solo' && (
              <div className="absolute right-4 top-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Partner Trip */}
          <div 
            onClick={() => handleTripTypeSelect('partner')}
            className={`
              relative p-6 rounded-lg border cursor-pointer flex flex-col items-center
              ${selectedTripType === 'partner' ? 'bg-emerald-400 border-emerald-500' : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="mb-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="font-medium">Partner Trip</div>
            {selectedTripType === 'partner' && (
              <div className="absolute right-4 top-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Work Trip */}
          <div 
            onClick={() => handleTripTypeSelect('work')}
            className={`
              relative p-6 rounded-lg border cursor-pointer flex flex-col items-center
              ${selectedTripType === 'work' ? 'bg-emerald-400 border-emerald-500' : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="mb-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
            </div>
            <div className="font-medium">Work Trip</div>
            {selectedTripType === 'work' && (
              <div className="absolute right-4 top-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Family Trip */}
          <div 
            onClick={() => handleTripTypeSelect('family')}
            className={`
              relative p-6 rounded-lg border cursor-pointer flex flex-col items-center
              ${selectedTripType === 'family' ? 'bg-emerald-400 border-emerald-500' : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="mb-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
              </svg>
            </div>
            <div className="font-medium">Family Trip</div>
            {selectedTripType === 'family' && (
              <div className="absolute right-4 top-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Purpose of Trip Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">What is the purpose of your trip?</h2>
          <p className="text-gray-600">Select one.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Meeting */}
          <div 
            onClick={() => handlePurposeSelect('meeting')}
            className={`
              relative p-6 rounded-lg border cursor-pointer flex flex-col items-center
              ${selectedPurpose === 'meeting' ? 'bg-emerald-400 border-emerald-500' : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="font-medium">Meeting</div>
            {selectedPurpose === 'meeting' && (
              <div className="absolute right-4 top-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Vacation */}
          <div 
            onClick={() => handlePurposeSelect('vacation')}
            className={`
              relative p-6 rounded-lg border cursor-pointer flex flex-col items-center
              ${selectedPurpose === 'vacation' ? 'bg-emerald-400 border-emerald-500' : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="font-medium">Vacation</div>
            {selectedPurpose === 'vacation' && (
              <div className="absolute right-4 top-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Honeymoon */}
          <div 
            onClick={() => handlePurposeSelect('honeymoon')}
            className={`
              relative p-6 rounded-lg border cursor-pointer flex flex-col items-center
              ${selectedPurpose === 'honeymoon' ? 'bg-emerald-400 border-emerald-500' : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="font-medium">Honeymoon</div>
            {selectedPurpose === 'honeymoon' && (
              <div className="absolute right-4 top-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button 
            onClick={goBackToCalendar}
            className="px-6 py-3 rounded-lg font-medium border hover:bg-gray-50"
          >
            Back
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={!selectedTripType || !selectedPurpose} 
            className={`
              px-6 py-3 rounded-lg font-medium
              ${selectedTripType && selectedPurpose
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            `}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };
  
  // Render the current step
  return currentStep === 'calendar' ? renderCalendarStep() : renderTripTypeStep();
}