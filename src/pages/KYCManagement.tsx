
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-light text-gray-900">KYC Management</h1>
          </div>
          <p className="text-gray-600">Client: Client 1 (000000001)</p>
        </div>

        {/* Document Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">KYC Document Details</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Client identification documents</p>
          </div>

          <div className="p-6 space-y-4">
            {documents.map((doc, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  doc.highlighted 
                    ? 'bg-amber-50 border-amber-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700">{doc.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-900 font-mono">
                    {doc.value || '-'}
                  </span>
                  {doc.verified && doc.value ? (
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-100">
            <Button className="ml-auto flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Details
            </Button>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm text-white p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
              <Check className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-medium">KYC Verified</h3>
              <p className="text-green-100">PAN and Aadhaar verified successfully</p>
            </div>
          </div>
        </div>

        {/* Verification Status Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Verification Status</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Document verification status</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Overall Status:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Pending
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Documents Verified:</span>
              <span className="text-blue-600 font-medium">{verifiedCount} / {totalCount}</span>
            </div>
          </div>
        </div>

        {/* Last Verified */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm text-white p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-blue-100 text-sm font-medium">LAST VERIFIED</p>
              <p className="text-2xl font-light">19 Jun 2025</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium">VERIFIED BY</p>
              <p className="text-2xl font-light">mifos</p>
            </div>
          </div>
        </div>

        {/* Verification Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Verification Actions</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Verify or unverify KYC documents</p>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Manual Verification
              </Button>
              <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
                <FileText className="h-4 w-4" />
                Unverify Documents
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                API Verification
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCManagement;
