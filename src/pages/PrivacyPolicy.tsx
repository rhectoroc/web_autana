import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-4xl font-serif text-charcoal mb-8">Privacy Policy</h1>
                <div className="prose prose-lg text-gray-600">
                    <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                    <h3>1. Information Collection</h3>
                    <p>We collect information from you when you register on our site, subscribe to our newsletter, respond to a survey or fill out a form. This includes your name, email address, mailing address, and phone number.</p>

                    <h3>2. Use of Information</h3>
                    <p>Any of the information we collect from you may be used in one of the following ways:</p>
                    <ul>
                        <li>To personalize your experience</li>
                        <li>To improve our website</li>
                        <li>To improve customer service</li>
                        <li>To process transactions</li>
                        <li>To send periodic emails</li>
                    </ul>

                    <h3>3. Data Protection</h3>
                    <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>

                    <h3>4. Third Party Disclosure</h3>
                    <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

                    <h3>5. Compliance with Dominican Republic Laws</h3>
                    <p>We comply with Law No. 172-13 on the Protection of Personal Data in the Dominican Republic, ensuring your rights to access, rectification, cancellation, and opposition are respected.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};
