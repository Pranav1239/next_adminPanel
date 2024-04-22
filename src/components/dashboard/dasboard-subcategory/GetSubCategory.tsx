import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Subcategory {
    id: number;
    name: string;
    description: string | null;
    categoryId: number;
    category: {
        id: number;
        name: string;
        description: string | null;
    };
}

const GetSubCategory: React.FC = () => {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('/api/subcategory');
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                toast.error('Error fetching subcategories');
            }
        };
        fetchSubcategories();
    }, []);

    const handleDeleteSubcategory = async (subcategoryId: number) => {
        try {
            const response = await axios.delete(`/api/subcategory?id=${subcategoryId}`);

            const deletedSubcategory = response.data;
            setSubcategories(prevSubcategories =>
                prevSubcategories.filter(subcategory => subcategory.id !== deletedSubcategory.id)
            );
            toast.success('Subcategory deleted successfully');

        } catch (error) {
            console.error('Error deleting subcategory:', error);
            toast.error('Error deleting subcategory');
        }
    };


    console.log('Get Subcategories', subcategories);

    return (
        <div className=" py-8">
            <div className=" mx-auto px-4">
                <h1 className="text-2xl font-bold text-white mb-4">Subcategories</h1>
                <div className="bg-gray-800 rounded-lg overflow-x-auto shadow-md">
                    <table className="w-full table-auto divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="py-3 px-6 text-left text-white font-medium">Name</th>
                                <th className="py-3 px-6 text-left text-white font-medium">Description</th>
                                <th className="py-3 px-6 text-left text-white font-medium">Category</th>
                                <th className="py-3 px-6 text-left text-white font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {subcategories.map((subcategory) => (
                                <tr key={subcategory.id} className="hover:bg-gray-700 transition-colors duration-200">
                                    <td className="py-4 px-6 text-white">{subcategory.name}</td>
                                    <td className="py-4 px-6 text-white">{subcategory.description || '-'}</td>
                                    <td className="py-4 px-6 text-white">
                                        {subcategory.category.name} ({subcategory.category.description || '-'})
                                    </td>
                                    <td className="py-4 px-6 text-white">
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDeleteSubcategory(subcategory.id)}
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
        </div>
    );
};

export default GetSubCategory;