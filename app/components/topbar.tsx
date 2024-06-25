'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import deleteCookie, { myModule } from "@/other/deleteCoookie";
import { cookies } from "next/headers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
interface User {
    name: string;
    email: string;
}
export default function TopBar() {
    const [user, setUser] = useState<User | null>(null);
    const [cart, setCart] = useState<any>(null);
    const getCart = async () => {
        try {
            const res = await fetch("/api/cart?param=GETCART", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            const data = await res.json();
            setCart(data.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        myModule.checkExistToken;
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("userData");
            if (storage) {
                setUser(JSON.parse(storage));
            }
        }
        getCart();
    }, []);

    return (
        <nav className="bg-primary p-4">
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
                <div className="space-x-5 flex">
                    <Link href="/cart" className="text-gray-300 hover:text-white">
                        <div className="flex w-full gap-1 items-center justify-center text-gray-300 relative hover:text-white">
                            <IoMdCart className="text-2xl" />

                            <div className="right-3 -top-1.5 absolute bg-product-price text-white px-1.5 text-sm rounded-full text-center">
                                {<span>{cart?.length}</span>}
                            </div>
                        </div>
                        <p className="md:flex hidden justify-center items-center text-gray-300">
                            Giỏ hàng
                        </p>
                    </Link>
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage className="cursor-pointer" src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-primary">
                                {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                                <DropdownMenuSeparator /> */}
                                <DropdownMenuItem className="text-white">
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white">
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <div className="flex w-full gap-1 items-center justify-center text-gray-300">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <Link href="#">
                        </Link>
                        <Link href="/" onClick={() => {
                            localStorage.removeItem('userData');
                            setUser(null);
                            myModule.deleteCookie;
                        }}>
                            <span className="text-gray-300 hover:text-white">Đăng xuất</span>
                        </Link> */}
                    </>)}
                </div>
            </div>
        </nav>
    );
}