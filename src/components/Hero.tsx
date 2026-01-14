import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                {/* Placeholder for Video or Slider - Using high quality Unsplash image for now */}
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2600&auto=format&fit=crop"
                    alt="Luxury Villa"
                    className="w-full h-full object-cover"
                />
                {/* If video used:
        <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            src="/assets/hero-video.mp4" 
        />
        */}
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-white font-sans text-sm md:text-base tracking-[0.3em] uppercase mb-4">
                        Redefining Luxury Living
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 tracking-tight">
                        Eden Tropical <br />
                        <span className="italic text-gold-400">& Aquamar</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light mb-10">
                        Experience the pinnacle of exclusivity in the Dominican Republic's most prestigious destinations.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-charcoal hover:bg-gold-500 hover:text-white px-8 py-4 uppercase text-sm font-bold tracking-widest transition-colors duration-300"
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
        </div>
    );
};
