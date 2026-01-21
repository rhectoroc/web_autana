import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { PropertiesSection } from '../components/PropertiesSection';
import { GallerySection } from '../components/GallerySection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';

export const Home = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchFilters, setSearchFilters] = useState<any>(null);

    const handleSearch = (filters: any) => {
        setSearchFilters(filters);
    };

    return (
        <div className="min-h-screen bg-off-white font-sans text-gray-800">
            <Navbar />

            {/* Hero Section */}
            <Hero onSearch={handleSearch} />

            {/* Featured Properties Section */}
            <section id="properties" className="py-24 px-4 sm:px-6 lg:px-8 bg-off-white">
                <PropertiesSection filters={searchFilters} />
            </section>

            {/* About & Services Section */}
            <AboutSection />

            {/* Property Management Services */}
            <ServicesSection />

            {/* Gallery Section */}
            <GallerySection />

            <Footer />
        </div>
    );
};
