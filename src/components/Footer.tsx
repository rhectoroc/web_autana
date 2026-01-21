import { Facebook, Instagram, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-charcoal text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <a href="/" className="block mb-6">
                            <img
                                src="/logo/logoOriginal.png"
                                alt="Autana Group"
                                className="h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Premier real estate services in the Dominican Republic. We curate exclusive lifestyles and investment opportunities.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/autana.group/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.facebook.com/AutanaGroup" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=18293515702&text=Saludos%2C%20necesito%20m%C3%A1s%20informaci%C3%B3n%20sobre%20una%20propiedad." target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg mb-6 text-gold-500">Explore</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Properties for Sale</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Vacation Rentals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">New Developments</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Property Management</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg mb-6 text-gold-500">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 text-gold-500 flex-shrink-0" />
                                <span>Calle principal de Villas Bávaro<br />La Altagracia, RD 23301</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 mr-3 text-gold-500 flex-shrink-0" />
                                <span>+1 (829) 351-5702</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 text-gold-500 flex-shrink-0" />
                                <span>Ll.es.servicios@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-lg mb-6 text-gold-500">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for the latest updates and exclusive offers.</p>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                                aria-label="Email address"
                            />
                            <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-3 uppercase text-xs font-bold tracking-widest transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p>&copy; {new Date().getFullYear()} Autana Group RD. All rights reserved.</p>
                        <div className="flex space-x-6">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-center md:text-right">
                        <p>
                            Developed by{' '}
                            <a href="http://adrielssystems.com" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-white transition-colors">
                                Adriel's Systems
                            </a>{' '}
                            | The Engine of Your Global Software Solutions
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
