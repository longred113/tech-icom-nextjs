'use client'
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IMAGE_NULL } from "@/other/axios";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCart from "./skeletonCart";

export default function LaptopList() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust the timeout as needed
    }, []);

    const [laptopList, setLaptopList] = useState<any>(null);
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );
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
    return (
        <>
            <div className="bg-primary text-2xl shadow-md p-5 flex rounded-t-lg">
                <h2 className="text-white">Laptop mới nhất</h2>
                <div className="ml-auto">
                    <Link href='/collections/laptop' className="text-lg font-normal text-white hover:text-blue-500">Xem tất cả</Link>
                </div>
            </div>
            <div className="relative">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full p-3"
                    onMouseEnter={plugin.current.stop}
                    onMouseOut={plugin.current.reset}
                >
                    <CarouselContent>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-1/3 lg:basis-1/5">
                                    <SkeletonCart />
                                </CarouselItem>
                            ))
                        ) : (
                            laptopList?.map((product: any) => {
                                let imageUrl = product.image?.[0] || IMAGE_NULL;
                                return (
                                    <CarouselItem key={product.id} className="basis-1/3 lg:basis-1/5">
                                        <div className="max-w-sm">
                                            <Card>
                                                <Link href={`/products/${product.name}`}>
                                                    <CardContent className="flex flex-col items-center justify-between h-72 p-4">
                                                        <div className="w-full aspect-w-1 aspect-h-1">
                                                            <Image
                                                                src={imageUrl}
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
                                    </CarouselItem>
                                );
                            })
                        )}
                    </CarouselContent>
                    <div className="md:block hidden">
                        <CarouselPrevious className="ml-16" />
                        <CarouselNext className="mr-16" />
                    </div>
                </Carousel>
            </div >
        </>
    );
}