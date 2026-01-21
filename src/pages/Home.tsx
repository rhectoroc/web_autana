import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { PropertiesSection } from '../components/PropertiesSection';
import { ServicesSection } from '../components/ServicesSection';
import { GallerySection } from '../components/GallerySection';

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

            {/* Services Section */}
            <ServicesSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* About Section */}
            <section id="about" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-100 z-0 rounded-full opacity-50"></div>
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"
                                alt="Interior Design"
                                className="relative z-10 w-full h-[500px] object-cover rounded-sm shadow-xl"
                            />
                        </div>
                        <div>
                            <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold">About Autana Group</span>
                            <h2 className="text-4xl font-serif text-charcoal mt-2 mb-6">
                                Excellence in Every Detail
                            </h2>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                We specialize in rapid sales and luxury rentals in the most sought-after locations of the Dominican Republic, including Punta Cana, Cap Cana, and Bavaro. Our portfolio represents the pinnacle of tropical living.
                            </p>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Whether you are looking for a lucrative investment or your dream vacation home, our dedicated team provides white-glove service tailored to your unique needs.
                            </p>
                            <button className="border border-charcoal text-charcoal px-8 py-3.5 hover:bg-charcoal hover:text-white transition-all duration-300 uppercase text-xs font-bold tracking-widest">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
