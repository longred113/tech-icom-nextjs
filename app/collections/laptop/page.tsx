'use client'
import Layout from "@/app/components/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGE_NULL } from "@/other/axios";
import { Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";

export default function LaptopPage() {
    const [visibleProducts, setVisibleProducts] = useState(10);
    const [loading, setLoading] = useState(true);
    const [laptopList, setLaptopList] = useState<any>(null);

    const getLaptopList = async () => {
        const res = await fetch("/api/product?param=GETPRODUCTBYCATEGORY&name=laptop", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setLaptopList(data.data.data);
    };
    useEffect(() => {
        getLaptopList();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const allProducts = laptopList?.map((product: any) => (
        <div className="lg:w-1/5 w-1/2 md:w-1/3 p-2" key={product.id}>
            <Card>
                <Link href={`/products/${product.name}`}>
                    <CardContent className="flex flex-col items-center justify-between h-72 p-4">
                        <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden">
                            <Image
                                src={product.image?.[0]}
                                alt={product.name}
                                className="object-contain"
                                width={500}
                                height={500}
                                quality={90}
                                priority
                            />
                        </div>
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-red-500">{product.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}</p>
                    </CardContent>
                </Link>
            </Card>
        </div>
    ));
    const skeletonArray = Array.from({ length: 10 }).map((_, index) => (
        <div className="lg:w-1/5 w-1/2 md:w-1/3 p-2" key={index}>
            <Card>
                <CardContent className="flex flex-col items-center justify-between h-72 p-4">
                    <div className="w-full aspect-w-1 aspect-h-1">
                        <Skeleton className="h-[200px]  w-full rounded-md bg-slate-300" />
                    </div>
                    <Skeleton className="h-4 w-[150px] bg-slate-300 mt-2" />
                    <Skeleton className="h-4 w-[200px] bg-slate-300 mt-2" />
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
                            <BreadcrumbLink href="/" className="text-base font-medium flex items-center gap-1">
                                <IoHome />
                                Trang chủ
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-base font-medium">Laptop</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="bg-white flex flex-wrap">
                    {loading ? skeletonArray : allProducts.slice(0, visibleProducts)}
                </div>
                {!loading && visibleProducts < allProducts.length && (
                    <div className="flex justify-center mt-4">
                        <Button onClick={handleShowMore} className="bg-primary text-white">Xem thêm sản phẩm</Button>
                    </div>
                )}
            </div>
        </Layout>
    );
}