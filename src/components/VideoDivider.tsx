import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '../store/useLanguageStore';

export const VideoDivider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 3D Transform Effects - Optimized for mobile (disabled rotateX on small screens)
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    // Smooth fade in/out
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <section ref={containerRef} className="relative h-[50vh] md:h-[70vh] bg-charcoal font-sans overflow-hidden perspective-1000">
            <motion.div
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    scale,
                    opacity
                }}
                className="w-full h-full relative transform-style-3d shadow-2xl origin-center will-change-transform"
            >
                <video
                    className="absolute inset-0 w-full h-full object-cover rounded-sm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/gallery/beach.jpg" // Using an existing image as poster
                >
                    <source src="/Manta.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="bg-black/20 p-8 border border-white/10 rounded-xl shadow-lg backdrop-blur-[2px]"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-2 tracking-wide drop-shadow-lg">
                            Autana Group <span className="text-gold-500 italic">{t.video.title}</span>
                        </h2>
                        <div className="h-1 w-24 bg-gold-500 mx-auto rounded-full shadow-[0_0_10px_rgba(191,149,63,0.8)]" />
                    </motion.div>
                </div>

                {/* Subtle Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10 opacity-30" />
            </motion.div>
        </section>
    );
};
