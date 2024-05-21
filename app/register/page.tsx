import Link from "next/link";
import RegisterForm from "../component/register-form";

export default function RegisterPage() {
    return (
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center md:h-screen">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                <div className="w-3/5 p-5">
                    <RegisterForm />
                </div>
                <div className="w-2/5 bg-yellow-300 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                    <h2 className="text-3xl font-bold mb-2">Hello</h2>
                    <div className="border-2 w-20 border-white inline-block mb-2"></div>
                    <p className="mb-10">You have an account? Lets Login now </p>
                    <Link href="/login" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-yellow-300">Sign In</Link>
                </div>
            </div>
        </main>
    );
}