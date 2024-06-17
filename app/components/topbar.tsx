'use client'
import deleteCookie from "@/other/deleteCoookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
interface User {
    name: string;
    email: string;
}
export default function TopBar() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("userData");
            if (storage) {
                setUser(JSON.parse(storage));
            }
        }
    }, []);
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <HiOutlineMenu
                    onClick={(e: any) => {
                        // setVisible(!visible);
                    }}
                    className="text-2xl md:hidden cursor-pointer hover:text-[#3BB243]"
                />
                <div className="text-white text-lg font-bold">
                    <Link href="/">Tech Icom</Link>
                </div>
                <div className="space-x-5 hidden md:block">
                    <Link href="/about">
                        <span className="text-gray-300 hover:text-white">Giới Thiệu</span>
                    </Link>
                    <Link href="/blog" legacyBehavior>
                        <span className="text-gray-300 hover:text-white">Bài Viết</span>
                    </Link>
                    <Link href="/contact" legacyBehavior>
                        <span className="text-gray-300 hover:text-white">Liên Hệ</span>
                    </Link>
                    <Link href="/products">
                        <span className="text-gray-300 hover:text-white">Sản phẩm</span>
                    </Link>
                </div>
                <div className="space-x-5 hidden md:block">
                    {user?.name === undefined ? (
                        <>
                            <Link href="/login">
                                <span className="text-gray-300 hover-text-white">Đăng nhập</span>
                            </Link>
                            <Link href="/register">
                                <span className="text-gray-300 hover-text-white">Đăng ký</span>
                            </Link>
                        </>

                    ) : (<>
                        <Link href="#">
                            <span className="text-gray-300 hover:text-white">{user.name}</span>
                        </Link>
                        <Link href="/" onClick={() => {
                            localStorage.removeItem('userData');
                            setUser(null);
                            deleteCookie();
                        }}>
                            <span className="text-gray-300 hover:text-white">Đăng xuất</span>
                        </Link>
                    </>)}
                </div>
            </div>
        </nav>
    );
}