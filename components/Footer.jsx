import React from 'react'
import { MapPin } from 'lucide-react'
const Footer = () => {
  return (
    <div>
       <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="bg-emerald-400 text-white p-2 rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="ml-2 text-xl font-bold">TripPlanner</span>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition duration-150">About</a>
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition duration-150">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition duration-150">Terms</a>
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition duration-150">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TripPlanner. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
