'use client'
import { GG_Image } from "@/other/axios";
import Image from "next/image";
// import { register } from "@/app/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FaFacebook, FaGoogle, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
// import { FaRegEnvelope } from "react-icons/fa6";
// import { IoMdPerson } from "react-icons/io";
// import { MdLockOutline } from "react-icons/md";

export default function RegisterForm() {
    const [name, setName] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const register = async (formData: FormData) => {
        try {
            if (formData.get("password") !== formData.get("passwordConfirm")) {
                toast.error("password do not match");
            }
            const response = await fetch("/api/users?param=REGISTER", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    password: formData.get("password"),
                    password_confirmation: formData.get("passwordConfirm"),
                }),
            });
            const data = await response?.json();
            if (data.data.status === true) {
                toast.success(data.data.message);
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                toast.error(data.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="text-left font-bold"><span className="text-primary">Tech </span>Icom</div>
            <div className="py-5">
                <h2 className="text-3xl font-bold text-primary mb-2">Đăng ký</h2>
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
                <p className="text-gray-400 my-3">Hoặc đăng ký với tài khoản email của bạn</p>
                <div className="flex flex-col items-center">
                    <form action={register} className="md:w-4/5">
                        <div className="bg-gray-100 p-2 flex items-center mb-3 rounded-2xl">
                            <IoMdPerson className="m-2" />
                            <input type="name" required name="name" placeholder="Tên" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 p-2 flex items-center mb-3 rounded-2xl">
                            <FaRegEnvelope className="m-2" />
                            <input type="email" required name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
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
                        <div className="bg-gray-100 p-2 flex items-center mb-5 rounded-2xl">
                            <MdLockOutline className="m-2" />
                            <input type={showPassword ? "text" : "password"} required name="passwordConfirm" placeholder="Xác nhận mật khẩu" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <RegisterButton />
                    </form>
                </div>
            </div>
        </div >
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <>
            <button type="submit" disabled={pending} className="bg-primary p-3 border-2 border-primary rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-primary text-white">
                {pending ? "Đang tải..." : "Đăng ký"}
            </button>
            <ToastContainer />
        </>
    );
}