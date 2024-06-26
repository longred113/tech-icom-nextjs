import Link from "next/link";
import LoginForm from "../components/login-form";
import Layout from "../components/Layout";

export default function LoginPage() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center w-full flex-1 md:p-20 p-5 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex justify-center md:w-1/4 w-full">
                    <div className="w-full p-5">
                        <LoginForm />
                        <div>
                            <span>Bạn chưa có tài khoản?</span>
                            <Link href="/register" className="text-primary">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}