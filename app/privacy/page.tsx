export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-6">Effective Date: 2026-09-21</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1. Introduction</h2>
        <p className="text-gray-600 mb-3">This Privacy Policy describes how we collect, use, store and protect user information when you use our web tool service at <a href="https://toolhive.com.cn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://toolhive.com.cn</a>.</p>
        <p className="text-gray-600 mb-3">We respect your privacy and commit to protecting your personal data. By accessing and using our website, you agree to the practices described in this policy.</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2. Information We Collect</h2>
        <ul className="text-gray-600 list-disc pl-5 space-y-2 mb-3">
          <li>Non-personal technical data: browser type, device information, IP address, website access time and page browsing records for statistics and service improvement.</li>
          <li>Information you voluntarily input: content you enter into our web tools. We do not collect your real name, ID number, payment card information unless you actively provide it.</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3. How We Use Information</h2>
        <ul className="text-gray-600 list-disc pl-5 space-y-2 mb-3">
          <li>To operate, maintain and improve our online tools.</li>
          <li>To troubleshoot technical problems and enhance user experience.</li>
          <li>We will NOT sell, rent or share your personal information to third parties for marketing purposes.</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4. Data Security</h2>
        <p className="text-gray-600 mb-3">We adopt reasonable technical measures to protect your data. However, no internet transmission method is 100% secure.</p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">5. Contact</h2>
        <p className="text-gray-600 mb-2">Support Email: <a href="mailto:15981927999@163.com" className="text-blue-600 hover:underline">15981927999@163.com</a></p>
        <p className="text-gray-600 mb-3">If you have any questions about this privacy policy, please contact us via the above email.</p>
      </div>
    </div>
  );
}