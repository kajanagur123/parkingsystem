import React from 'react';
import { Shield, Car, ArrowRight, Lock, Clock, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ParkingHome: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Secure PIN Parking System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Park your bike securely with a unique 4-digit PIN. No QR codes needed - just remember your PIN to exit!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Action Cards */}
        <div className="space-y-6">
          <Link 
            to="/park"
            className="block bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-l-4 border-green-500"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Car className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Park Your Bike</h3>
                <p className="text-gray-600">Get a secure 4-digit PIN</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Click to start parking</p>
              <ArrowRight className="h-5 w-5 text-green-600" />
            </div>
          </Link>

          <Link 
            to="/exit"
            className="block bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-l-4 border-red-500"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Exit & Pay</h3>
                <p className="text-gray-600">Enter your PIN to exit</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Enter PIN to generate bill</p>
              <ArrowRight className="h-5 w-5 text-red-600" />
            </div>
          </Link>
        </div>

        {/* How It Works */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Park Your Bike</h3>
                <p className="text-gray-600">Enter your bike details and get a unique 4-digit PIN</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Remember Your PIN</h3>
                <p className="text-gray-600">Keep your 4-digit PIN safe - you'll need it to exit and pay</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Exit & Get Receipt</h3>
                <p className="text-gray-600">Enter your PIN to calculate charges and download PDF receipt</p>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Security Features
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Unique 4-digit PIN for each parking session</li>
              <li>• Secure data encryption and storage</li>
              <li>• Time-based automatic billing</li>
              <li>• Instant PDF receipt generation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">100% Secure</h3>
          <p className="text-gray-600">PIN-based security system</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7 Access</h3>
          <p className="text-gray-600">Park and exit anytime</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Instant Bills</h3>
          <p className="text-gray-600">PDF receipts on exit</p>
        </div>
      </div>
    </div>
  );
};