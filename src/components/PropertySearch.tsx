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
            className="w-full max-w-5xl mx-auto mt-6 md:mt-12 px-4"
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    boxShadow: [
                        "0 0 0 1px rgba(212, 175, 55, 0.35)",
                        "inset 0 1px 0 rgba(212, 175, 55, 0.20)",
                        "inset 0 -1px 0 rgba(0, 0, 0, 0.40)",
                        "0 25px 60px rgba(0, 0, 0, 0.50)",
                        "0 0 40px rgba(212, 175, 55, 0.06)"
                    ].join(", ")
                }}
                className="bg-[#0a0a0a]/70 backdrop-blur-xl p-1.5 rounded-full border border-[#D4AF37]/25 flex flex-col md:flex-row items-center gap-1 md:gap-0 transition-all duration-500 hover:border-[#D4AF37]/50"
            >
                {/* Search Input */}
                <div className="flex-[1.5] w-full relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-500 z-10">
                        <Search className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <input
                        id="search-query"
                        name="q"
                        type="text"
                        autoComplete="off"
                        placeholder={t.search.placeholder}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none focus:ring-0 text-white placeholder-white/40 font-medium rounded-full transition-all outline-none text-sm md:text-base"
                        value={filters.q}
                        onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
                    />
                </div>

                {/* Divider */}
                <div className="hidden md:block h-6 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent flex-shrink-0" />

                {/* Location Input */}
                <div className="flex-1 w-full relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-500 z-10">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <input
                        id="search-location"
                        name="location"
                        type="text"
                        autoComplete="address-level2"
                        placeholder={t.search.location}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none focus:ring-0 text-white placeholder-white/40 font-medium rounded-full transition-all outline-none text-sm md:text-base"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                </div>

                {/* Divider */}
                <div className="hidden md:block h-6 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent flex-shrink-0" />

                {/* Type Select */}
                <div className="flex-1 w-full relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-500 z-10">
                        <Home className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <select
                        id="search-type"
                        name="type"
                        className="w-full pl-12 pr-10 py-3.5 bg-transparent border-none focus:ring-0 text-white/80 font-semibold appearance-none cursor-pointer rounded-full transition-all outline-none text-sm md:text-base"
                        value={filters.type}
                        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
                    >
                        <option value="all" className="bg-[#111111] text-white">{t.search.types.all}</option>
                        <option value="sale" className="bg-[#111111] text-white">{t.search.types.sale}</option>
                        <option value="luxury" className="bg-[#111111] text-white">{t.search.types.luxury}</option>
                        <option value="rent_long" className="bg-[#111111] text-white">{t.search.types.rent_long}</option>
                        <option value="rent_short" className="bg-[#111111] text-white">{t.search.types.rent_short}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37]/60">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>

                {/* Search Button */}
                <div className="w-full md:w-auto flex-shrink-0 p-0.5">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#E5C158] hover:to-[#D4AF37] text-black px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.18em] text-[10px] md:text-xs transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
                    >
                        {t.search.searchButton}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
