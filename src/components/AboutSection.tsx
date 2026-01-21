import { motion } from 'framer-motion';
import { Home, Calendar, Sun, Building2 } from 'lucide-react';

const services = [
    {
        title: "Venta de propiedades",
        description: "Ofrecemos oportunidades únicas en venta de inmuebles. ¡Descubre tu hogar ideal!",
        icon: Home
    },
    {
        title: "Rentas de largo plazo",
        description: "Tenemos soluciones estables para quienes buscan un hogar permanente.",
        icon: Calendar
    },
    {
        title: "Rentas vacacionales",
        description: "Alternativas únicas para los viajeros que buscan escapar de lo convencional.",
        icon: Sun
    },
    {
        title: "Arrendamientos comerciales",
        description: "Nuestro enfoque se centra en encontrar el espacio ideal que se ajuste a tus requerimientos y presupuesto.",
        icon: Building2
    }
];

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 transform origin-top translate-x-32 z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/AboutUs.PNG"
                                alt="Autana Group Team"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                            {/* Experience Badge */}
                            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur shadow-lg p-6 rounded-lg border-l-4 border-gold-500 max-w-xs">
                                <span className="text-4xl font-bold text-charcoal block mb-1">+10</span>
                                <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">Años de experiencia respaldo y confianza</span>
                            </div>
                        </div>

                        {/* Decorative Dot Grid */}
                        <div className="absolute -bottom-12 -right-12 text-gold-200">
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
                            <span className="text-gold-500 uppercase tracking-widest text-sm font-bold mb-4 block">Sobre Nosotros</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-8 leading-tight">
                                Su socio de confianza en el <span className="text-gold-500 italic">mercado inmobiliario</span>
                            </h2>

                            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    Nos enorgullece ser su socio de confianza en el mercado inmobiliario. Con más de 10 años de experiencia, nuestro compromiso y profundo conocimiento del sector son el respaldo que usted necesita.
                                </p>
                                <p>
                                    Sabemos que su propiedad es una inversión valiosa. Por ello, no solo le ofrecemos asesoramiento experto en la compra, venta o alquiler de inmuebles, sino que también brindamos un servicio integral diseñado para realzar y preservar su valor a largo plazo.
                                </p>
                                <p className="font-medium text-charcoal border-l-2 border-gold-500 pl-4 italic">
                                    En cada paso, nuestra dedicación a la excelencia, la transparencia y la satisfacción del cliente es innegociable.
                                </p>
                            </div>
                        </motion.div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                    className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold-100 group"
                                >
                                    <div className="bg-white p-3 rounded-full w-fit shadow-sm mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                                        <service.icon className="w-6 h-6 text-gold-500 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="font-serif text-charcoal text-lg font-bold mb-2 group-hover:text-gold-500 transition-colors">{service.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
