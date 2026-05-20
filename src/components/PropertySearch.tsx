import { useState } from 'react';
import { Search, MapPin, Home, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../store/useLanguageStore';

interface SearchFilters {
    q: string;
    location: string;
    type: 'all' | 'sale' | 'rent_long' | 'rent_short' | 'luxury';
}

interface PropertySearchProps {
    onSearch: (filters: SearchFilters) => void;
}

export const PropertySearch = ({ onSearch }: PropertySearchProps) => {
    const { t } = useTranslation();
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
            className="w-full max-w-6xl mx-auto mt-6 md:mt-12 px-4"
        >
            <form 
                onSubmit={handleSubmit} 
                className="bg-white/20 md:bg-white/90 backdrop-blur-md md:backdrop-blur-xl p-1 md:p-2 rounded-2xl md:rounded-full shadow-xl md:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 md:border-white/20 flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-all duration-500 hover:shadow-2xl"
            >
                {/* Search Input */}
                <div className="flex-[1.5] w-full relative group p-0">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 z-10">
                        <Search className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <input
                        id="search-query"
                        name="q"
                        type="text"
                        autoComplete="off"
                        placeholder={t.search.placeholder}
                        className="w-full pl-12 pr-4 py-3 md:py-3 bg-transparent border-none focus:ring-0 text-white md:text-charcoal placeholder-white/60 md:placeholder-gray-400 font-medium rounded-xl md:rounded-full transition-all outline-none text-sm md:text-base"
                        value={filters.q}
                        onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
                    />
                </div>

                <div className="hidden md:block h-8 w-px bg-gray-200" />

                {/* Location Input */}
                <div className="flex-1 w-full relative group p-0">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 z-10">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <input
                        id="search-location"
                        name="location"
                        type="text"
                        autoComplete="address-level2"
                        placeholder={t.search.location}
                        className="w-full pl-12 pr-4 py-3 md:py-3 bg-transparent border-none focus:ring-0 text-white md:text-charcoal placeholder-white/60 md:placeholder-gray-400 font-medium rounded-xl md:rounded-full transition-all outline-none text-sm md:text-base"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                </div>

                <div className="hidden md:block h-8 w-px bg-gray-200" />

                {/* Type Select */}
                <div className="flex-1 w-full relative group p-0">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 z-10">
                        <Home className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <select
                        id="search-type"
                        name="type"
                        className="w-full pl-12 pr-10 py-3 md:py-3 bg-transparent border-none focus:ring-0 text-white md:text-charcoal font-semibold appearance-none cursor-pointer rounded-xl md:rounded-full transition-all outline-none text-sm md:text-base"
                        value={filters.type}
                        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
                    >
                        <option value="all" className="text-black">{t.search.types.all}</option>
                        <option value="sale" className="text-black">{t.search.types.sale}</option>
                        <option value="luxury" className="text-black">{t.search.types.luxury}</option>
                        <option value="rent_long" className="text-black">{t.search.types.rent_long}</option>
                        <option value="rent_short" className="text-black">{t.search.types.rent_short}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60 md:text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>

                {/* Search Button */}
                <div className="w-full md:w-auto p-0">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-3 rounded-xl md:rounded-full font-bold uppercase tracking-[0.15em] text-[10px] md:text-xs transition-all duration-300 shadow-xl hover:shadow-gold-500/40"
                    >
                        {t.search.searchButton}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
