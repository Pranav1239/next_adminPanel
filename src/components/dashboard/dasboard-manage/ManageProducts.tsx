"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    subcategory: {
        name: string;
    };
}

interface ProductResponse {
    products: Product[];
    currentPage: number;
    totalPages: number;
}

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading state to true when fetching data
            try {
                const response = await axios.get<ProductResponse>(
                    `/api/product?page=${currentPage}&search=${searchQuery}`
                );
                const { products, totalPages } = response.data;
                setProducts(products);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false); // Set loading state to false after data is fetched
        };

        fetchProducts();
    }, [currentPage, searchQuery]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchQuery(value); // Update searchQuery state with the input value
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Manage Products</h1>

            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by product name..."
                className="w-full border bg-slate-900 p-2 rounded-md mb-4"
            />

            {loading ? (
                <div></div>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id} className="border-b py-2">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-gray-600">Category: {product.subcategory.name}</p>
                        </li>
                    ))}
                </ul>
            )}

            {totalPages > 1 && (
                <div className="mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 rounded-md ${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
