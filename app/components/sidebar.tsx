import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <div className="text-lg font-bold">
                <Link href="/">Tech Icom</Link>
            </div>
            <nav className="mt-10">
                <Link href="/about">
                    <span className="text-gray-300 hover:text-white">Giới Thiệu</span>
                </Link>
                <Link href="/blog" legacyBehavior>
                    <span className="text-gray-300 hover:text-white">Bài Viết</span>
                </Link>
                <Link href="/contact" legacyBehavior>
                    <span className="text-gray-300 hover:text-white">Liên Hệ</span>
                </Link>
                <Link href="/products">
                    <span className="text-gray-300 hover:text-white">Sản phẩm</span>
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;