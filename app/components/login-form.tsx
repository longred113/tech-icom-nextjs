'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaFacebook, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const router = useRouter();
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
            <div className="text-left font-bold"><span className="text-gray-800">Company</span>Name</div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
                <div className="border-2 w-20 border-gray-800 inline-block mb-2"></div>
                {/* <div className="flex justify-center my-2">
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        <FaFacebook />
                    </Link>
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        <FaLinkedinIn />
                    </Link>
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        <FaGoogle />
                    </Link>
                </div> */}
                {/* <p className="text-gray-400 my-3">or use your email account</p> */}
                <div className="flex flex-col items-center">
                    <form action={login} className="md:w-4/5">
                        <div className="bg-gray-100 p-2 flex items-center mb-3 rounded-2xl">
                            <FaRegEnvelope className="m-2" />
                            <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 p-2 flex items-center mb-3 rounded-2xl">
                            <MdLockOutline className="m-2" />
                            <input type="password" name="password" placeholder="Mật khẩu" className="bg-gray-100 outline-none text-sm flex-1" />
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
                <button type="submit" disabled={pending} className="bg-gray-800 p-3 border-2 border-gray-800 rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-gray-800 text-white">
                    {pending ? "Đang tải..." : "Đăng nhập"}
                </button>
                <ToastContainer />
            </>
        );
    }
}
