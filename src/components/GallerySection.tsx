import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const galleryItems = [
    {
        id: 1,
        src: '/gallery/luxury-pool.png',
        alt: 'Infinity Pool Sunset',
        category: 'Relaxation',
        title: 'Infinity Horizons',
        description: 'Immerse yourself in crystal clear waters merging with the Caribbean sky.',
        className: 'md:col-span-8 md:row-span-1'
    },
    {
        id: 2,
        src: '/gallery/tropical-garden.png',
        alt: 'Lush Tropical Garden',
        category: 'Nature',
        title: 'Tropical Sanctuary',
        description: 'Find peace walking through manicured rainforest gardens.',
        className: 'md:col-span-4 md:row-span-1'
    },
    {
        id: 3,
        src: '/gallery/beach-landscape.jpg',
        alt: 'Pristine Beach',
        category: 'Location',
        title: 'Pristine Shores',
        description: 'Miles of white sand and turquoise waters at your doorstep.',
        className: 'md:col-span-5 md:row-span-1'
    },
    {
        id: 4,
        src: '/gallery/modern-interior.png',
        alt: 'Modern Living Room',
        category: 'Design',
        title: 'Elegant Interiors',
        description: 'Sophisticated open-plan living designed for the tropics.',
        className: 'md:col-span-7 md:row-span-1'
    }
];

export const GallerySection = () => {
    return (
        <section id="gallery" className="py-24 bg-charcoal text-white relative overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold-500 uppercase tracking-widest text-sm font-bold block mb-4">
                            The Autana Experience
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                            Curated <span className="italic text-gray-400">Luxury</span> <br />
                            Living
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 max-w-sm mt-6 md:mt-0 text-sm leading-relaxed"
                    >
                        Every detail is designed to inspire. Explore the essence of our properties, where modern architecture meets the raw beauty of the Dominican Republic.
                    </motion.p>
                </div>

                {/* Mosaic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] md:auto-rows-[400px] gap-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-sm cursor-pointer ${item.className}`}
                        >
                            {/* Image */}
                            <div className="w-full h-full overflow-hidden">
                                <motion.img
                                    src={item.src}
                                    alt={item.alt}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.7, ease: 'easeOut' }}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />

                            {/* Hover Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                                        {item.category}
                                    </span>
                                    <div className="flex justify-between items-end border-t border-white/20 pt-4 mt-2">
                                        <div>
                                            <h3 className="text-2xl font-serif text-white mb-1">{item.title}</h3>
                                            <p className="text-gray-300 text-sm max-w-xs">{item.description}</p>
                                        </div>
                                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-md">
                                            <ArrowUpRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Always visible minimal title (optional, fades out on hover) */}
                            <div className="absolute top-6 right-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                <span className="text-white/80 text-xs font-bold uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                                    {item.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
