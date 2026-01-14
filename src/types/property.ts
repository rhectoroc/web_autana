export interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    type: 'short_term' | 'long_term' | 'sale';
    bedrooms: number;
    bathrooms: number;
    description: string;
    features: string[];
    images: { id: number; image_url: string; is_main: boolean }[];
}
