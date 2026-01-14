import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import clsx from 'clsx';
import api from '../services/api';

export const PropertiesSection = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'sale' | 'rent_long' | 'rent_short'>('all');
    const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await api.get('/properties');
                // Map API data to PropertyCard format
                const mapped = res.data.map((p: any) => ({
                    ...p,
                    id: p.id,
                    media: (p.images || []).map((img: any) => ({
                        id: img.id,
                        url: img.image_url,
                        type: 'image'
                    })),
                    // Defaults for usage if missing
                    area_sqm: p.area_sqm || 0,
                    parking_spots: p.parking_spots || 0,
                    type: p.type
                }));
                setProperties(mapped);
            } catch (err) {
                console.error('Failed to fetch', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const filteredProperties = activeFilter === 'all'
        ? properties
        : properties.filter(p => p.type === activeFilter);

    const tabs = [
        { id: 'all', label: 'All Properties' },
        { id: 'sale', label: 'For Sale' },
        { id: 'rent_long', label: 'Long Term Rent' },
        { id: 'rent_short', label: 'Vacation Rentals' },
    ];

    if (loading) {
        return <div className="py-24 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gold-500" /></div>;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <div>
                    <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold">Our Collection</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal mt-2">
                        Featured Properties
                    </h2>
                </div>

                {/* Filter Tabs - Desktop */}
                <div className="hidden md:flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id as any)}
                            className={clsx(
                                "px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-300",
                                activeFilter === tab.id
                                    ? "bg-white text-gold-500 shadow-sm"
                                    : "text-gray-500 hover:text-charcoal"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Tabs - Mobile (Scrollable) */}
            <div className="md:hidden overflow-x-auto pb-4 mb-4 -mx-4 px-4 scrollbar-hide">
                <div className="flex space-x-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id as any)}
                            className={clsx(
                                "flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all duration-300",
                                activeFilter === tab.id
                                    ? "bg-gold-500 border-gold-500 text-white"
                                    : "bg-transparent border-gray-200 text-gray-500 hover:border-gold-500 hover:text-gold-500"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Properties Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProperties.map((property) => (
                        <motion.div
                            key={property.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PropertyCard
                                property={property}
                                onClick={() => setSelectedProperty(property)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProperties.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-gray-400 text-lg">No properties found in this category.</p>
                    {/* Optional: Add admin hint if logged in */}
                </div>
            )}

            <div className="mt-12 text-center">
                <a href="#" className="inline-flex items-center text-charcoal hover:text-gold-500 transition-colors uppercase text-sm font-bold tracking-widest">
                    View All {tabs.find(t => t.id === activeFilter)?.label} <ArrowRight className="ml-2 w-4 h-4" />
                </a>
            </div>
            {selectedProperty && (
                <PropertyDetailsModal
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}
        </div>
    );
};
