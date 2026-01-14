import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { mockProperties } from '../data/mockProperties';
import { MapPin, Bed, Bath, Maximize, Car, ArrowLeft, Check, Play, Share2, Heart } from 'lucide-react';
import { formatCurrency } from '../utils/format';

export const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const property = mockProperties.find(p => p.id === id);
    const [activeMedia, setActiveMedia] = useState(property?.media[0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-off-white">
                <div className="text-center">
                    <h2 className="text-2xl font-serif text-charcoal mb-4">Property Not Found</h2>
                    <Link to="/" className="text-gold-500 hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-off-white font-sans text-gray-800">
            <Navbar />

            {/* Hero Media Section */}
            <div className="relative h-[60vh] md:h-[80vh] bg-black">
                {activeMedia?.type === 'video' ? (
                    <video
                        src={activeMedia.url}
                        className="w-full h-full object-cover opacity-90"
                        controls
                        autoPlay
                    />
                ) : (
                    <img
                        src={activeMedia?.url || property.media[0].url}
                        alt={property.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                )}

                <div className="absolute top-24 left-4 md:left-8 z-20">
                    <Link to="/" className="flex items-center text-white/80 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
                    </Link>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="bg-charcoal py-4 px-4 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 max-w-7xl mx-auto">
                    {property.media.map((media) => (
                        <button
                            key={media.id}
                            onClick={() => setActiveMedia(media)}
                            className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeMedia?.id === media.id ? 'border-gold-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            {media.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <Play className="w-6 h-6 text-white" />
                                </div>
                            )}
                            <img
                                src={media.type === 'video' ? property.media.find(m => m.type === 'image')?.url : media.url}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center text-gold-500 uppercase tracking-widest text-xs font-bold mb-2">
                                    <span className="bg-gold-500/10 px-3 py-1 rounded inline-block">
                                        {property.type.replace('_', ' ')}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-serif text-charcoal mb-2">{property.title}</h1>
                                <div className="flex items-center text-gray-500">
                                    <MapPin className="w-5 h-5 mr-2 text-gold-500" />
                                    {property.location}
                                </div>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-gray-100 py-8 mb-8">
                            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                                <Bed className="w-6 h-6 text-gold-500 mb-2" />
                                <span className="text-xl font-bold text-charcoal">{property.bedrooms}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Bedrooms</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                                <Bath className="w-6 h-6 text-gold-500 mb-2" />
                                <span className="text-xl font-bold text-charcoal">{property.bathrooms}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Bathrooms</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                                <Maximize className="w-6 h-6 text-gold-500 mb-2" />
                                <span className="text-xl font-bold text-charcoal">{property.area_sqm}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">SQ Meters</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                                <Car className="w-6 h-6 text-gold-500 mb-2" />
                                <span className="text-xl font-bold text-charcoal">{property.parking_spots}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Parking</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-serif text-charcoal mb-4">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {property.description}
                                <br /><br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-serif text-charcoal mb-6">Amenities & Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {property.amenities?.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                                        <Check className="w-5 h-5 text-gold-500 mr-3" />
                                        {amenity}
                                    </div>
                                ))}
                                {/* Mock generic amenities to fill the list */}
                                {['High Speed Internet', 'Air Conditioning', 'Modern Kitchen', 'Concierge Service'].map((item, i) => (
                                    <div key={`extra-${i}`} className="flex items-center text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                                        <Check className="w-5 h-5 text-gold-500 mr-3" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map (Placeholder) */}
                        <div className="bg-gray-200 h-64 md:h-96 rounded-xl flex items-center justify-center relative overflow-hidden group">
                            <iframe
                                title="map"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                src="https://maps.google.com/maps?q=Dominican%20Republic&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            ></iframe>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center">
                                    <MapPin className="text-gold-500 mr-2" />
                                    <span className="font-bold text-charcoal">View on Map</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            {/* Price Card */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gold-500">
                                <div className="mb-6">
                                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Price</p>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-serif text-charcoal font-bold">
                                            {formatCurrency(property.price)}
                                        </span>
                                        {property.type.includes('rent') && <span className="text-gray-500 ml-2">/month</span>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-sm uppercase tracking-widest transition-colors shadow-lg shadow-gold-500/30">
                                        Schedule Viewing
                                    </button>
                                    <button className="w-full border border-charcoal text-charcoal hover:bg-charcoal hover:text-white font-bold py-4 rounded-sm uppercase tracking-widest transition-colors">
                                        Request Info
                                    </button>
                                </div>

                                <div className="flex justify-center mt-6 space-x-6 text-gray-400">
                                    <button className="flex items-center hover:text-gold-500 transition-colors">
                                        <Share2 className="w-5 h-5 mr-2" /> Share
                                    </button>
                                    <button className="flex items-center hover:text-gold-500 transition-colors">
                                        <Heart className="w-5 h-5 mr-2" /> Save
                                    </button>
                                </div>
                            </div>

                            {/* Agent Card */}
                            <div className="bg-charcoal p-6 rounded-xl text-white">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-xl font-serif font-bold text-white mr-4">
                                        AG
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Autana Group</h4>
                                        <p className="text-gold-500 text-xs uppercase tracking-widest">Luxury Real Estate</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-6">
                                    Contact us directly for a VIP tour of this exclusive property.
                                </p>
                                <p className="text-lg font-serif mb-2">+1 (829) 351-5702</p>
                                <a href="mailto:Ll.es.servicios@gmail.com" className="text-gold-500 hover:text-white transition-colors text-sm">Ll.es.servicios@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
