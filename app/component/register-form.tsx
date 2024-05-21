'use client'
// import { register } from "@/app/lib/actions";
import Link from "next/link";
import { useFormStatus } from "react-dom";
// import { FaRegEnvelope } from "react-icons/fa6";
// import { IoMdPerson } from "react-icons/io";
// import { MdLockOutline } from "react-icons/md";

export default function RegisterForm() {
    // const registerAction = register;
    return (
        <div>
            <div className="text-left font-bold"><span className="text-yellow-300">Company</span>Name</div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-yellow-300 mb-2">Sign Up your new account</h2>
                <div className="border-2 w-20 border-yellow-300 inline-block mb-2"></div>
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
                <p className="text-gray-400 my-3">or register with your email account</p>
                <div className="flex flex-col items-center">
                    {/* <form action={registerAction}> */}
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-2xl">
                        {/* <IoMdPerson className="m-2" /> */}
                        <input type="name" name="name" placeholder="Name" className="bg-gray-100 outline-none text-sm flex-1" />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-2xl">
                        {/* <FaRegEnvelope className="m-2" /> */}
                        <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-2xl">
                        {/* <MdLockOutline className="m-2" /> */}
                        <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-5 rounded-2xl">
                        {/* <MdLockOutline className="m-2" /> */}
                        <input type="password" name="passwordConfirm" placeholder="Confirm Password" className="bg-gray-100 outline-none text-sm flex-1" />
                    </div>
                    <RegisterButton />
                    {/* </form> */}
                </div>
            </div>
        </div >
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="bg-yellow-300 p-3 border-2 border-yellow-300 rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-yellow-300 text-white">Sign Up</button>
    );
}