import React, { useState, useEffect } from 'react';
import { Bed, Bath, Car, Maximize, MapPin, Play } from 'lucide-react';
import type { Property } from '../types/property';
import { formatCurrency, formatArea, getMediaUrl } from '../utils/format';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTranslation } from '../store/useLanguageStore';

interface PropertyCardProps {
    property: Property;
    onClick?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [hasHover, setHasHover] = useState(true);
    const { t, language } = useTranslation();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasHover(window.matchMedia('(hover: hover)').matches);
        }
    }, []);

    const displayTitle = (language === 'en' && property.title_en) ? property.title_en : property.title;
    const displayDescription = (language === 'en' && property.description_en) ? property.description_en : property.description;

    const coverImage = property.media.find(m => m.type === 'image');
    const firstMedia = property.media[0];
    const coverImageUrl = coverImage 
        ? getMediaUrl(coverImage.url) 
        : (firstMedia ? getMediaUrl(firstMedia.url) : 'https://placehold.co/600x400/1a1a1a/D4AF37?text=Autana+Group');
    const hasVideo = property.media.some(m => m.type === 'video');


    const getTypeLabel = (type: Property['type']) => {
        switch (type) {
            case 'sale': return t.properties.tabs.sale;
            case 'luxury': return t.properties.tabs.luxury;
            case 'rent_short': return t.properties.tabs.rent_short;
            case 'rent_long': return t.properties.tabs.rent_long;
            default: return type;
        }
    };

    const getTypeColor = (type: Property['type']) => {
        switch (type) {
            case 'sale': return 'bg-gold-500';
            case 'luxury': return 'bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]';
            default: return 'bg-charcoal';
        }
    };

    return (
        <div 
            className="group relative h-[450px] w-full [perspective:1000px]"
            onMouseEnter={() => hasHover && setIsFlipped(true)}
            onMouseLeave={() => hasHover && setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#050505] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
                    {/* Cover Image */}
                    <div onClick={onClick} className="relative h-64 w-full bg-black/20 overflow-hidden cursor-pointer">
                        <img
                            src={coverImageUrl}
                            alt={property.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent loop
                                target.src = 'https://placehold.co/600x400/1a1a1a/D4AF37?text=Autana+Group';
                            }}
                        />
                        {hasVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20">
                                    <Play className="w-6 h-6 text-gold-500 fill-gold-500 ml-1" />
                                </div>
                            </div>
                        )}

                        {/* Mobile Flip Button - Only visible on touch/mobile */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFlipped(!isFlipped);
                            }}
                            className="absolute top-4 right-4 z-30 md:hidden bg-black/40 backdrop-blur-md border border-white/20 p-2 rounded-full text-white shadow-lg active:scale-90 transition-transform"
                            aria-label="Flip Card"
                        >
                            <Maximize className="w-5 h-5 rotate-45" />
                        </button>

                        {/* Status Badge */}
                        <div className={clsx(
                            "absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider",
                            getTypeColor(property.type)
                        )}>
                            {getTypeLabel(property.type)}
                        </div>

                        {property.status === 'sold' && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <span className="text-white text-3xl font-serif font-bold uppercase tracking-widest border-4 border-white px-6 py-2 transform -rotate-12">
                                    SOLD
                                </span>
                            </div>
                        )}

                        {/* Price Overlay (Bottom Left) */}
                        <div className="absolute bottom-4 left-4 z-10">
                            <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold-500/40">
                                <span className="text-white font-serif text-lg font-medium">
                                    {formatCurrency(property.price)}
                                </span>
                                {property.type.includes('rent') && <span className="text-gray-300 text-xs ml-1">/mo</span>}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div onClick={onClick} className="block p-5 cursor-pointer flex-1 bg-gradient-to-b from-[#D4AF37]/25 via-[#121212] to-[#050505]">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-serif text-xl text-white font-medium line-clamp-1 group-hover:text-gold-500 transition-colors">
                                {displayTitle}
                            </h3>
                        </div>

                        <div className="flex items-center text-gray-400 text-sm mb-4">
                            <MapPin className="w-4 h-4 mr-1 text-gold-500" />
                            <span className="line-clamp-1">{property.location}</span>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/25 to-transparent my-4 group-hover:via-gold-500/50 transition-all duration-300" />

                        {/* Features */}
                        <div className="grid grid-cols-4 gap-1 text-center mt-auto">
                            <div className="flex flex-col items-center justify-center">
                                <Bed className="w-5 h-5 text-gray-500 mb-1 group-hover:text-gold-500 transition-colors" />
                                <span className="text-[10px] text-gray-400 truncate w-full uppercase tracking-wider">{property.bedrooms} {t.properties.details.beds}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <Bath className="w-5 h-5 text-gray-400 mb-1 group-hover:text-gold-500 transition-colors" />
                                <span className="text-[10px] text-gray-400 truncate w-full uppercase tracking-wider">{property.bathrooms} {t.properties.details.baths}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <Maximize className="w-5 h-5 text-gray-400 mb-1 group-hover:text-gold-500 transition-colors" />
                                <span className="text-[10px] text-gray-400 truncate w-full uppercase tracking-wider">{formatArea(property.area_sqm)}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <Car className="w-5 h-5 text-gray-400 mb-1 group-hover:text-gold-500 transition-colors" />
                                <span className="text-[10px] text-gray-400 truncate w-full uppercase tracking-wider">{property.parking_spots || 0} {t.properties.details.parking}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK FACE */}
                <div 
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-neutral-900 rounded-xl p-6 shadow-2xl border-2 border-[#D4AF37]/30 flex flex-col justify-between overflow-hidden"
                >
                    {/* Back Side Flip Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                        }}
                        className="absolute top-4 right-4 z-30 md:hidden bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full text-white active:scale-90 transition-transform"
                        aria-label={language === 'en' ? 'Flip card back' : 'Volver al frente'}
                    >
                        <Maximize className="w-5 h-5 rotate-[-135deg]" />
                    </button>

                    <div className="relative z-10" onClick={onClick}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[#D4AF37] font-serif text-lg font-bold">{formatCurrency(property.price)}</span>
                            <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] px-2 py-1 rounded-full uppercase tracking-widest border border-[#D4AF37]/20 md:mr-0 mr-12">
                                {getTypeLabel(property.type)}
                            </span>
                        </div>
                        
                        <h4 className="text-white font-serif text-xl mb-3">{displayTitle}</h4>
                        <p className="text-gray-400 text-sm line-clamp-6 mb-6 italic leading-relaxed">
                            "{displayDescription}"
                        </p>

                        <div className="space-y-3">
                            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold">Key Features</p>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(property.amenities) ? property.amenities : []).slice(0, 5).map((feat, i) => (
                                    <span key={i} className="bg-white/5 text-gray-300 text-[10px] px-2 py-1 rounded border border-white/10 italic">
                                        {typeof feat === 'string' ? feat : JSON.stringify(feat)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <button 
                            onClick={onClick}
                            className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold py-3 rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            {t.propertyCard.viewDetails}
                            <Maximize className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Decorative Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </motion.div>
        </div>
    );
};
