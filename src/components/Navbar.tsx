import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingModal } from './BookingModal';
import { useTranslation } from '../store/useLanguageStore';
import { Globe } from 'lucide-react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { t, language, toggleLanguage } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.navbar.properties, href: '#properties' },
        { name: t.navbar.services, href: '#services' },
        { name: t.navbar.gallery, href: '#gallery' },
        { name: t.navbar.about, href: '#about' },
    ];

    return (
        <>
            <nav
                className={clsx(
                    'fixed w-full z-50 transition-all duration-500 ease-in-out',
                    isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-4'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            {/* Text Logo for now, replace with Image if provided */}
                            <a href="/" className="group block">
                                <img
                                    src="/logo/logoOriginal.png"
                                    alt="Autana Group"
                                    className="h-14 w-auto object-contain transition-all duration-300"
                                />
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={clsx(
                                        'text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-gold-500',
                                        isScrolled ? 'text-charcoal' : 'text-white'
                                    )}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center space-x-6">

                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className={clsx(
                                    "flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors duration-300 p-2",
                                    isScrolled ? "text-charcoal hover:text-gold-500" : "text-white hover:text-gold-400"
                                )}
                            >
                                <Globe className="w-4 h-4" />
                                <span>{language === 'en' ? 'ES' : 'EN'}</span>
                            </button>

                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2.5 rounded-sm uppercase text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
                            >
                                {t.navbar.bookNow}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={clsx(
                                    "p-2 rounded-md transition-colors",
                                    isScrolled ? "text-charcoal" : "text-white"
                                )}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-2xl md:hidden flex flex-col pt-24 px-8 pb-12"
                        >
                            <div className="flex flex-col gap-8 text-center">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="text-3xl font-serif text-white hover:text-gold-500 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-auto space-y-8">
                                <div className="flex items-center justify-center gap-12">
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        onClick={() => {
                                            toggleLanguage();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex flex-col items-center gap-2 text-gold-500"
                                    >
                                        <Globe className="w-8 h-8" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{language === 'en' ? 'ESPAÑOL' : 'ENGLISH'}</span>
                                    </motion.button>

                                </div>

                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsBookingModalOpen(true);
                                    }}
                                    className="w-full bg-gold-500 text-white py-5 rounded-full uppercase text-xs font-bold tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
                                >
                                    {t.navbar.bookNow}
                                </motion.button>
                            </div>

                            {/* Close Button Inside Menu */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-10 h-10" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav >

            <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
        </>
    );
};
