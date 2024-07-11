'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { IMAGE_NULL } from "@/other/axios";
import SkeletonCart from "./skeletonCart";

type Mouse = {
    id: number;
    name: string;
    price: string;
    img: string;
};

export default function MouseList() {
    const [mouseList, setMouseList] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setIsLoading(false);
        }, 400); // Adjust the timeout as needed
    }, []);
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );
    const getMouseList = async () => {
        const res = await fetch("/api/product?param=GETPRODUCTBYCATEGORY&name=mouse", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setMouseList(data.data.data);
    };
    useEffect(() => {
        getMouseList();
    }, []);
    return (
        <>
            <div className="bg-primary text-2xl shadow-md p-5 flex rounded-t-lg">
                <h2 className="text-white">Chuột mới nhất</h2>
                <div className="ml-auto">
                    <Link href='/collections/mouse' className="text-lg font-normal text-white hover:text-blue-500">Xem tất cả</Link>
                </div>
            </div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full p-3"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/3 lg:basis-1/5">
                                <SkeletonCart />
                            </CarouselItem>
                        ))
                    ) : (mouseList?.map((product: any) => {
                        let imageUrl = ''
                        if (product.image?.[0] === undefined) {
                            imageUrl = IMAGE_NULL;
                        }
                        else {
                            imageUrl = product.image?.[0];
                        }
                        return (
                            <CarouselItem key={product.id} className=" basis-1/3 lg:basis-1/5" >
                                <div className="max-w-sm">
                                    <Card>
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
                                    </Card>
                                </div>
                            </CarouselItem>
                        );
                    }
                    ))};
                </CarouselContent >
                <div className="md:block hidden">
                    <CarouselPrevious className="ml-16" />
                    <CarouselNext className="mr-16" />
                </div>
            </Carousel >
            <div className="text-center my-4">
                <Link href="/collections/mouse">
                    <Button className="bg-primary text-white">Xem thêm sản phẩm</Button>
                </Link>
            </div>
        </>
    );
}