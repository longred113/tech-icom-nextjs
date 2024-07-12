import Footer from "./footer";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";
import TopBar from "./topbar";

const Layout = ({ children }: any) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="">
            </div>
            <div className="flex-1 flex flex-col">
                <TopBar />
                <div className="flex-1 bg-slate-300">
                    {children}
                </div>
            </div>

            {/* <footer className="flex items-center justify-center w-full h-24 bg-primary">
                <a
                    className="flex items-center justify-center text-white"
                    href="#"
                    // target="_blank"
                    rel="noopener noreferrer"
                >
                    Được tạo bởi đội ngũ công nghệ của bạn
                </a>
            </footer> */}
            <Footer />
        </div>
    );
};

export default Layout;