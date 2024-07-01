'use client'
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Product = {
    id: number;
    name: string;
    price: string;
    img: string;
};

const products: Product[] = [
    { id: 1, name: 'Laptop GEARVN', price: '9.990.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 2, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 3, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 4, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 5, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 6, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    { id: 7, name: 'Laptop Gaming', price: '14.490.000₫', img: 'https://pcmi8upoqradiz4smxabg0comvfcje9mz19juor3psi8p0.muatuhanquoc.com/2023/07/EnA7Yawg-woocommerce-placeholder.png' },
    // Thêm các sản phẩm khác ở đây
];
export default function LaptopList() {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <>
            <div className="bg-primary text-2xl shadow-md p-5 flex rounded-t-lg">
                <h2 className="text-white">Laptop mới nhất</h2>
                <div className="ml-auto">
                    <Link href='/products' className="text-lg font-normal text-white hover:text-blue-500">Xem tất cả</Link>
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
                        {products.map(product => (
                            <CarouselItem key={product.id} className=" basis-1/2 lg:basis-1/5" >
                                <div className="max-w-sm">
                                    <Card>
                                        <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                            <Image
                                                src={product.img}
                                                alt={product.name}
                                                className="w-full h-auto mb-2"
                                                width={500} // Specify the width of the image
                                                height={500} // Specify the height of the image
                                                quality={90} // Specify the image quality
                                                priority // Set the image as a priority
                                            />
                                            <h3 className="font-bold">{product.name}</h3>
                                            <p className="text-red-500">{product.price}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent >
                    <CarouselPrevious className="md:block hidden" />
                    <CarouselNext className="md:block hidden" />
                </Carousel >
            </div>
            <div className="text-center my-4">
                <Button className="bg-primary text-white">Xem thêm sản phẩm</Button>
            </div>
        </>
    );
}