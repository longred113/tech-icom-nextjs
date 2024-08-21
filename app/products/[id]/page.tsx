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
import { Loader2, Slash } from "lucide-react";
import Image from "next/image";
import { IMAGE_NULL } from "@/other/axios";
import { IoHome } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import { useCart } from "@/app/components/cartContext";
import clsx from "clsx";
interface AddToCartResponse {
    code: number;
    data: number;
    message: String;
    status: String;
    // other properties...
}
function ProductDetail() {
    const param = useParams();
    const productName = param.id as string;
    const [product, setProduct] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const { addToCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("userData");
            if (storage) {
                setUser(JSON.parse(storage));
            }
        }
    }, []);

    const formattedPrice = typeof product?.data?.price === 'number' ? product.data.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }) : 'N/A';

    const handleSubmit = async () => {
        if (user?.name !== undefined) {
            setIsLoading(true);
            try {
                const data = await addToCart({
                    ...product?.data,
                    quantity: 1,
                });
                if (data.data.code === 200) {
                    toast.success("Thêm vào giỏ hàng thành công!");
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("Bạn chưa đăng nhập!");
        }
    }

    if (!product) {
        return <div>Đang tải...</div>;
    }
    return (
        <Layout>
            <div className="container xl:w-8/12 mx-auto p-4">
                <ToastContainer />
                <Breadcrumb className="">
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
                            <BreadcrumbLink href="/products" className="text-base font-medium">Sản phẩm</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-base font-medium">{product?.data?.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-wrap mt-10">
                    <div className="w-full lg:w-2/6 px-2 border bg-white">

                        {/* {cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0} */}


                        {(
                            <Image className="w-full rounded" src={product?.data?.image?.[0] ? product?.data?.image[0] : IMAGE_NULL} alt={product?.data?.name} width={600} height={600} />
                        )}
                    </div>
                    <div className="w-full lg:w-4/6 px-4 flex flex-col justify-start items-start lg:items-start border bg-white">
                        <div className="text-lg font-medium mb-4">
                            {product?.data?.name}
                        </div>
                        <div className="text-xl font-bold mb-4 text-red-500">
                            {formattedPrice}
                        </div>
                        {
                            product?.data?.inventory_number > 0 ? (
                                isLoading ?
                                    <Button disabled className="p-6 font-medium uppercase text-lg text-white">
                                        <Loader2 className="animate-spin" />
                                        Loading
                                    </Button> : <Button
                                        className="p-6 font-medium uppercase text-lg text-white"
                                        onClick={() => { handleSubmit() }}
                                    >Mua Ngay</Button>
                            ) : (
                                <Button
                                    className="p-6 font-medium uppercase text-lg text-white mb-4 bg-slate-500 px-4 py-2 rounded"
                                    disabled
                                >Hết hàng</Button>
                            )
                        }
                        <ul className="text-gray-700 text-base my-5">
                            {product?.data?.categoryId === 1 && product?.data?.description && Object.keys(product?.data?.description).map((key: string, index: number) => (
                                <li key={index} className="mb-2"><strong>{key}:</strong> {product?.data?.description[key]}</li>
                            ))}
                            {product?.data?.categoryId === 5 && (
                                <>
                                    <div>
                                        <strong>Thông tin chung:</strong>
                                    </div>
                                    <div>
                                        <strong>Hãng sản xuất: </strong>
                                        {product?.data?.producer}
                                    </div>
                                    <div>
                                        <strong>Bảo hành: </strong>
                                        24 Tháng
                                    </div>
                                    <div>
                                        <strong>Kết nối: </strong>
                                        Wireless
                                    </div>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductDetail;