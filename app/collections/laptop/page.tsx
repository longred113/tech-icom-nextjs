'use client'
import Layout from "@/app/components/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { IMAGE_NULL } from "@/other/axios";
import { Slash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LaptopPage() {
    const [visibleProducts, setVisibleProducts] = useState(5);
    const allProducts = Array.from({ length: 10 }).map((_, index) => (
        <div className="lg:w-1/5 w-1/2 md:w-1/3 p-2" key={index}>
            <Card>
                <CardContent className="flex flex-col items-center justify-between h-72 p-4">
                    <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden">
                        <Image
                            src={IMAGE_NULL}
                            alt={""}
                            className="object-contain"
                            width={500}
                            height={500}
                            quality={90}
                            priority
                        />
                    </div>
                    <h3 className="font-medium text-sm">test</h3>
                    <p className="text-red-500">100000đ</p>
                </CardContent>
            </Card>
        </div>
    ));
    const handleShowMore = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5);
    };
    return (
        <Layout>
            <div className="container mx-auto p-4 xl:w-8/12">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-base text-gray-800 font-medium">Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components" className="text-base font-medium">Laptop</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="bg-white flex flex-wrap">
                    {allProducts.slice(0, visibleProducts)}
                </div>
                {visibleProducts < allProducts.length && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleShowMore}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Hiển thị thêm sản phẩm
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}