'use client'
// import { register } from "@/app/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FaFacebook, FaGoogle, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdLockOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
// import { FaRegEnvelope } from "react-icons/fa6";
// import { IoMdPerson } from "react-icons/io";
// import { MdLockOutline } from "react-icons/md";

export default function RegisterForm() {
    const [name, setName] = useState('');
    const router = useRouter();
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
            <div className="text-left font-bold"><span className="text-gray-800">Company</span>Name</div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng ký</h2>
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
                {/* <p className="text-gray-400 my-3">or register with your email account</p> */}
                <div className="flex flex-col items-center">
                    <form action={register}>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-2xl">
                            <IoMdPerson className="m-2" />
                            <input type="name" required name="name" placeholder="Tên" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-2xl">
                            <FaRegEnvelope className="m-2" />
                            <input type="email" required name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-2xl">
                            <MdLockOutline className="m-2" />
                            <input type="password" required name="password" placeholder="Mật khẩu" className="bg-gray-100 outline-none text-sm flex-1" />
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-5 rounded-2xl">
                            <MdLockOutline className="m-2" />
                            <input type="password" required name="passwordConfirm" placeholder="Xác nhận mật khẩu" className="bg-gray-100 outline-none text-sm flex-1" />
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
            <button type="submit" disabled={pending} className="bg-gray-800 p-3 border-2 border-gray-800 rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-gray-800 text-white">
                {pending ? "Đang tải..." : "Đăng ký"}
            </button>
            <ToastContainer />
        </>
    );
}