import React from 'react'
import { MapPin } from 'lucide-react'

const Navbar = () => {
  return (
    <div>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="bg-emerald-400 text-white p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="ml-2 text-xl font-bold text-black">TripPlanner</span>
                </div>
              </div>
            </div>
            </a>
            
            {/* Navigation Links */}
            
            
            {/* Right Side Actions */}
            <div className="flex items-center">
              {/* <button className="bg-black text-white rounded-full px-4 py-2 font-medium hover:bg-gray-800 transition duration-150">
                Sign in
              </button> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
