'use client'
import { GG_Image } from "@/other/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaFacebook, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa6";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    async function login(formData: FormData) {
        try {
            const response = await fetch("/api/users?param=LOGIN", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(
                    {
                        email: formData.get("email"),
                        password: formData.get("password"),
                    }
                ),
            });
            const authData = await response.json();
            if (authData.data.status === 'success') {
                document.cookie = `Auth-token=${authData.data.data.token}`
                const userData = {
                    name: authData.data.data.name,
                    email: authData.data.data.email,
                }
                localStorage.setItem("userData", JSON.stringify(userData));
                router.push("/");
            } else {
                toast.error("Sai email hoặc mật khẩu ! Vui lòng thử lại.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="text-left font-bold"><span className="text-primary">Tech </span>Icom</div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-primary mb-2">Đăng nhập</h2>
                <div className="border-2 w-20 border-primary inline-block mb-2"></div>
                <div className="flex justify-center my-2">
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        <FaFacebook className="text-[#0866FF]" />
                    </Link>
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        <FaLinkedinIn className="text-[#0a66c2]" />
                    </Link>
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        <Image height={18} width={18} alt="gg" src={`${GG_Image}`}></Image>

                    </Link>
                </div>
                <p className="text-gray-400 my-3">Hoặc sử dụng tài khoản email của bạn</p>
                <div className="flex flex-col items-center">
                    <form action={login} className="md:w-4/5">
                        <div className="bg-gray-100 p-2 flex items-center mb-3 rounded-2xl">
                            <FaRegEnvelope className="m-2" />
                            <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 p-2 flex items-center mb-3 rounded-2xl">
                            <MdLockOutline className="m-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                name="password"
                                placeholder="Mật khẩu"
                                className="bg-gray-100 outline-none text-sm flex-1"
                            />
                            <div onClick={togglePasswordVisibility} className="cursor-pointer">
                                {showPassword ? <MdVisibilityOff className="m-2" /> : <MdVisibility className="m-2" />}
                            </div>
                        </div>
                        <div className="flex mb-5 justify-between">
                            <label className="flex items-center text-xs"><input type="checkbox" name="remember" className="mr-1" />Nhớ mật khẩu</label>
                            <Link href="#" className="text-xs">Quên mật khẩu?</Link>
                        </div>
                        <LoginButton />
                    </form>
                </div>
            </div>
        </div>
    );
    function LoginButton() {
        const { pending } = useFormStatus();
        return (
            <>
                <button type="submit" disabled={pending} className="bg-primary p-3 border-2 border-primary rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-primary text-white">
                    {pending ? "Đang tải..." : "Đăng nhập"}
                </button>
                <ToastContainer />
            </>
        );
    }
}
