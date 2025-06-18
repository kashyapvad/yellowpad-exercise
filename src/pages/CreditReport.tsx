
import React from 'react';
import { Button } from '@/components/atoms/button';
import { FileText, TrendingUp, User, CreditCard, AlertTriangle, BarChart3 } from 'lucide-react';

const CreditReport = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-light text-gray-900">Credit Report Details</h1>
          </div>
          <p className="text-gray-600">Detailed view of credit report information</p>
        </div>

        {/* Report Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Report Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Report Type</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                  Manual Entry
                </span>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  Success
                </span>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Credit Scores</p>
                <div className="mt-2">
                  <p className="text-lg font-semibold text-blue-600">812</p>
                  <p className="text-xs text-gray-500">(TRANSUNION_CIBIL)</p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Provider</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">MANUAL</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Generated On</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">Jun 19, 2025</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Requested On</p>
              <p className="text-lg font-semibold text-blue-600 mt-1">Jun 19, 2025</p>
            </div>
          </div>

          {/* Credit Score Section */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Credit Scores</h3>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-12 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold text-green-600">812</p>
                  <p className="text-sm text-gray-600">Excellent Credit Score</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">TRANSUNION_CIBIL</p>
                <p className="text-xs text-gray-500">Credit Bureau</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Customer Information</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name:</p>
                  <p className="text-lg text-gray-900">Kash Vadrevu</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mobile:</p>
                  <p className="text-lg text-gray-900 font-mono">2135144261</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">PAN:</p>
                  <p className="text-lg text-gray-900 font-mono">ABCDE1234F</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Aadhaar:</p>
                  <p className="text-lg text-gray-900 font-mono">123456789012</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender:</p>
                  <p className="text-lg text-gray-900">MALE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Account Information</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Total Accounts:</p>
                <p className="text-3xl font-bold text-blue-600">45</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Active Accounts:</p>
                <p className="text-3xl font-bold text-green-600">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delinquency Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Delinquency Information</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Days Past Due:</p>
                <p className="text-3xl font-bold text-orange-600">30</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Worst Status (12 Months):</p>
                <p className="text-3xl font-bold text-red-600">60</p>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Enquiries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Credit Enquiries</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Last 30 Days:</p>
              <p className="text-3xl font-bold text-gray-700">4</p>
            </div>
          </div>
        </div>

        {/* Additional Data */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Additional Data</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                  Trades
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-8">X:</span>
                  <span className="text-sm text-gray-600">Y</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-8">A:</span>
                  <span className="text-sm text-gray-600">B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditReport;
