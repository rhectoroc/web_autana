import { useState, useEffect } from 'react';
import { useTranslation } from '../store/useLanguageStore';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { PropertiesSection } from '../components/PropertiesSection';
import { GallerySection } from '../components/GallerySection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { VideoDivider } from '../components/VideoDivider';

export const Home = () => {
    const { t } = useTranslation();

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
            <SEO
                title={t.hero.title}
                description={t.hero.description}
            />
            <Navbar />

            {/* Hero Section */}
            <Hero onSearch={handleSearch} />

            {/* Featured Properties Section */}
            <section id="properties" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]/85 backdrop-blur-md relative overflow-hidden">
                {/* Elegant Divider Line */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent z-20" />
                
                {/* Fixed Background Image with Dark Transparency */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'url("/Fondo AutanaGroup.webp")',
                            backgroundAttachment: 'fixed',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }}
                    />
                    {/* Dark Overlay to harmonize with Hero */}
                    <div className="absolute inset-0 bg-[#0a0a0a]/40" />
                </div>
                <div className="relative z-10">
                    <PropertiesSection filters={searchFilters} />
                </div>
            </section>

            {/* About & Services Section */}
            <AboutSection />

            {/* Video Experience */}
            <VideoDivider />

            {/* Property Management Services */}
            <ServicesSection />

            {/* Gallery Section */}
            <GallerySection />

            <Footer />
        </div>
    );
};
