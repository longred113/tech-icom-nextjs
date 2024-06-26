'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import deleteCookie from "@/other/deleteCoookie";
import { cookies } from "next/headers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { MdAccountCircle, MdSearch } from "react-icons/md";
interface User {
    name: string;
    email: string;
}
export default function TopBar() {
    const [user, setUser] = useState<User | null>(null);
    const [cart, setCart] = useState<any>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("userData");
            if (storage) {
                const userData = JSON.parse(storage);
                setUser(userData);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (user?.name !== undefined) {
            getCart();
        }
    }, [user]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <nav className={`bg-primary p-4 ${isSticky ? 'fixed top-0 left-0 w-full z-50' : ''}`}>
            <div className="mx-auto flex justify-between items-center text-sm w-8/12">
                <HiOutlineMenu
                    onClick={(e: any) => {
                        // setVisible(!visible);
                    }}
                    className="text-2xl md:hidden cursor-pointer hover:text-[#3BB243]"
                />
                <div className="text-white text-lg font-bold">
                    <Link href="/">Tech Icom</Link>
                </div>
                <div className="bg-white m-2 md:flex flex-grow rounded-md">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full p-2 rounded-md"
                        autoComplete="false"
                    />
                    <MdSearch className="m-2 bg-white text-xl text-gray-500" />
                </div>
                {/* <div className="space-x-5 hidden md:block">
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
                </div> */}
                <div className="space-x-5 flex">
                    <Link href="/cart" className="text-gray-300 hover:text-white">
                        <div className="flex w-full gap-1 items-center justify-center text-gray-300 relative hover:text-white">
                            <IoMdCart className="text-2xl" />

                            <div className="right-3 -top-1.5 absolute bg-product-price text-white px-1.5 text-sm rounded-full text-center">
                                {cart !== null ? (
                                    cart?.length
                                ) : (null)}
                            </div>
                        </div>
                        <p className="md:flex hidden justify-center items-center text-gray-300 hover:text-white">
                            Giỏ hàng
                        </p>
                    </Link>
                    {user?.name === undefined ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="text-gray-300 hover:text-white cursor-pointer">
                                        <MdAccountCircle className="text-2xl mx-auto" />
                                        <p className="">Đăng nhập</p>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-primary" align="center">
                                    {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                                <DropdownMenuSeparator /> */}
                                    <Link href="/login">
                                        <DropdownMenuItem className="text-white cursor-pointer">
                                            <span>Đăng nhập</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/register">
                                        <DropdownMenuItem className="text-white cursor-pointer">
                                            <span>Đăng ký</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                <DropdownMenuItem className="text-white" onClick={() => {
                                    localStorage.removeItem('userData');
                                    setUser(null);
                                    setCart(null);
                                    deleteCookie();
                                }}>
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>)}
                </div>
            </div>
        </nav>
    );
}