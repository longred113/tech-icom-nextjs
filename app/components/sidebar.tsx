import { ChevronRight, Headphones, Keyboard, Laptop, Monitor, Mouse, PcCase } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-fit bg-white rounded-lg">
            <div className="flex gap-2 p-2 hover:bg-primary hover:text-white">
                <Laptop />
                Laptop
                <div className="ml-auto">
                    <ChevronRight />
                </div>
            </div>
            <div className="flex gap-2 p-2 hover:bg-primary hover:text-white">
                <PcCase />
                PC
                <div className="ml-auto">
                    <ChevronRight />
                </div>
            </div>
            <div className="flex gap-2 p-2 hover:bg-primary hover:text-white">
                <Monitor />
                Màn hình
                <div className="ml-auto">
                    <ChevronRight />
                </div>
            </div>
            <div className="flex gap-2 p-2 hover:bg-primary hover:text-white">
                <Keyboard />
                Bàn phím
                <div className="ml-auto">
                    <ChevronRight />
                </div>
            </div>
            <div className="flex gap-2 p-2 hover:bg-primary hover:text-white">
                <Mouse />
                Chuột
                <div className="ml-auto">
                    <ChevronRight />
                </div>
            </div>
            <div className="flex gap-2 p-2 hover:bg-primary hover:text-white">
                <Headphones />
                Tai nghe
                <div className="ml-auto">
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;