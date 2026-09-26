export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-6">Effective Date: 2026-09-26</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">1. Information We Collect</h2>
        <ul className="text-gray-600 list-disc pl-5 space-y-2 mb-4">
          <li><strong>Browser data:</strong> We collect non-personal technical data including browser type, device information, and IP address for statistics and service improvement.</li>
          <li><strong>Tool input data:</strong> Content you enter into our online tools (text, images, files) is processed locally in your browser. It is NOT uploaded to or stored on our servers.</li>
          <li><strong>Account information:</strong> If you register or subscribe, we store your email address and membership status.</li>
          <li><strong>Payment information:</strong> Payment card and cryptocurrency transaction details are processed by our payment processor. We do not store full card numbers on our servers.</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">2. How We Use Information</h2>
        <ul className="text-gray-600 list-disc pl-5 space-y-2 mb-4">
          <li>To operate, maintain, and improve our online tools and services.</li>
          <li>To process membership subscriptions and provide access to paid features.</li>
          <li>To troubleshoot technical problems and enhance user experience.</li>
          <li>To send service-related notifications (account changes, payment confirmations).</li>
          <li><strong>We will NOT</strong> sell, rent, or share your personal information to third parties for marketing purposes.</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">3. Data Processing Location</h2>
        <p className="text-gray-600 mb-4">All tool processing (text conversion, image compression, file operations) happens locally in your browser using JavaScript. No input data is transmitted to or stored on our servers. Account and subscription data is stored securely on Cloudflare infrastructure.</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">4. Cookies and Tracking</h2>
        <p className="text-gray-600 mb-4">We use minimal cookies essential for site functionality (session management, language preference). We do not use third-party advertising cookies or cross-site tracking pixels.</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">5. Data Security</h2>
        <p className="text-gray-600 mb-4">We adopt reasonable technical and organizational measures to protect your data. However, no internet transmission method is 100% secure. We encourage you to review our security practices regularly.</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">6. Your Rights</h2>
        <ul className="text-gray-600 list-disc pl-5 space-y-2 mb-4">
          <li><strong>Access:</strong> You may request a copy of personal data we hold about you.</li>
          <li><strong>Correction:</strong> You may request correction of inaccurate data.</li>
          <li><strong>Deletion:</strong> You may request deletion of your account and associated data.</li>
          <li><strong>Withdrawal of consent:</strong> You may withdraw consent for data processing at any time.</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">7. Third-Party Services</h2>
        <p className="text-gray-600 mb-4">We may use third-party services for payment processing (e.g., cryptocurrency wallets). These services have their own privacy policies. We encourage you to review them.</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">8. Policy Updates</h2>
        <p className="text-gray-600 mb-4">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the service after changes constitutes acceptance of the updated policy.</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">9. Contact</h2>
        <p className="text-gray-600 mb-2">Support Email: <a href="mailto:15981927999@163.com" className="text-blue-600 hover:underline">15981927999@163.com</a></p>
        <p className="text-gray-600 mb-4">Website: <a href="https://toolhive.com.cn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://toolhive.com.cn</a></p>

        <div className="border-t border-gray-100 mt-8 pt-6">
          <p className="text-xs text-gray-400">ToolHive is independently operated and has no affiliation with toolhive.com or other open-source projects named ToolHive.</p>
        </div>
      </div>
    </div>
  );
}
