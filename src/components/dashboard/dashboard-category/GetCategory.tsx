import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
    id: number;
    name: string;
    description: string | null;
    subcategories: { id: number; name: string; description: string | null }[];
}

const GetCategory: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category');
                setCategories(response.data);
                setLoading(false); // Update loading state once data is fetched
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Error fetching subcategories');
            }
        };

        fetchCategories();
    }, []);


    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/category?id=${id}`);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
            toast.success('category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Error deleting category');
        }
    };


    return (
        <div className="py-8">
            <div className="overflow-x-auto px-4">
                <h1 className="text-2xl font-bold text-white mb-4">Categories</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : categories.length === 0 ? (
                    <p className='text-white'>No categories available.</p>
                ) : (
                    <div className="bg-gray-800 rounded-lg overflow-x-auto shadow-md">
                        <div className="table-container">
                            <table className="w-full table-auto divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="py-3 px-2 sm:px-6 text-left text-white font-medium">Name</th>
                                        <th className="py-3 px-2 sm:px-6 text-left text-white font-medium">Description</th>
                                        <th className="py-3 px-2 sm:px-6 text-left text-white font-medium">Subcategories</th>
                                        <th className="py-3 px-2 sm:px-6 text-left text-white font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {categories.map((category) => (
                                        <tr key={category.id} className="hover:bg-gray-700 transition-colors duration-200">
                                            <td className="py-3 px-2 sm:px-6 text-white">{category.name}</td>
                                            <td className="py-3 px-2 sm:px-6 text-white">{category.description || '-'}</td>
                                            <td className="py-3 px-2 sm:px-6 text-white">
                                                {category?.subcategories && category?.subcategories.map((subcategory) => (
                                                    <div key={subcategory.id}>
                                                        {subcategory.name} ({subcategory.description || '-'})
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="py-3 px-2 sm:px-6 text-white">
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-3 sm:px-4 rounded"
                                                    onClick={() => handleDelete(category.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

};

export default GetCategory;
