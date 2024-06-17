'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/productCart';

const Home = () => {
    const [products, setProducts] = useState<any[]>([]);
    const product = async () => {
        try {
            const response = await fetch("/api/product", {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            const productData = await response.json();
            setProducts(productData.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { product() }, []);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Trang Sản Phẩm</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        imageUrl={product.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;