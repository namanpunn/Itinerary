"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  X,
  Loader2,
  ChevronRight,
  Clock,
  Camera,
} from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [suggestedDestinations, setSuggestedDestinations] = useState([
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "Bali, Indonesia",
    "London, UK",
    "Rome, Italy",
    "Barcelona, Spain",
    "Sydney, Australia",
  ]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 3));
    }
  }, []);

  const saveSearch = (searchTerm) => {
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter((s) => s !== searchTerm),
    ].slice(0, 3);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      setIsGenerating(true);
      saveSearch(destination);

      // After 1 second, navigate to a new page
      setTimeout(() => {
        router.push("/plan"); // Replace with your actual route
      }, 1500);
    }
  };

  const handleInputFocus = () => {
    setShowSearchSuggestions(true);
  };

  const handleInputBlur = () => {
    // Delay hiding to allow clicking on suggestions
    setTimeout(() => setShowSearchSuggestions(false), 200);
  };

  const clearDestination = () => {
    setDestination("");
  };

  const selectDestination = (city) => {
    setDestination(city);
    setShowSearchSuggestions(false);
    // Optional: auto-submit after selection
    // setTimeout(() => document.querySelector('form').requestSubmit(), 300);
  };

  // Filter suggestions based on input
  const filteredSuggestions = suggestedDestinations.filter((city) =>
    city.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="w-full bg-white font-sans overflow-hidden">
      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <div className="bg-white py-8 w-full">
          <div className="w-full max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Where to?</h1>
            <p className="text-gray-600 text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let us plan your perfect trip itinerary
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto relative">
            <div className="flex items-center rounded-full shadow-sm overflow-hidden">
        <div className="flex-grow relative flex items-center bg-white">
          <input
            type="text"
            placeholder="Enter destination"
            className="w-full py-3 px-4 focus:outline-none text-gray-600 rounded-l-full"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required
          />
          {destination && (
            <button
              type="button"
              onClick={clearDestination}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-3 font-medium transition duration-150 flex items-center justify-center rounded-r-full"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          <span className="ml-2">Search</span>
        </button>
      </div>

              {/* Search Suggestions */}
              {showSearchSuggestions && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  {recentSearches.length > 0 && (
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 uppercase px-3 py-2">
                        Recent Searches
                      </div>
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                          onClick={() => selectDestination(search)}
                        >
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{search}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-100 my-1"></div>
                    </div>
                  )}

                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 uppercase px-3 py-2">
                      Suggestions
                    </div>
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.slice(0, 5).map((city, index) => (
                        <div
                          key={index}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                          onClick={() => selectDestination(city)}
                        >
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{city}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500">
                        No matching destinations found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* AI Trip Planner Feature */}
        <div className="bg-emerald-400 py-8 sm:py-12 w-full">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Images with improved styling */}
              <div className="flex -space-x-2 mb-6 md:mb-0 transform hover:scale-105 transition-transform duration-300 max-w-full">
                <div className="relative border-4 border-white rounded-2xl overflow-hidden h-40 sm:h-60 w-32 sm:w-44 -rotate-6 shadow-lg">
                  <img
                    src="/images/dubai.jpeg"
                    alt="Dubai"
                    className="absolute inset-0 w-full h-full object-cover bg-gradient-to-b from-blue-300 to-blue-500"
                  />
                  <Camera className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 h-6 w-6 sm:h-8 sm:w-8 text-white opacity-75" />
                </div>

                <div className="relative border-4 border-white rounded-2xl overflow-hidden h-40 sm:h-60 w-32 sm:w-44 z-10 shadow-lg">
                  <img
                    src="/images/australia.jpeg"
                    alt="Australia"
                    className="absolute inset-0 w-full h-full object-cover bg-gradient-to-b from-orange-300 to-red-500"
                  />
                  <Camera className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 h-6 w-6 sm:h-8 sm:w-8 text-white opacity-75" />
                </div>

                <div className="relative border-4 border-white rounded-2xl overflow-hidden h-40 sm:h-60 w-32 sm:w-44 rotate-6 shadow-lg">
                  <img
                    src="/images/japan.webp"
                    alt="Japan"
                    className="absolute inset-0 w-full h-full object-cover bg-gradient-to-b from-green-300 to-green-600"
                  />
                  <Camera className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 h-6 w-6 sm:h-8 sm:w-8 text-white opacity-75" />
                </div>
              </div>

              {/* Text Content */}
              <div className="md:w-1/2 text-left mt-4 md:mt-0">
                <div className="flex items-center mb-2">
                  <span className="text-xs sm:text-sm font-semibold bg-black text-white px-2 sm:px-3 py-1 rounded-full">
                    Powered by AI
                  </span>
                  <span className="ml-2 text-xs sm:text-sm font-semibold bg-black text-white px-2 sm:px-3 py-1 rounded-full">
                    BETA
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2 sm:mb-4">
                  Plan a trip that's so you
                </h2>
                <p className="text-lg sm:text-xl text-black mb-4 sm:mb-6">
                  Enter your destination and get a personalized itinerary in
                  seconds. No more hours of research.
                </p>
                <button
                  onClick={() => document.querySelector("input").focus()}
                  className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-800 transform hover:scale-105 transition-all duration-150 flex items-center text-sm sm:text-base"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  Create My Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white py-12 sm:py-16 w-full">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Popular Destinations
              </h2>
              {/* <a
                href="#"
                className="text-emerald-500 hover:text-emerald-600 flex items-center text-xs sm:text-sm font-medium"
              >
                View all destinations
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </a> */}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                {
                  name: "Paris",
                  country: "France",
                  image: "/images/paris.jpeg",
                },
                {
                  name: "Tokyo",
                  country: "Japan",
                  image: "/images/japan2.jpg",
                },
                {
                  name: "New York",
                  country: "USA",
                  image: "/images/uk.jpeg",
                },
                {
                  name: "Bali",
                  country: "Indonesia",
                  image: "/images/bali.webp",
                },
              ].map((city) => (
                <div
                  key={city.name}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 group"
                  onClick={() => {
                    setDestination(`${city.name}, ${city.country}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div
                    className="h-32 sm:h-48 relative"
                    style={{
                      backgroundImage: `url(${city.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity"></div>
                  </div>
                  <div className="p-2 sm:p-4">
                    <h3 className="text-base sm:text-xl font-medium text-gray-900">
                      {city.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{city.country}</p>
                    <p className="text-emerald-500 text-xs sm:text-sm font-medium flex items-center">
                      Create itinerary
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;