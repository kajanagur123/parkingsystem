import React, { useState } from 'react';
import { BarChart3, Users, Car, Calendar, TrendingUp, Clock } from 'lucide-react';

interface ParkingRecord {
  id: string;
  bikeNumber: string;
  phoneNumber: string;
  checkIn: string;
  duration: number;
  fare: number;
  status: 'active' | 'completed';
}

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'records'>('overview');

  // Mock data
  const mockRecords: ParkingRecord[] = [
    {
      id: '1',
      bikeNumber: 'TN-45-XY-6789',
      phoneNumber: '+91 98765 43210',
      checkIn: '2:40 PM',
      duration: 2,
      fare: 30,
      status: 'completed'
    },
    {
      id: '2',
      bikeNumber: 'KA-01-AB-1234',
      phoneNumber: '+91 87654 32109',
      checkIn: '3:15 PM',
      duration: 1,
      fare: 15,
      status: 'active'
    },
    {
      id: '3',
      bikeNumber: 'MH-12-CD-5678',
      phoneNumber: '+91 76543 21098',
      checkIn: '1:20 PM',
      duration: 3,
      fare: 45,
      status: 'completed'
    }
  ];

  const stats = {
    totalRevenue: mockRecords.reduce((sum, record) => sum + record.fare, 0),
    activeParking: mockRecords.filter(record => record.status === 'active').length,
    totalSessions: mockRecords.length,
    avgDuration: mockRecords.reduce((sum, record) => sum + record.duration, 0) / mockRecords.length
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Parking Dashboard</h1>
        <p className="text-gray-600">Monitor your smart parking operations</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="inline h-5 w-5 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'records'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="inline h-5 w-5 mr-2" />
            Records
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">₹{stats.totalRevenue}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Sessions</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.activeParking}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.totalSessions}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Duration</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.avgDuration.toFixed(1)}h</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Trends</h3>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'records' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Parking Records</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bike Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fare
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.bikeNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.checkIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.duration}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ₹{record.fare}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};