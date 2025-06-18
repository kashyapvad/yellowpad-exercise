
import React, { useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Check, Edit, Shield, FileText, User, Calendar } from 'lucide-react';

interface DocumentField {
  label: string;
  value: string;
  verified: boolean;
  highlighted?: boolean;
}

const KYCManagement = () => {
  const [documents] = useState<DocumentField[]>([
    { label: 'PAN Number', value: 'ABCDE1234F', verified: true },
    { label: 'Aadhaar Number', value: '123456789012', verified: true },
    { label: 'Driving License', value: 'DL12mj345672008', verified: true, highlighted: true },
    { label: 'Voter ID', value: '', verified: false },
    { label: 'Passport Number', value: 'U0887763', verified: true },
  ]);

  const verifiedCount = documents.filter(doc => doc.verified && doc.value).length;
  const totalCount = documents.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Shield className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900">KYC Management</h1>
          </div>
          <p className="text-sm text-gray-600">Client: Client 1 (000000001)</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Document Details */}
          <div className="space-y-4">
            {/* Document Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  <h2 className="text-lg font-medium text-gray-900">Document Details</h2>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {documents.map((doc, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      doc.highlighted 
                        ? 'bg-amber-50 border-amber-200' 
                        : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700">{doc.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-900 font-mono bg-white px-2 py-1 rounded border">
                        {doc.value || '-'}
                      </span>
                      {doc.verified && doc.value ? (
                        <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-50">
                <Button size="sm" className="ml-auto flex items-center gap-2">
                  <Edit className="h-3 w-3" />
                  Edit Details
                </Button>
              </div>
            </div>

            {/* Compact Status Card */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-sm text-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">KYC Verified</h3>
                  <p className="text-green-100 text-sm">PAN and Aadhaar verified successfully</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Verification Details */}
          <div className="space-y-4">
            {/* Verification Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-600" />
                  <h2 className="text-lg font-medium text-gray-900">Verification Status</h2>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Overall Status:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Pending
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Documents Verified:</span>
                  <span className="text-blue-600 font-medium">{verifiedCount} / {totalCount}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(verifiedCount / totalCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Last Verified */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm text-white p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-100 text-xs font-medium">LAST VERIFIED</p>
                  <p className="text-lg font-medium">19 Jun 2025</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs font-medium">VERIFIED BY</p>
                  <p className="text-lg font-medium">mifos</p>
                </div>
              </div>
            </div>

            {/* Verification Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <h2 className="text-lg font-medium text-gray-900">Actions</h2>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 justify-start">
                    <Check className="h-3 w-3" />
                    Manual Verification
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <FileText className="h-3 w-3" />
                    Unverify Documents
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 justify-start">
                    <Calendar className="h-3 w-3" />
                    API Verification
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCManagement;
