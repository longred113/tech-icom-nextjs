'use client'
import Layout from "@/app/components/Layout";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react";
import Image from "next/image";

function ProductDetail() {
    const param = useParams();
    const productName = param.id as string;
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (productName) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/product?param=PRODUCTDETAIL&name=${encodeURIComponent(productName)}`, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    });
                    const productData = await response.json();
                    setProduct(productData.data);
                    return;
                } catch (error) {
                    console.log(error);
                }
            };
            fetchProduct();
        }
    }, [productName]);
    const formattedPrice = typeof product?.data?.price === 'number' ? product.data.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }) : 'N/A';

    if (!product) {
        return <div>Đang tải...</div>;
    }
    return (
        <Layout>
            <div className="container mx-auto p-4">
                <Breadcrumb className="">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-base text-gray-800 font-medium">Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components" className="text-base text-gray-800 font-medium">Sản phẩm</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components" className="text-base font-medium">{product.data.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/* <h1 className="text-4xl font-bold mb-6">{product.data.name}</h1> */}
                <div className="flex flex-wrap mt-10">
                    <div className="w-full lg:w-1/2 px-4 border">
                        {product.data.image && product.data.image.length > 0 && (
                            <Image className="w-full rounded" src={product.data.image[0]} alt={product.data.name} width={600} height={600} />
                        )}
                    </div>
                    <div className="w-full lg:w-1/2 px-4 flex flex-col justify-start items-start lg:items-start border">
                        <div className="text-2xl font-bold mb-4">
                            {product.data.name}
                        </div>
                        <div className="text-xl font-bold mb-4">
                            {formattedPrice}
                        </div>
                        <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Mua ngay
                        </button>
                        <ul className="text-gray-700 text-base">
                            {product.data.description && Object.keys(product.data.description).map((key: string, index: number) => (
                                <li key={index} className="mb-2"><strong>{key}:</strong> {product.data.description[key]}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductDetail;