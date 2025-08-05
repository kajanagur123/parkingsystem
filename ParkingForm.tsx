import React, { useState, useEffect } from 'react';
import { Clock, Car, Phone, Mail, CheckCircle, Shield, Copy } from 'lucide-react';

interface ParkingData {
  bikeNumber: string;
  phoneNumber: string;
  email: string;
  checkInTime: string;
  pin: string;
}

export const ParkingForm: React.FC = () => {
  const [formData, setFormData] = useState<ParkingData>({
    bikeNumber: '',
    phoneNumber: '',
    email: '',
    checkInTime: new Date().toLocaleString(),
    pin: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedPin, setGeneratedPin] = useState('');

  const generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyPin = () => {
    navigator.clipboard.writeText(generatedPin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate unique PIN
    const pin = generatePin();
    setGeneratedPin(pin);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store parking data in localStorage (in real app, this would be a database)
    const parkingData = {
      ...formData,
      pin,
      spotId: `SPOT-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`
    };
    
    localStorage.setItem(`parking_${pin}`, JSON.stringify(parkingData));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Bike Parked Successfully!</h2>
          <p className="text-green-100">Your secure PIN has been generated</p>
        </div>
        
        <div className="p-8">
          {/* PIN Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-900">Your Secure PIN</h3>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-4 tracking-widest">
              {generatedPin}
            </div>
            <button
              onClick={copyPin}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copy PIN</span>
            </button>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Remember your PIN: <strong>{generatedPin}</strong></li>
              <li>• You'll need this PIN to exit and pay</li>
              <li>• Keep it safe and don't share with others</li>
            </ul>
          </div>

          {/* Parking Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Parking Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bike Number:</span>
                <span className="font-medium">{formData.bikeNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in Time:</span>
                <span className="font-medium">{formData.checkInTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate:</span>
                <span className="font-medium">₹15 per hour</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Park Another Bike
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Park Your Bike</h2>
          <p className="text-green-100">Enter your details to get a secure PIN</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Bike Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Car className="inline h-4 w-4 mr-2" />
              Bike Number
            </label>
            <input
              type="text"
              name="bikeNumber"
              value={formData.bikeNumber}
              onChange={handleInputChange}
              placeholder="e.g., TN-45-XY-6789"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline h-4 w-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-2" />
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Check-in Time */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
            <p className="text-sm text-green-700 font-medium">Check-in Time</p>
            <p className="font-semibold text-gray-900">{formData.checkInTime}</p>
          </div>

          {/* Rate Info */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <p className="text-sm text-blue-700 font-medium">Parking Rate</p>
            <p className="text-lg font-bold text-blue-700">₹15 per hour</p>
            <p className="text-xs text-blue-600 mt-1">Pay when you exit based on actual time</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating PIN...</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                <span>Generate Secure PIN</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to our terms and conditions. Remember your PIN for exit.
          </p>
        </form>
      </div>
    </div>
  );
};