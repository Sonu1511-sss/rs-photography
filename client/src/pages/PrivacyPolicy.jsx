import { motion } from 'framer-motion'

const PrivacyPolicy = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-wedding-gold">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-elegant font-bold mb-4">Introduction</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              RS Photography ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website and use our services.
            </p>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Information We Collect</h2>
            <h3 className="text-2xl font-semibold mb-3 mt-6">Personal Information</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We may collect personal information that you provide to us, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Event details (wedding date, location, city)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Any other information you choose to provide in contact forms or communications</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Device information</li>
            </ul>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Provide, maintain, and improve our photography services</li>
              <li>Process your bookings and manage your account</li>
              <li>Communicate with you about your inquiries and bookings</li>
              <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze website usage and trends</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may 
              share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>With service providers who assist us in operating our website and conducting our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer (merger, acquisition, etc.)</li>
              <li>With your explicit consent</li>
            </ul>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Photography and Image Rights</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              By engaging our services, you grant RS Photography the right to use photographs 
              and videos taken during your event for promotional purposes, including but not 
              limited to our website, social media, and marketing materials. If you wish to 
              restrict the use of your images, please inform us in writing before your event.
            </p>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Data Security</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect 
              your personal information. However, no method of transmission over the Internet 
              or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Your Rights</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Access and receive a copy of your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Cookies</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our website may use cookies to enhance your experience. You can choose to disable 
              cookies through your browser settings, though this may affect website functionality.
            </p>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Third-Party Links</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for 
              the privacy practices of these external sites. We encourage you to review their 
              privacy policies.
            </p>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Children's Privacy</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not 
              knowingly collect personal information from children.
            </p>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last 
              updated" date.
            </p>

            <h2 className="text-3xl font-elegant font-bold mb-4 mt-8">Contact Us</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-2"><strong>RS Photography</strong></p>
              <p className="text-gray-700 mb-2">Balaghat, Madhya Pradesh, India</p>
              <p className="text-gray-700 mb-2">Email: info@rsphotography.com</p>
              <p className="text-gray-700">Phone: +91 98765 43210</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy


