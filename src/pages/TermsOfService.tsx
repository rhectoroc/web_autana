import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-4xl font-serif text-charcoal mb-8">Terms of Service</h1>
                <div className="prose prose-lg text-gray-600">
                    <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing and using Autana Group's website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>

                    <h3>2. Real Estate Services</h3>
                    <p>Autana Group provides real estate brokerage, management, and maintenance services in the Dominican Republic. All property listings are subject to availability and price changes without notice.</p>

                    <h3>3. Use of Website</h3>
                    <p>The content of this website is for your general information and use only. It is subject to change without notice.</p>

                    <h3>4. Intellectual Property</h3>
                    <p>All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.</p>

                    <h3>5. Limitation of Liability</h3>
                    <p>Autana Group shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.</p>

                    <h3>6. Governing Law</h3>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the Dominican Republic.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};
