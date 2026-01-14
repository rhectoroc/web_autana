import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="/BeachHome.mp4"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // smooth graceful easing
                >
                    <motion.h2
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        animate={{ opacity: 1, letterSpacing: '0.3em' }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="text-white font-sans text-sm md:text-base uppercase mb-6"
                    >
                        Redefining Luxury Living
                    </motion.h2>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-8 tracking-tight flex flex-col items-center">
                        <motion.span
                            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                            className="block"
                        >
                            Autana Group
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                            className="block text-3xl md:text-5xl lg:text-6xl italic text-gold-400 mt-2 font-light"
                        >
                            República Dominicana
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light mb-12"
                    >
                        Experience the pinnacle of exclusivity in the Caribbean's most prestigious destinations.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#D4AF37', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-charcoal px-10 py-4 uppercase text-sm font-bold tracking-widest transition-all duration-300 shadow-xl"
                    >
                        View Properties
                    </motion.button>
                </motion.div>
            </div>
            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest mb-2 opacity-80">Scroll</span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </div>
            </motion.div>
        </div >
    );
};
