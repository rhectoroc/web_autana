import React, { useState, useEffect } from 'react';
import { X, MapPin, Bed, Bath, Maximize, Car, Check, Play, Share2, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Property } from '../types/property';
import { formatCurrency } from '../utils/format';

interface PropertyDetailsModalProps {
    property: Property;
    onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
    const [activeMedia, setActiveMedia] = useState(property.media[0]);
    const [copied, setCopied] = useState(false);

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: property.title,
                    text: `Check out this property: ${property.title}`,
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full transition-all duration-300 shadow-sm
                                 bg-black/50 text-white hover:bg-black/70
                                 lg:bg-gray-100 lg:text-charcoal lg:hover:bg-gray-200 lg:hover:text-gold-500"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

                        {/* Split Layout: Media (Left/Top) & Details (Right/Bottom) */}
                        <div className="flex flex-col lg:flex-row">

                            {/* Visuals Column */}
                            <div className="lg:w-3/5 bg-gray-100 flex flex-col">
                                {/* Main Media View */}
                                <div className="relative h-[400px] lg:h-[500px]">
                                    {activeMedia.type === 'video' ? (
                                        <video
                                            src={activeMedia.url}
                                            className="w-full h-full object-cover"
                                            controls
                                            autoPlay
                                        />
                                    ) : (
                                        <img
                                            src={activeMedia.url}
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-gold-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm shadow-md">
                                            {property.type.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                {/* Thumbnails Strip */}
                                <div className="p-4 bg-charcoal">
                                    <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
                                        {property.media.map((media) => (
                                            <button
                                                key={media.id}
                                                onClick={() => setActiveMedia(media)}
                                                className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${activeMedia.id === media.id ? 'border-gold-500 ring-2 ring-gold-500/30' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                            >
                                                {media.type === 'video' && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                        <Play className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                                <img
                                                    src={media.type === 'video' ? property.media.find(m => m.type === 'image')?.url : media.url}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Details Column */}
                            <div className="lg:w-2/5 p-6 lg:p-8 bg-white overflow-y-auto max-h-[90vh]">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl md:text-3xl font-serif text-charcoal leading-tight">
                                        {property.title}
                                    </h2>
                                </div>

                                <div className="flex items-center text-gray-500 mb-6 text-sm">
                                    <MapPin className="w-4 h-4 mr-1 text-gold-500" />
                                    {property.location}
                                </div>

                                <div className="flex items-baseline mb-6 border-b border-gray-100 pb-6">
                                    <span className="text-3xl font-serif text-charcoal font-bold">
                                        {formatCurrency(property.price)}
                                    </span>
                                    {property.type.includes('rent') && <span className="text-gray-500 ml-2">/month</span>}
                                </div>

                                {/* Key Specs */}
                                <div className="grid grid-cols-4 gap-2 mb-8 text-center bg-off-white p-4 rounded-xl">
                                    <div className="flex flex-col items-center">
                                        <Bed className="w-5 h-5 text-gold-500 mb-1" />
                                        <span className="font-bold text-gray-800">{property.bedrooms}</span>
                                        <span className="text-[10px] uppercase text-gray-500">Beds</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Bath className="w-5 h-5 text-gold-500 mb-1" />
                                        <span className="font-bold text-gray-800">{property.bathrooms}</span>
                                        <span className="text-[10px] uppercase text-gray-500">Baths</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Maximize className="w-5 h-5 text-gold-500 mb-1" />
                                        <span className="font-bold text-gray-800">{property.area_sqm}</span>
                                        <span className="text-[10px] uppercase text-gray-500">m²</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Car className="w-5 h-5 text-gold-500 mb-1" />
                                        <span className="font-bold text-gray-800">{property.parking_spots}</span>
                                        <span className="text-[10px] uppercase text-gray-500">Pkg</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase text-charcoal mb-2 tracking-wider">Description</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {property.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold uppercase text-charcoal mb-3 tracking-wider">Amenities</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {property.amenities?.map((amenity, i) => (
                                                <div key={i} className="flex items-center text-xs text-gray-600">
                                                    <Check className="w-3 h-3 text-gold-500 mr-2 flex-shrink-0" />
                                                    {amenity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Footer (Sticky) */}
                                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                                    <motion.button
                                        whileHover="hover"
                                        initial="initial"
                                        className="flex-1 relative overflow-hidden bg-charcoal text-white font-bold py-4 rounded-sm uppercase text-xs tracking-[0.2em] shadow-xl group"
                                    >
                                        <span className="relative z-10 transition-colors duration-500 group-hover:text-charcoal flex items-center justify-center gap-2">
                                            Contact Agent
                                        </span>
                                        <motion.div
                                            variants={{
                                                initial: { x: '-100%' },
                                                hover: { x: '0%' }
                                            }}
                                            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
                                            className="absolute inset-0 bg-gold-500"
                                        />
                                    </motion.button>

                                    <button
                                        onClick={handleShare}
                                        className={`p-4 border rounded-sm transition-all duration-300 ${copied ? 'border-green-500 text-green-500 bg-green-50' : 'border-gray-200 hover:border-gold-500 hover:text-gold-500 hover:bg-gold-50'}`}
                                        title={copied ? "Copied!" : "Share Property"}
                                    >
                                        {copied ? <CheckCheck className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
