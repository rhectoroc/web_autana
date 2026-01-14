import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { useRef, useEffect } from 'react';

const galleryItems = [
    {
        id: 1,
        type: 'image',
        src: '/gallery/beach-landscape.jpg',
        alt: 'Pristine Beaches',
        size: 'col-span-1 md:col-span-2 row-span-2',
        title: 'Pristine Shores'
    },
    {
        id: 2,
        type: 'video',
        src: '/gallery/palms-wind.mp4',
        alt: 'Wonders of Nature',
        size: 'col-span-1 row-span-1',
        title: 'Wonders of Nature'
    },
    {
        id: 3,
        type: 'image',
        src: '/gallery/fauna.jpg',
        alt: 'Exotic Fauna',
        size: 'col-span-1 row-span-1',
        title: 'Exotic Fauna'
    },
    {
        id: 4,
        type: 'image',
        src: '/gallery/lifestyle.jpg',
        alt: 'Exclusive Lifestyle',
        size: 'col-span-1 md:col-span-2 row-span-1',
        title: 'Exclusive Lifestyle'
    },
    {
        id: 5,
        type: 'video',
        src: '/gallery/drone-beach.mp4',
        alt: 'Aerial Views',
        size: 'col-span-1 md:col-span-2 row-span-1',
        title: 'Breathtaking Views'
    },
];

const GalleryItem = ({ item }: { item: typeof galleryItems[0] }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null); // Ref for interaction observer
    const isInView = useInView(containerRef, { margin: "0px 0px -50px 0px", amount: 0.5 }); // Play when 50% visible

    useEffect(() => {
        if (item.type === 'video' && videoRef.current) {
            if (isInView) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Auto-play prevented", error);
                    });
                }
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView, item.type]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className={`relative group overflow-hidden rounded-sm cursor-pointer ${item.size} h-64 md:h-auto min-h-[250px]`}
        >
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-colors duration-500 z-10" />

            {item.type === 'video' ? (
                <div className="w-full h-full relative">
                    <video
                        ref={videoRef}
                        src={item.src}
                        muted
                        loop
                        playsInline
                        preload="metadata" // Only load metadata initially
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 z-20">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                            <Play className="w-3 h-3 text-white fill-white" />
                        </div>
                    </div>
                </div>
            ) : (
                <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy" // Lazy load images too
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            )}

            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Discover</p>
                <h3 className="text-white text-xl font-serif">{item.title}</h3>
            </div>
        </motion.div>
    );
};

export const GallerySection = () => {
    const containerRef = useRef(null);

    return (
        <section id="gallery" className="py-24 bg-charcoal text-white relative overflow-hidden" ref={containerRef}>
            {/* Animated Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Gold Orb - More visible */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        opacity: [0.4, 0.6, 0.4] // Increased from 0.1/0.2
                    }}
                    transition={{
                        duration: 8, // Faster from 15s
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-gold-400 rounded-full blur-[80px] mix-blend-screen" // Reduced blur from 120px
                />

                {/* Cyan/Blue Orb - More vibrant */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        opacity: [0.3, 0.5, 0.3] // Increased from 0.05/0.15
                    }}
                    transition={{
                        duration: 10, // Faster from 20s
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute top-[10%] -right-[10%] w-[45vw] h-[45vw] bg-cyan-600 rounded-full blur-[90px] mix-blend-screen" // Reduced blur from 100px
                />

                {/* Bottom Gold Shine - Intense */}
                <motion.div
                    animate={{
                        y: [0, -50, 0],
                        opacity: [0.3, 0.5, 0.3] // Increased from 0.05/0.1
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[40vw] bg-gold-500 rounded-full blur-[100px] opacity-40 mix-blend-screen"
                />
            </div>

            {/* Parallax Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-gold-500 uppercase tracking-widest text-sm font-bold"
                        >
                            The Punta Cana Experience
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif mt-4 leading-tight"
                        >
                            Where Nature Meets <br />
                            <span className="italic text-gray-400">Pure Luxury</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-md text-sm leading-relaxed mb-2"
                    >
                        Immerse yourself in the breathtaking landscapes of the Dominican Republic. From azure waters to lush tropical flora, discover the paradise that surrounds your new home.
                    </motion.p>
                </div>

                {/* Bento Grid Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[800px]">
                    {galleryItems.map((item) => (
                        <GalleryItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Decorative Elements */}
            </div>
        </section>
    );
};
