'use client'
import { ReactElement, useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/productCart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

export default function Product() {
    const [products, setProducts] = useState<any[]>([]);
    const product = async () => {
        try {
            const response = await fetch("/api/product?param=GETALL", {
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
        <Layout>
            <div className="container mx-auto p-4">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-base text-gray-800 font-medium">Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components" className="text-base font-medium">Sản phẩm</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/* <h1 className="text-4xl font-bold mb-6">Trang Sản Phẩm</h1> */}
                <div className="flex flex-wrap -mx-3 h-fit">
                    {products.map((product: any) => (
                        <div key={product.id} className="w-full md:w-1/2 lg:w-1/5 px-3 mb-6">
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                imageUrl={product.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}