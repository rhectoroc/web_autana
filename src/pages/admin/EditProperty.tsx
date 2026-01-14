import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, ArrowLeft, Loader } from 'lucide-react';
import api from '../../services/api';

export const EditProperty = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        type: 'sale',
        status: 'available',
        bedrooms: '',
        bathrooms: '',
        description: ''
    });

    // Features state
    const [featureInput, setFeatureInput] = useState('');
    const [features, setFeatures] = useState<string[]>([]);

    // Images state
    const [existingImages, setExistingImages] = useState<{ id: string | number, image_url: string, is_main: boolean }[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const res = await api.get(`/properties/${id}`);
            const p = res.data;
            setFormData({
                title: p.title,
                location: p.location,
                price: p.price,
                type: p.type,
                status: p.status || 'available',
                bedrooms: p.bedrooms,
                bathrooms: p.bathrooms,
                description: p.description
            });
            setFeatures(Array.isArray(p.features) ? p.features : JSON.parse(p.features || '[]'));
            setExistingImages(p.images || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch property', err);
            alert('Failed to load property details');
            navigate('/admin/dashboard');
        }
    };

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
            const totalImages = existingImages.length + newImages.length + files.length;
            if (totalImages > 12) {
                alert('Maximum 12 images allowed');
                return;
            }

            const incomingImages = [...newImages, ...files];
            setNewImages(incomingImages);

            // Generate previews
            const incomingPreviews = files.map(file => URL.createObjectURL(file));
            setNewPreviews([...newPreviews, ...incomingPreviews]);
        }
    };

    const removeExistingImage = (imageId: string | number) => {
        setExistingImages(existingImages.filter(img => img.id !== imageId));
    };

    const removeNewImage = (index: number) => {
        const updatedImages = newImages.filter((_, i) => i !== index);
        const updatedPreviews = newPreviews.filter((_, i) => i !== index);
        setNewImages(updatedImages);
        setNewPreviews(updatedPreviews);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        data.append('features', JSON.stringify(features));

        // Append IDs of existing images to keep
        if (existingImages.length > 0) {
            existingImages.forEach(img => {
                data.append('existingImages', String(img.id));
            });
        }

        // Append new images
        newImages.forEach((file) => {
            data.append('images', file);
        });

        try {
            await api.put(`/properties/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update property. Check console.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-[#D4AF37]"><Loader className="animate-spin w-10 h-10" /></div>;

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

                <h1 className="text-3xl font-serif text-[#D4AF37] mb-8">Edit Property</h1>

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
                                <option value="rent_short">Short Term Rent</option>
                                <option value="rent_long">Long Term Rent</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                className={`w-full bg-neutral-900 border border-neutral-700 rounded p-3 focus:border-[#D4AF37] focus:outline-none font-bold ${formData.status === 'available' ? 'text-green-500' :
                                    formData.status === 'sold' ? 'text-red-500' : 'text-blue-500'
                                    }`}
                            >
                                <option value="available" className="text-green-500">Available</option>
                                <option value="sold" className="text-red-500">Sold</option>
                                <option value="rented" className="text-blue-500">Rented</option>
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
                                    <button type="button" onClick={() => removeFeature(feat)} className="ml-2 hover:text-white"><X className="w-3 h-3" /></button>
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
                            <p className="text-gray-400">Click or drag images here to add more</p>
                        </div>

                        {/* Existing Images */}
                        {(existingImages.length > 0 || newPreviews.length > 0) && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                {existingImages.map((img, index) => (
                                    <div key={`existing-${img.id}`} className="relative group">
                                        <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 rounded z-10">Saved</span>
                                        <img
                                            src={img.image_url} // Assuming absolute or relative correctly handled in component
                                            alt={`Existing ${index}`}
                                            className="w-full h-32 object-cover rounded border-2 border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(img.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-100 hover:scale-110 transition-all z-10"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}

                                {newPreviews.map((src, index) => (
                                    <div key={`new-${index}`} className="relative group">
                                        <span className="absolute top-1 left-1 bg-green-600 text-white text-[10px] px-1 rounded z-10">New</span>
                                        <img
                                            src={src}
                                            alt={`New ${index}`}
                                            className="w-full h-32 object-cover rounded border-2 border-green-500/50"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-100 hover:scale-110 transition-all z-10"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-6 border-t border-neutral-700">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full bg-[#D4AF37] text-black font-bold py-4 rounded hover:bg-[#E5C158] transition-colors ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Updating Property...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
