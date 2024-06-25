import Sidebar from "./sidebar";
import TopBar from "./topbar";

const Layout = ({ children }: any) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="">
                <TopBar />
            </div>
            <div className="w-full md:flex-1 bg-slate-300 h-fit">
                {children}
            </div>
            <footer className="flex items-center justify-center w-full h-24 border-t bg-primary">
                <a
                    className="flex items-center justify-center text-white"
                    href="#"
                    // target="_blank"
                    rel="noopener noreferrer"
                >
                    Được tạo bởi đội ngũ công nghệ của bạn
                </a>
            </footer>
        </div>
    );
};

export default Layout;