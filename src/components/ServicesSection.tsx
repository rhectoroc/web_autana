import { Wrench, PaintBucket, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        icon: Briefcase,
        title: 'Full Administration',
        description: 'Comprehensive property management tailored to your needs. We handle tenant relations, financial reporting, legal compliance, and day-to-day operations, ensuring your investment yields maximum returns with zero stress.'
    },
    {
        icon: Wrench,
        title: 'Property Maintenance',
        description: 'Preserve the value and beauty of your property with our proactive maintenance programs. From routine inspections to emergency repairs and professional cleaning, we ensure every corner remains pristine.'
    },
    {
        icon: PaintBucket,
        title: 'Remodeling & Renovations',
        description: 'Unlock your property\'s full potential. Our team of architects and designers delivers high-end remodeling services, creating modern, luxurious spaces that captivate tenants and buyers alike.'
    }
];

export const ServicesSection = () => {
    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold">Elevate Your Experience</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal mt-2">
                        Exclusive Services
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        Beyond buying and selling, Autana Group offers a suite of white-glove services designed to maintain, enhance, and manage your luxury real estate assets.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group p-10 bg-off-white hover:bg-charcoal transition-colors duration-500 rounded-sm border border-transparent hover:border-gold-500/30 shadow-sm hover:shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <service.icon className="w-24 h-24 text-gold-500" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 shadow-md group-hover:scale-110">
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-serif text-charcoal group-hover:text-white mb-4 transition-colors duration-500">
                                    {service.title}
                                </h3>
                                <div className="h-0.5 w-12 bg-gold-500 mb-6 group-hover:w-full transition-all duration-500"></div>
                                <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
