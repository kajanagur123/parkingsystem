import React, { useState } from 'react';
import { Lock, Car, Clock, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface ExitData {
  pin: string;
  exitTime: string;
}

export const ExitForm: React.FC = () => {
  const [exitData, setExitData] = useState<ExitData>({
    pin: '',
    exitTime: new Date().toLocaleString()
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [parkingDetails, setParkingDetails] = useState<any>(null);
  const [fare, setFare] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExitData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const calculateFare = (checkInTime: string, exitTime: string) => {
    const checkIn = new Date(checkInTime);
    const exit = new Date(exitTime);
    const diffInHours = Math.ceil((exit.getTime() - checkIn.getTime()) / (1000 * 60 * 60));
    return Math.max(diffInHours, 1) * 15; // Minimum 1 hour charge
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if PIN exists in localStorage (in real app, this would be a database lookup)
    const storedData = localStorage.getItem(`parking_${exitData.pin}`);
    
    if (!storedData) {
      setError('Invalid PIN. Please check your 4-digit PIN and try again.');
      setIsProcessing(false);
      return;
    }

    const parkingData = JSON.parse(storedData);
    const calculatedFare = calculateFare(parkingData.checkInTime, exitData.exitTime);
    
    setParkingDetails(parkingData);
    setFare(calculatedFare);

    // Generate PDF receipt
    await generatePDF({
      ...parkingData,
      checkOutTime: exitData.exitTime,
      fare: calculatedFare,
      spotId: parkingData.spotId
    });

    // Remove from storage (simulate checkout)
    localStorage.removeItem(`parking_${exitData.pin}`);

    setIsProcessing(false);
    setShowSuccess(true);
  };

  if (showSuccess && parkingDetails) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Exit Successful!</h2>
          <p className="text-green-100">Your bill has been generated and downloaded</p>
        </div>
        
        <div className="p-8">
          {/* Bill Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Parking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bike Number:</span>
                <span className="font-medium">{parkingDetails.bikeNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">{parkingDetails.checkInTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">{exitData.exitTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate:</span>
                <span className="font-medium">₹15 per hour</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total Amount:</span>
                <span className="text-green-600">₹{fare}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700">
              ✅ PDF receipt has been downloaded automatically
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/park'}
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
        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 text-white text-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Exit & Pay</h2>
          <p className="text-red-100">Enter your 4-digit PIN to generate bill</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* PIN Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="inline h-4 w-4 mr-2" />
              Enter Your 4-Digit PIN
            </label>
            <input
              type="text"
              name="pin"
              value={exitData.pin}
              onChange={handleInputChange}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              pattern="[0-9]{4}"
              className="w-full px-4 py-4 text-center text-2xl font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all tracking-widest"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the 4-digit PIN you received when parking
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Exit Time */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-700 font-medium">Exit Time</p>
            </div>
            <p className="font-semibold text-gray-900">{exitData.exitTime}</p>
          </div>

          {/* Rate Info */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <h4 className="font-medium text-blue-900 mb-2">Billing Information</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Rate: ₹15 per hour</li>
              <li>• Minimum charge: 1 hour</li>
              <li>• Billing calculated from check-in to exit time</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || exitData.pin.length !== 4}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing Exit...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Exit & Generate Bill</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Your bill will be calculated based on actual parking duration and downloaded as PDF.
          </p>
        </form>
      </div>
    </div>
  );
};