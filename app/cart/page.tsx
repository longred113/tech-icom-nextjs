'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Layout from "../components/Layout";
import { CreditCard, ShieldCheck, ShoppingBag, Slash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCreditCard, FaIdCard } from "react-icons/fa6";
import { IoBagCheck, IoHome, IoShieldCheckmarkSharp } from "react-icons/io5";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CartInfo from "../components/cartstep";
import CartStep from "../components/cartstep";
import { IMAGE_NULL } from "@/other/axios";

export default function Cart() {
    const [products, setProducts] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [hash, setHash] = useState<string | null>(null);


    const getCart = async () => {
        try {
            const res = await fetch("/api/cart?param=GETCART", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await res.json();
            setProducts(data.data.data.cartItems);
            setTotalPrice(data.data.data.totalPrice);
        } catch (error) {
            console.log(error);
        }
    }

    const updateQuantityCart = async (productId: string, type: string) => {
        try {
            const res = await fetch("/api/cart?param=UPDATECARTQUANTITY", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({ productId, type }),
            });
            const data = await res.json();
            setProducts(data.data.data.cartItems);
            setTotalPrice(data.data.data.totalPrice);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    const updateQuantity = (index: number, newQuantity: number) => {
        setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts[index].quantity = newQuantity;
            return updatedProducts;
        });
    };

    const removeCartItem = () => {

    }

    const getHash = () => {
        const currentHash = window.location.hash;
        setHash(currentHash);
        const handleHashChange = () => {
            setHash(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }

    return (
        <Layout>
            <div className="container mx-auto p-4 h-full">
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
                            <BreadcrumbPage className="text-base font-medium">Giỏ hàng</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="bg-white shadow-md rounded p-4 md:w-1/2 mx-auto">
                    <CartStep />
                    <div>
                        {
                            hash === null && products?.length > 0 ? (
                                <>
                                    <div className="border-b-2 mb-5">
                                        {products?.map((item, index) => {
                                            return (
                                                <div key={index} className="flex p-4">
                                                    <div className="flex-shrink-0">
                                                        <Image src={item.productData.image ? item.productData.image[0] : IMAGE_NULL}
                                                            alt={item.productData.name}
                                                            className="h-auto mb-2 border-2"
                                                            width={140} // Specify the width of the image
                                                            height={140} // Specify the height of the image
                                                            quality={90} // Specify the image quality
                                                            priority
                                                        />
                                                        <div className="text-sm flex items-center">
                                                            {/* <Button>
                                                            <Trash2 />
                                                        </Button> */}
                                                            <FaRegTrashAlt />
                                                            <span className="mx-2 hover:text-red-600 cursor-pointer"
                                                                onClick={removeCartItem}
                                                            >Xoá</span>
                                                        </div>
                                                    </div>
                                                    <div className="md:flex md:flex-row w-full">
                                                        <div className="w-full mx-3">
                                                            <h3>{item.productData.name}</h3>
                                                        </div>
                                                        <div className="text-end">
                                                            <div className="text-red-600 font-semibold">{item?.productData?.price?.toLocaleString('vi-VN')}đ</div>
                                                            <div className="">
                                                                <button
                                                                    className="bg-gray-200 px-2 py-1 rounded"
                                                                    onClick={() => [updateQuantityCart(item.productData.id, "decrement"), updateQuantity(index, item.quantity - 1)]}
                                                                    disabled={item.quantity === 1}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="mx-2">{item.quantity}</span>
                                                                <button
                                                                    className="bg-gray-200 px-2 py-1 rounded"
                                                                    onClick={() => [updateQuantityCart(item.productData.id, "increment"), updateQuantity(index, item.quantity + 1)]}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="flex justify-between m-5">
                                        <span className="text-lg font-medium">Tổng tiền:{" "}</span>
                                        <span className="text-red-600 text-xl font-bold">{totalPrice.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <Button asChild onClick={getHash} className="w-full text-xl uppercase">
                                        <Link href="/cart/pay-info">
                                            Đặt hàng ngay
                                        </Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="mt-4">
                                        <p className="text-gray-700">Hiện tại giỏ hàng của bạn đang trống.</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <a href="/products" className="text-indigo-600 hover:underline">Tiếp tục mua sắm</a>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout >
    )
}