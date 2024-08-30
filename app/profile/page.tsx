'use client'
import { User, MapPinnedIcon, ShoppingBag, LogOut } from "lucide-react";
import Layout from "../components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfoTab from "./info-tab";
import AddressTab from "./address-tab";
import OrderTab from "./order-tab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProfilePage() {
    const searchParams = useSearchParams();

    const renderPage = () => {
        const page = searchParams.get("param");
        switch (page) {
            case "details":
                return <InfoTab />;
            case "addresses":
                return (
                    <AddressTab />);
            case "orders":
                return <OrderTab />;
            default:
                return <InfoTab />;
        }
    }
    return (
        <Layout>
            <div className="container mx-auto p-4 xl:w-8/12 flex">
                <div className="bg-white w-1/4 rounded-lg mr-5 h-fit">
                    <div className="flex py-3 px-5 text-xl items-center border-b-2">
                        <Avatar className="mr-5">
                            <AvatarImage className="cursor-pointer" src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>UserName</p>
                    </div>
                    <div className="p-5">
                        {/* <button onClick={() => { setCurrentTab(<InfoTab />) }} className="flex pb-5 text-lg hover:text-primary">
                            <User className="mr-3" />
                            <p>Thông tin tài khoản</p>
                        </button> */}
                        <Link
                            className="flex pb-5 text-lg hover:text-primary"
                            href={{
                                pathname: "/profile",
                                query: { param: "info" },
                            }}
                            passHref
                        >
                            <User className="mr-3" />
                            <p>Thông tin tài khoản</p>
                        </Link>
                        <Link
                            className="flex pb-5 text-lg hover:text-primary"
                            href={{
                                pathname: "/profile",
                                query: { param: "addresses" },
                            }}
                            passHref
                        >
                            <MapPinnedIcon className="mr-3" />
                            <p>Địa chỉ</p>
                        </Link>
                        <Link
                            className="flex pb-5 text-lg hover:text-primary"
                            href={{
                                pathname: "/profile",
                                query: { param: "orders" },
                            }}
                            passHref
                        >
                            <ShoppingBag className="mr-3" />
                            <p>Quản lý đơn hàng</p>
                        </Link>
                        {/* <button onClick={() => { setCurrentTab(<AddressTab />) }} className="flex pb-5 text-lg hover:text-primary">
                            <MapPinnedIcon className="mr-3" />
                            <p>Địa chỉ</p>
                        </button>
                        <button onClick={() => { setCurrentTab(<OrderTab />) }} className="flex pb-5 text-lg hover:text-primary">
                            <ShoppingBag className="mr-3" />
                            <p>Quản lý đơn hàng</p>
                        </button> */}
                        <button className="flex pb-5 text-lg hover:text-primary">
                            <LogOut className="mr-3" />
                            <p>Đăng xuất</p>
                        </button>
                    </div>
                </div>
                <div className="bg-white w-3/4 rounded-lg">
                    {renderPage()}
                </div>
            </div>
        </Layout >
    )
}