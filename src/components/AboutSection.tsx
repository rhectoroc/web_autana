import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Sun, Building2 } from 'lucide-react';
import { useTranslation } from '../store/useLanguageStore';

export const AboutSection = () => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    const services = [
        {
            title: t.about.services.sales.title,
            description: t.about.services.sales.desc,
            icon: Home
        },
        {
            title: t.about.services.rentals.title,
            description: t.about.services.rentals.desc,
            icon: Calendar
        },
        {
            title: t.about.services.vacation.title,
            description: t.about.services.vacation.desc,
            icon: Sun
        },
        {
            title: t.about.services.commercial.title,
            description: t.about.services.commercial.desc,
            icon: Building2
        }
    ];
    return (
        <section id="about" className="py-24 relative overflow-hidden bg-[#0a0a0a]/85 backdrop-blur-md">
            {/* Fixed Background Image with Dark Transparency */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'url("/Fondo AutanaGroup.svg")',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                />
                {/* Dark Overlay to harmonize with Hero */}
                <div className="absolute inset-0 bg-[#0a0a0a]/40" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div
                            className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Image */}
                            <motion.img
                                src="/AboutUsNew.svg"
                                alt="Autana Group Team"
                                className="w-full h-auto object-cover"
                                animate={{ scale: isHovered ? 1.07 : 1 }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                            />

                            {/* Base Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                            {/* ── Image Overlay Reveal — Centered Card ── */}
                            <AnimatePresence>
                                {isHovered && (
                                    /* Dim backdrop covering the whole image */
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{ background: 'rgba(0,0,0,0.25)' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.35, ease: 'easeOut' }}
                                    >
                                        {/* Glassmorphism card — centered rectangle */}
                                        <motion.div
                                            className="flex flex-col items-center justify-center px-12 py-14 mx-8"
                                            style={{
                                                backdropFilter: 'blur(24px)',
                                                WebkitBackdropFilter: 'blur(24px)',
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                                                border: '1px solid rgba(255,255,255,0.3)',
                                                borderRadius: '30px',
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                                minWidth: '300px',
                                                maxWidth: '85%',
                                            }}
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 30, scale: 0.95 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            {/* + 10 — The Hero Number */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <h2 
                                                    style={{
                                                        fontFamily: '"Playfair Display", serif',
                                                        fontSize: 'clamp(4rem, 8vw, 6rem)',
                                                        fontWeight: 700,
                                                        lineHeight: 1,
                                                        background: 'linear-gradient(180deg, #FFFFFF 0%, #D4AF37 100%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                                                        marginBottom: '0.5rem'
                                                    }}
                                                >
                                                    {t.about.overlay.number}
                                                </h2>
                                            </motion.div>

                                            {/* Tagline — "Years of Experience & Trust" / "Años de Experiencia y Confianza" */}
                                            <motion.p
                                                style={{
                                                    fontFamily: '"Inter", sans-serif',
                                                    fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                                                    fontWeight: 500,
                                                    textAlign: 'center',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.4em',
                                                    color: 'rgba(255,255,255,0.85)',
                                                    maxWidth: '80%',
                                                    lineHeight: 1.6
                                                }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                            >
                                                {t.about.overlay.tagline}
                                            </motion.p>

                                            {/* Golden line inferior — Ultra-thin & Glow */}
                                            <motion.div
                                                style={{
                                                    height: '1px',
                                                    width: '30%',
                                                    background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                                                    marginTop: '2.5rem',
                                                }}
                                                initial={{ scaleX: 0, opacity: 0 }}
                                                animate={{ scaleX: 1, opacity: 1 }}
                                                exit={{ scaleX: 0, opacity: 0 }}
                                                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                                            />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Decorative Dot Grid */}
                        <div className="absolute -bottom-12 -right-12 text-gold-200/20">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="2" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#dots)" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="text-gold-500 uppercase tracking-widest text-sm font-bold mb-4 block">{t.about.label}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                                Autana Group <span className="text-gold-500 italic">{t.about.title}</span>
                            </h2>

                            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                                <p>
                                    {t.about.p1}
                                </p>
                                <p>
                                    {t.about.p2}
                                </p>
                                <p className="font-medium text-white border-l-2 border-gold-500 pl-4 italic">
                                    {t.about.p3}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Services Grid - Single Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                            className="bg-white/5 p-6 rounded-xl hover:bg-white/10 hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-gold-500/30 group text-center lg:text-left backdrop-blur-sm"
                        >
                            <div className="bg-white/10 p-3 rounded-full w-fit shadow-sm mb-4 mx-auto lg:mx-0 group-hover:bg-gold-500 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-gold-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="font-serif text-white text-lg font-bold mb-2 group-hover:text-gold-500 transition-colors">{service.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
