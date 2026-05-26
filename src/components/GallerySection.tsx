import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

import { useTranslation } from '../store/useLanguageStore';

export const GallerySection = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { t } = useTranslation();

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev! - 1));
        }
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev! + 1));
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex]);

    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedIndex]);

    const galleryImages = [
        { src: '/gallery/beach.webp', alt: t.gallery.images.beach, span: 'md:col-span-2 md:row-span-1' },
        { src: '/gallery/comunes01.webp', alt: t.gallery.images.common, span: 'md:col-span-1 md:row-span-1' },
        { src: '/gallery/beach01.webp', alt: t.gallery.images.coastal, span: 'md:col-span-1 md:row-span-1' },
        { src: '/gallery/tenis.webp', alt: t.gallery.images.sports, span: 'md:col-span-1 md:row-span-2' },
        { src: '/gallery/after03.webp', alt: t.gallery.images.sunset, span: 'md:col-span-1 md:row-span-1' },
        { src: '/gallery/fauna.webp', alt: t.gallery.images.wildlife, span: 'md:col-span-1 md:row-span-1' },
        { src: '/gallery/beach02.webp', alt: t.gallery.images.ocean, span: 'md:col-span-1 md:row-span-1' },
        { src: '/gallery/imagen01.webp', alt: t.gallery.images.arch, span: 'md:col-span-2 md:row-span-1' },
        { src: '/gallery/muelle01.webp', alt: t.gallery.images.pier, span: 'md:col-span-1 md:row-span-1' },
    ];

    return (
        <section id="gallery" className="py-24 bg-[#0a0a0a]/85 backdrop-blur-md text-white relative overflow-hidden">
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

            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold"
                    >
                        {t.gallery.label}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-serif mt-4"
                    >
                        {t.gallery.title} <span className="text-gold-500 italic">{t.gallery.highlight}</span>
                    </motion.h2>
                </div>

                {/* Innovative Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
                    {galleryImages.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`relative group overflow-hidden rounded-xl cursor-pointer ${item.span}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <motion.img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                                loading="lazy"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-white/10 p-4 rounded-full border border-white/30 backdrop-blur-sm"
                                >
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </motion.div>
                            </div>

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                <p className="text-white font-serif text-lg">{item.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {createPortal(
                <AnimatePresence>
                    {selectedIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
                            onClick={() => setSelectedIndex(null)}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-6 right-6 z-[110] text-white/60 hover:text-white transition-all p-2.5 bg-white/10 hover:bg-white/20 active:scale-90 rounded-full shadow-lg"
                                onClick={() => setSelectedIndex(null)}
                                aria-label="Close gallery"
                            >
                                <X className="w-6 h-6 md:w-8 md:h-8" />
                            </button>

                            {/* Navigation Chevrons */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 md:left-8 z-[110] bg-black/50 hover:bg-gold-500/80 text-white p-3 rounded-full border border-white/10 hover:border-gold-500 transition-all shadow-lg active:scale-95"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 md:right-8 z-[110] bg-black/50 hover:bg-gold-500/80 text-white p-3 rounded-full border border-white/10 hover:border-gold-500 transition-all shadow-lg active:scale-95"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                            </button>

                            {/* Centered Lightbox Container */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                                className="relative max-w-5xl max-h-[80vh] w-full mx-auto rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative flex items-center justify-center w-full">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={selectedIndex}
                                            src={galleryImages[selectedIndex].src}
                                            alt={galleryImages[selectedIndex].alt}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            transition={{ duration: 0.2 }}
                                            className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-md select-none pointer-events-none"
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Label */}
                                <div className="mt-4 text-center px-4">
                                    <h3 className="text-white font-serif text-xl md:text-2xl drop-shadow-md">
                                        {galleryImages[selectedIndex].alt}
                                    </h3>
                                    <p className="text-gray-400 text-xs md:text-sm mt-1 uppercase tracking-wider">
                                        {selectedIndex + 1} / {galleryImages.length}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};
