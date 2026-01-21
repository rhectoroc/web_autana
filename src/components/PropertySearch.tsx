import { useState } from 'react';
import { Search, MapPin, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFilters {
    q: string;
    location: string;
    type: 'all' | 'sale' | 'rent_long' | 'rent_short';
}

interface PropertySearchProps {
    onSearch: (filters: SearchFilters) => void;
}

export const PropertySearch = ({ onSearch }: PropertySearchProps) => {
    const [filters, setFilters] = useState<SearchFilters>({
        q: '',
        location: '',
        type: 'all'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(filters);
        // Scroll to properties section
        const element = document.getElementById('properties');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="w-full max-w-4xl mx-auto mt-12 px-4"
        >
            <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/20 flex flex-col md:flex-row items-center gap-2">

                {/* Search Input */}
                <div className="flex-1 w-full relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-charcoal placeholder-gray-400 font-medium rounded-full hover:bg-gray-50/50 transition-colors"
                        value={filters.q}
                        onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
                    />
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block" />

                {/* Location Input */}
                <div className="flex-1 w-full relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Location (e.g. Punta Cana)"
                        className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-charcoal placeholder-gray-400 font-medium rounded-full hover:bg-gray-50/50 transition-colors"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block" />

                {/* Type Select */}
                <div className="w-full md:w-48 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500">
                        <Home className="w-5 h-5" />
                    </div>
                    <select
                        className="w-full pl-12 pr-8 py-3 bg-transparent border-none focus:ring-0 text-charcoal font-medium appearance-none cursor-pointer rounded-full hover:bg-gray-50/50 transition-colors"
                        value={filters.type}
                        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
                    >
                        <option value="all">All Types</option>
                        <option value="sale">Buy</option>
                        <option value="rent_long">Rent (Long)</option>
                        <option value="rent_short">Rent (Short)</option>
                    </select>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="w-full md:w-auto bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
                >
                    Search
                </button>
            </form>
        </motion.div>
    );
};
