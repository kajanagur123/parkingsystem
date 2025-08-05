import React from 'react';
import { Car, ParkingCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SmartPark</h1>
              <p className="text-sm text-gray-600">QR Parking Solutions</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/park" 
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <ParkingCircle className="h-4 w-4" />
              <span className="font-medium">Park Bike</span>
            </Link>
            <Link 
              to="/exit" 
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Exit</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};