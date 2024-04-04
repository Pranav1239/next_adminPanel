import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ProductData {
    name: string;
    description?: string;
    price: number;
    subcategoryId: number | null;
}

interface Subcategory {
    id: number;
    name: string;
    description?: string | null;
    category: {
        name: string;
        description?: string | null;
    };
}

const PostProduct: React.FC = () => {
    const [formData, setFormData] = useState<ProductData>({
        name: '',
        description: '',
        price: 0,
        subcategoryId: null,
    });
    const [error, setError] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('/api/subcategory');
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                setError('Failed to fetch subcategories');
            }
        };

        fetchSubcategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubcategoryChange = (subcategoryId: number | null) => {
        setFormData((prevData) => ({ ...prevData, subcategoryId }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/product', formData);

            console.log('New product created:', response.data);
            setFormData({
                name: '',
                description: '',
                price: 0,
                subcategoryId: null,
            });
            setError(null);

        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while creating the product');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {error && (
                <Alert variant="destructive" className="bg-slate text-white">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-1.5 bg-slate-800 p-2 rounded-md">
                <label htmlFor="name" className="text-white">Product Name</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-slate text-white bg-slate-900 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="grid gap-1.5 p-2 rounded-md">
                <label htmlFor="description" className="text-white">Product Description</label>
                <textarea id="description" name="description" cols={20} rows={6} value={formData.description} onChange={handleChange} className="bg-slate text-white bg-slate-900 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="grid gap-1.5 p-2 rounded-md">
                <label htmlFor="price" className="text-white">Product Price</label>
                <input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className=" bg-slate-900 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="grid gap-1.5 p-2 rounded-md">
                <label htmlFor="subcategoryId" className="text-white">Subcategory</label>
                <select
                    value={formData.subcategoryId?.toString() || ''}
                    onChange={(e) => handleSubcategoryChange(e.target.value ? parseInt(e.target.value) : null)}
                    className="bg-slate-900 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">Select a subcategory</option>
                    {subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id.toString()}>{subcategory.name}</option>
                    ))}
                </select>
            </div>
            <Button type="submit" className="bg-slate text-white p-2 rounded-md hover:bg-gray-700">Create Product</Button>
        </form>
    );
};

export default PostProduct;
