import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PropertySearch } from './PropertySearch';
import { useTranslation } from '../store/useLanguageStore';

const heroImages = [
    '/hero/20240618_065649.jpg',
    '/hero/20240619_064841.jpg',
    '/hero/20250514_064439.jpg'
];

interface HeroProps {
    onSearch?: (filters: any) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        // Efficient Image Preloading: Only preload on desktop/tablet to save data on mobile
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
            heroImages.forEach((src) => {
                const img = new Image();
                img.src = src;
            });
        }

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen h-[100dvh] w-full overflow-hidden">
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" /> {/* Slightly darker overlay for better mobile contrast */}
                <AnimatePresence mode='popLayout'>
                    <motion.img
                        key={currentIndex}
                        src={heroImages[currentIndex]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                        alt="Hero Background"
                    />
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-7xl pt-10 md:pt-0"
                >
                    <motion.h2
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        animate={{ opacity: 1, letterSpacing: window.innerWidth < 768 ? '0.2em' : '0.4em' }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="text-gold-400 font-sans text-[10px] md:text-base uppercase mb-4 md:mb-6 tracking-[0.2em] md:tracking-[0.4em] font-bold"
                    >
                        {t.hero.subtitle}
                    </motion.h2>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-6 md:mb-8 tracking-tight drop-shadow-2xl">
                        <motion.span
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(8px)',
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                                backgroundPosition: ['0% 50%', '200% 50%']
                            }}
                            transition={{
                                opacity: { duration: 0.8, delay: 0.2 },
                                y: { duration: 0.8, delay: 0.2 },
                                filter: { duration: 0.8, delay: 0.2 },
                                backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
                            }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] bg-[length:200%_auto] leading-[1.1]"
                        >
                            {t.hero.title}
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-gray-300 text-sm md:text-xl max-w-xl md:max-w-2xl mx-auto font-light mb-8 md:mb-12 leading-relaxed"
                    >
                        {t.hero.description}
                    </motion.p>

                    {/* Search Bar Container - Added extra padding for mobile thumb reach */}
                    <div className="w-full max-w-5xl mx-auto px-2 md:px-0">
                        {onSearch && <PropertySearch onSearch={onSearch} />}
                    </div>

                </motion.div>
            </div>

            {/* Scroll Indicator - Hidden on very small screens to avoid overlap */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white cursor-pointer hidden sm:block"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest mb-2 opacity-60 font-medium">{t.hero.scroll}</span>
                    <ChevronDown className="w-5 h-5 text-gold-500 animate-bounce" />
                </div>
            </motion.div>
        </div>
    );
};
