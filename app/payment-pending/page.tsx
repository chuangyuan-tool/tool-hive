'use client';

import Link from 'next/link';

export default function PaymentPendingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Pending</h1>
          <p className="text-gray-600 mb-6">We are verifying your payment. This may take a few minutes.</p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-blue-800">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• We will verify your payment automatically</li>
              <li>• You will receive a confirmation email</li>
              <li>• Your account will be activated within 24 hours</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
