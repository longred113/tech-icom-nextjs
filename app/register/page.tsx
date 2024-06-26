import Link from "next/link";
import RegisterForm from "../components/register-form";
import Layout from "../components/Layout";

export default function RegisterPage() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center w-full flex-1 md:p-20 p-5 text-center md:h-fit h-screen">
                <div className="bg-white rounded-2xl shadow-2xl flex justify-center md:w-1/4 w-full">
                    <div className="w-full p-5">
                        <RegisterForm />
                        <div>
                            <span>Bạn đã có tài khoản?</span>
                            <Link href="/login" className="text-yellow-400 hover:text-green-300">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}