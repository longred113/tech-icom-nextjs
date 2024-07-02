'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type Mouse = {
    id: number;
    name: string;
    price: string;
    img: string;
};

const mouses: Mouse[] = [
    { id: 1, name: 'Laptop GEARVN', price: '9.990.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 2, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 3, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 4, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 5, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 6, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
];
export default function MouseList() {
    const [mouseList, setMouseList] = useState<any>(null);
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
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
    console.log(mouseList);
    return (
        <>
            <div className="bg-primary text-2xl shadow-md p-5 flex rounded-t-lg">
                <h2 className="text-white">Chuột mới nhất</h2>
                <div className="ml-auto">
                    <Link href='/mouses' className="text-lg font-normal text-white hover:text-blue-500">Xem tất cả</Link>
                </div>
            </div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full p-3"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="">
                    {mouseList?.map((product: any) => (
                        <CarouselItem key={product.id} className=" basis-1/2 lg:basis-1/5" >
                            <div className="max-w-sm">
                                <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                        <Image
                                            src={product.image?.[0]}
                                            alt={product.name}
                                            className="w-full mb-2 object-contain"
                                            width={500} // Specify the width of the image
                                            height={500} // Specify the height of the image
                                            quality={90} // Specify the image quality
                                            priority // Set the image as a priority
                                        />
                                        <h3 className="font-medium text-sm">{product.name}</h3>
                                        <p className="text-red-500">{product.price}₫</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent >
                <div className="md:block hidden">
                    <CarouselPrevious className="ml-16" />
                    <CarouselNext className="mr-16" />
                </div>
            </Carousel >
            <div className="text-center my-4">
                <Button className="bg-primary text-white">Xem thêm sản phẩm</Button>
            </div>
        </>
    );
}