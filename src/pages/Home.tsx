import { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from '../store/useLanguageStore';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LazyViewportSection } from '../components/LazyViewportSection';

// Dynamic lazy loaded sections below the fold
const PropertiesSection = lazy(() => import('../components/PropertiesSection').then(m => ({ default: m.PropertiesSection })));
const AboutSection = lazy(() => import('../components/AboutSection').then(m => ({ default: m.AboutSection })));
const VideoDivider = lazy(() => import('../components/VideoDivider').then(m => ({ default: m.VideoDivider })));
const ServicesSection = lazy(() => import('../components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const GallerySection = lazy(() => import('../components/GallerySection').then(m => ({ default: m.GallerySection })));
const Footer = lazy(() => import('../components/Footer').then(m => ({ default: m.Footer })));

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

            {/* Hero Section (Eagerly loaded - Above the Fold) */}
            <Hero onSearch={handleSearch} />

            {/* Featured Properties Section (Lazy loaded on viewport) */}
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
                    <LazyViewportSection minHeight="600px">
                        <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-gold-500 font-serif">Loading...</div>}>
                            <PropertiesSection filters={searchFilters} />
                        </Suspense>
                    </LazyViewportSection>
                </div>
            </section>

            {/* About & Services Section (Lazy loaded) */}
            <LazyViewportSection minHeight="500px">
                <Suspense fallback={<div className="h-[500px]" />}>
                    <AboutSection />
                </Suspense>
            </LazyViewportSection>

            {/* Video Experience (Lazy loaded - stops immediate download of 6.7MB video) */}
            <LazyViewportSection minHeight="50vh">
                <Suspense fallback={<div className="h-[50vh]" />}>
                    <VideoDivider />
                </Suspense>
            </LazyViewportSection>

            {/* Property Management Services (Lazy loaded) */}
            <LazyViewportSection minHeight="400px">
                <Suspense fallback={<div className="h-[400px]" />}>
                    <ServicesSection />
                </Suspense>
            </LazyViewportSection>

            {/* Gallery Section (Lazy loaded) */}
            <LazyViewportSection minHeight="600px">
                <Suspense fallback={<div className="h-[600px]" />}>
                    <GallerySection />
                </Suspense>
            </LazyViewportSection>

            {/* Footer (Lazy loaded) */}
            <LazyViewportSection minHeight="250px">
                <Suspense fallback={<div className="h-[250px]" />}>
                    <Footer />
                </Suspense>
            </LazyViewportSection>
        </div>
    );
};
