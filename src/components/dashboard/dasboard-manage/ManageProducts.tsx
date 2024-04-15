"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    description?: string | null;
    price: number;
    subcategory: {
        name: string;
    };
    subcategoryId: number;
    images: ProductImage[];
    FeaturedProduct?: boolean | null;
    SecondFeaturedProduct?: boolean | null;
    createdDate: Date;
    updatedDate: Date;
}

interface ProductImage {
    id: number;
    publicId: string;
    url: string;
    product?: Product | null;
    productId?: number | null;
}

interface ProductResponse {
    products: Product[];
    currentPage: number;
    totalPages: number;
}

interface Subcategory {
    id: number;
    name: string;
}

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get<Subcategory[]>('/api/subcategory');
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };
        fetchSubcategories();
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get<ProductResponse>(`/api/product?page=${currentPage}&search=${searchQuery}${selectedSubcategory ? `&cat=${selectedSubcategory}` : ''}`);
                const { products, totalPages } = response.data;
                setProducts(products);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [currentPage, searchQuery, selectedSubcategory]);

    const handleSubcategoryClick = (subcategoryId: number) => {
        setSelectedSubcategory(subcategoryId);
        setCurrentPage(1); // Reset page when selecting a new subcategory
    };


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchQuery(value); // Update searchQuery state with the input value
    };

    console.log("Products", products);

    return (
        <>

            <div className=" text-white  p-4">
                <h1 className="text-3xl font-bold mb-4">Manage Products</h1>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by product name..."
                    className="w-full border bg-slate-900 p-2 rounded-md mb-4"
                />

                <div>
                    <div className="bg-slate-900 p-4 rounded-md mb-4">
                        <h2 className="text-xl font-bold mb-2">Filter by Subcategory:</h2>
                        <div className="flex flex-wrap">
                            {subcategories && subcategories.map((subcategory) => (
                                <button
                                    key={subcategory.id}
                                    onClick={() => handleSubcategoryClick(subcategory.id)}
                                    className={`px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 mb-2 hover:bg-gray-300`}
                                >
                                    {subcategory.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 p-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white  rounded-lg shadow-md overflow-hidden">
                            {product.images.length > 0 && (
                                <Image
                                    src={product.images[0].url}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg text-gray-900 font-bold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-2">
                                    Category: {product.subcategory.name}
                                </p>
                                <p className="text-gray-600 mb-2">{product.description || 'No description available'}</p>
                                <p className="text-gray-900 font-bold mb-2">${product.price.toFixed(2)}</p>
                                {/* Add any other relevant product details here */}
                            </div>
                        </div>
                    ))}
                </div>


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
        </>

    );
};

export default ManageProducts;
