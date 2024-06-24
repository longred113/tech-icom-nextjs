'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Layout from "../components/Layout";
import { Slash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Cart() {
    const [products, setProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    const getCart = async () => {
        try {
            const res = await fetch("/api/cart?param=GETCART", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            const data = await res.json();
            setProducts(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCart();
    }, []);

    console.log(products);

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
                            <BreadcrumbLink href="/components" className="text-base font-medium">Giỏ hàng</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h2>
                    {
                        products?.length > 0 ? (
                            <>
                                <div className="mb-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Tên sản phẩm</th>
                                                <th className="text-right">Giá</th>
                                                <th className="text-right">Số lượng</th>
                                                <th className="text-right">Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-left">{item.product.name}</td>
                                                            <td className="text-right">{item.product.price.toLocaleString('vi-VN')}đ</td>
                                                            <td className="text-right">{item.quantity}</td>
                                                            <td className="text-right">{(item.product.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-4">
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
        </Layout>
    )
}