'use client'
// import { login } from "@/app/lib/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
// import { FaFacebook, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa6";
// import { MdLockOutline } from "react-icons/md";

export default function LoginForm() {
    // const login1 = login;
    const login = async () => {
        try {
            const response = await fetch("/api/users", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await response?.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        login();
    }, []);
    return (
        <div>
            <div className="text-left font-bold"><span className="text-yellow-300">Company</span>Name</div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-yellow-300 mb-2">Sign In to your account</h2>
                <div className="border-2 w-20 border-yellow-300 inline-block mb-2"></div>
                <div className="flex justify-center my-2">
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        {/* <FaFacebook /> */}
                    </Link>
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        {/* <FaLinkedinIn /> */}
                    </Link>
                    <Link href="" className="border-2 border-grey-200 rounded-full p-3 mx-1">
                        {/* <FaGoogle /> */}
                    </Link>
                </div>
                <p className="text-gray-400 my-3">or use your email account</p>
                <div className="flex flex-col items-center">
                    {/* <form action={login1}> */}
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                        {/* <FaRegEnvelope className="m-2" /> */}
                        <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                        {/* <MdLockOutline className="m-2" /> */}
                        <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                    </div>
                    <div className="flex w-64 mb-5 justify-between">
                        <label className="flex items-center text-xs"><input type="checkbox" name="remember" className="mr-1" />Remember</label>
                        <Link href="#" className="text-xs">Forgot Password?</Link>
                    </div>
                    <LoginButton />
                    {/* </form> */}
                </div>
            </div>
        </div>
    );
    function LoginButton() {
        const { pending } = useFormStatus();
        return (
            <button type="submit" className="bg-yellow-300 p-3 border-2 border-yellow-300 rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-yellow-300 text-white">Sign In</button>
        );
    }
}
