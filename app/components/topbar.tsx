'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cookies } from "next/headers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { MdAccountCircle, MdSearch } from "react-icons/md";
import SidebarMobile from "./sidebar-mobile";
import deleteCookie from "@/other/deleteCoookie";
import { CartProvider, useCart } from "./cartContext";
import { get } from "http";
interface User {
    name: string;
    email: string;
}
export default function TopBar() {
    const [user, setUser] = useState<User | null>(null);
    const [cart, setCart] = useState<any>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cartItems, fetchCart, clearCart } = useCart();

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    // const getData = async () => {
    //     const data = await fetchCart();
    //     setCart(data);
    // }

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('Auth-token='));

        if (!token) {
            localStorage.removeItem("userData");
        }
    }, []);

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
            fetchCart();
        }
    }, [user]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    return (
        <nav className={`bg-primary p-4 transition-all duration-300 ease-in-out ${isSticky ? 'sticky top-0 left-0 w-full z-50' : ''}`}>
            <div className="mx-auto flex justify-between items-center text-sm xl:w-8/12">
                <div>
                    <SidebarMobile user={user} />
                </div>
                <div className="text-white text-lg font-bold md:ml-0 ml-10">
                    <Link href="/">Tech Icom</Link>
                </div>
                <div className="bg-white m-2 flex lg:flex-grow w-1/2 rounded-md">
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
                <div className="space-x-5 flex">
                    <Link href="/cart" className="text-gray-300">
                        <div className="flex w-full gap-1 items-center justify-center text-white relative">
                            <IoMdCart className="text-2xl" />

                            <div className="md:right-3 -right-1 -top-2.5 absolute bg-red-600 text-white px-1.5 text-sm rounded-full text-center">
                                {cartItems.length > 0 ? (
                                    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0
                                ) : null}
                                {/* {
                                    cart && cart.length > 0 ? (cart?.reduce((acc: any, item: any) => acc + item.quantity, 0) || 0) : null
                                } */}
                            </div>
                        </div>
                        <p className="md:flex hidden justify-center items-center text-white">
                            Giỏ hàng
                        </p>
                    </Link>
                    {user?.name === undefined ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="md:block hidden">
                                    <div className="text-white hover:text-white cursor-pointer">
                                        <MdAccountCircle className="text-2xl mx-auto" />
                                        <p className="">Đăng nhập</p>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-primary" align="center">
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
                            <DropdownMenuTrigger asChild className="md:block hidden">
                                <Avatar>
                                    <AvatarImage className="cursor-pointer" src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-primary">
                                <Link href={"/profile"}>
                                    <DropdownMenuItem className="text-white">
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="text-white" onClick={() => {
                                    localStorage.removeItem('userData');
                                    setUser(null);
                                    setCart(null);
                                    clearCart();
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