import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export const CreateProperty = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        type: 'sale',
        bedrooms: '',
        bathrooms: '',
        description: ''
    });

    // Features state
    const [featureInput, setFeatureInput] = useState('');
    const [features, setFeatures] = useState<string[]>([]);

    // Images state
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handleFeaturesKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && featureInput.trim()) {
            e.preventDefault();
            if (!features.includes(featureInput.trim())) {
                setFeatures([...features, featureInput.trim()]);
            }
            setFeatureInput('');
        }
    };

    const removeFeature = (feature: string) => {
        setFeatures(features.filter(f => f !== feature));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (selectedImages.length + files.length > 12) {
                alert('Maximum 12 images allowed');
                return;
            }

            const newImages = [...selectedImages, ...files];
            setSelectedImages(newImages);

            // Generate previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);

        setSelectedImages(newImages);
        setPreviews(newPreviews);

        // Adjust main image index if needed
        if (mainImageIndex === index) setMainImageIndex(0);
        else if (mainImageIndex > index) setMainImageIndex(mainImageIndex - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Sort images so main image is first
        const sortedImages = [...selectedImages];
        if (mainImageIndex > 0 && mainImageIndex < sortedImages.length) {
            const main = sortedImages[mainImageIndex];
            sortedImages.splice(mainImageIndex, 1);
            sortedImages.unshift(main);
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        data.append('features', JSON.stringify(features));

        sortedImages.forEach((file) => {
            data.append('images', file);
        });

        try {
            await api.post('/properties', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Upload failed', err);
            alert('Failed to create property. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center text-[#D4AF37] hover:text-[#E5C158] mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </button>

                <h1 className="text-3xl font-serif text-[#D4AF37] mb-8">Create New Property</h1>

                <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-800/50 p-8 rounded-xl border border-neutral-700">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Title</label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Location</label>
                            <input
                                required
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Price ($)</label>
                            <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                            >
                                <option value="sale">For Sale</option>
                                <option value="short_term">Short Term Rent</option>
                                <option value="long_term">Long Term Rent</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Bedrooms</label>
                            <input
                                type="number"
                                required
                                value={formData.bedrooms}
                                onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Bathrooms</label>
                            <input
                                type="number"
                                step="0.5"
                                required
                                value={formData.bathrooms}
                                onChange={e => setFormData({ ...formData, bathrooms: e.target.value })}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-300 mb-2">Description</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-gray-300 mb-2">Features (Type and press Enter)</label>
                        <input
                            value={featureInput}
                            onChange={e => setFeatureInput(e.target.value)}
                            onKeyDown={handleFeaturesKeyDown}
                            placeholder="Example: Pool, WiFi, Gym..."
                            className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none"
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {features.map(feat => (
                                <span key={feat} className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-sm flex items-center">
                                    {feat}
                                    <button onClick={() => removeFeature(feat)} className="ml-2 hover:text-white"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-300 mb-2">Images (Max 12 - Drag to Upload)</label>
                        <div className="border-2 border-dashed border-neutral-600 rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-400">Click or drag images here</p>
                        </div>

                        {previews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                {previews.map((src, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={src}
                                            alt={`Preview ${index}`}
                                            className={`w-full h-32 object-cover rounded border-2 ${mainImageIndex === index ? 'border-[#D4AF37]' : 'border-transparent'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMainImageIndex(index)}
                                            className={`absolute bottom-1 left-1 px-2 py-1 text-xs rounded ${mainImageIndex === index ? 'bg-[#D4AF37] text-black' : 'bg-black/70 text-white'}`}
                                        >
                                            {mainImageIndex === index ? 'Main Cover' : 'Set as Main'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-6 border-t border-neutral-700">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#D4AF37] text-black font-bold py-4 rounded hover:bg-[#E5C158] transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating Property...' : 'Create Property'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
