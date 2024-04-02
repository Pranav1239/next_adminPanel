import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
    id: number;
    name: string;
    description: string | null;
    subcategories: { id: number; name: string; description: string | null }[];
}

const GetCategory: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category');
                setCategories(response.data);
                setLoading(false); // Update loading state once data is fetched
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/category?id=${id}`);
            setCategories(categories.filter((category) => category.id !== id));
            toast("Removed category")
        } catch (error) {
            console.error('Error deleting category:', error);
            toast("Error on removing")
        }
    };

    return (
        <div className=" py-8">
            <div className=" mx-auto px-4">
                <h1 className="text-2xl font-bold text-white mb-4">Categories</h1>
                {loading ? ( // Conditionally render based on loading state
                    <p>Loading...</p>
                ) : categories.length === 0 ? ( // Check if categories array is empty
                    <p>No categories available.</p>
                ) : (
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <table className="w-full table-auto divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="py-3 px-6 text-left text-white font-medium">Name</th>
                                    <th className="py-3 px-6 text-left text-white font-medium">Description</th>
                                    <th className="py-3 px-6 text-left text-white font-medium">Subcategories</th>
                                    <th className="py-3 px-6 text-left text-white font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-700 transition-colors duration-200">
                                        <td className="py-4 px-6 text-white">{category.name}</td>
                                        <td className="py-4 px-6 text-white">{category.description || '-'}</td>
                                        <td className="py-4 px-6 text-white">

                                        </td>
                                        <td className="py-4 px-6 text-white">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white py-2 px-4 rounded"
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
                )}
            </div>
        </div>
    );
};

export default GetCategory;