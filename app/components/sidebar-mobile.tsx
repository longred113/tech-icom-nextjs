'use client'
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useRef, useState } from "react";
import { Icon } from '@iconify/react';
import { motion, useCycle } from 'framer-motion';
import { SIDENAV_ITEMS_LOGGED_IN, SIDENAV_ITEMS_LOGGED_OUT } from "@/styles/constants";
import Link from "next/link";
import { MenuItemWithSubMenuProps } from "@/styles/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound, LogIn, LogOut, SquarePen } from "lucide-react";
interface User {
    name: string;
    email: string;
}
const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 0 0)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(0px at 0 0)',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const SidebarMobile = ({ user }: any) => {
    const pathname = usePathname();
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const [isOpen, toggleOpen] = useCycle(false, true);
    const SIDENAV_ITEMS = user ? SIDENAV_ITEMS_LOGGED_IN : SIDENAV_ITEMS_LOGGED_OUT;

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className={`fixed inset-0 z-50 w-full md:hidden ${isOpen ? "" : "pointer-events-none"}`}
        >
            <motion.div
                className="absolute inset-0 right-0 w-full bg-white"
                variants={sidebar}
            />
            <motion.ul
                variants={variants}
                className="absolute grid w-full gap-3 px-10 py-16 max-h-screen overflow-y-auto"
            >
                {SIDENAV_ITEMS.map((item, idx) => {
                    const isLastItem = idx === SIDENAV_ITEMS.length - 1;
                    return (
                        <div key={idx}>
                            {item.submenu ? (
                                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
                            ) : (
                                <MenuItem>
                                    <Link
                                        href={item.path}
                                        onClick={() => toggleOpen()}
                                        className={`flex w-full gap-3 text-lg mb-3 ${item.path === pathname ? 'font-bold text-primary' : ''
                                            }`}
                                    >
                                        {item.icon}
                                        {item.title}
                                    </Link>

                                </MenuItem>
                            )}

                            {!isLastItem && (
                                <MenuItem className="my-3 h-px w-full bg-gray-300" />
                            )}
                        </div>
                    );
                })}
            </motion.ul>
            <MenuToggle toggle={toggleOpen} />
        </motion.nav>
    )
};

export default SidebarMobile;

const MenuToggle = ({ toggle }: { toggle: any }) => (
    <button
        onClick={toggle}
        className="pointer-events-auto absolute left-4 top-[34px] z-30"
    >
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5', stroke: "white" },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1, stroke: "white" },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346', stroke: "white" },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}

            />
        </svg>
    </button>
);

const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

const MenuItem = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <motion.li variants={MenuItemVariants} className={className}>
            {children}
        </motion.li>
    );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
    item,
    toggleOpen,
}) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    return (
        <>
            <MenuItem>
                <button
                    className="flex w-full text-lg"
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                >
                    <div className="flex flex-row justify-between w-full items-center">
                        <span
                            className={`flex gap-3 items-center ${pathname.includes(item.path) ? 'font-bold text-primary' : ''}`}
                        >
                            {item.icon}
                            {item.title}
                        </span>
                        <div className={`${subMenuOpen && '-rotate-90'}`}>
                            <Icon icon="lucide:chevron-down" width="24" height="24" />
                        </div>
                    </div>
                </button>
            </MenuItem>
            <div className="mt-2 ml-2 flex flex-col space-y-2 text-base">
                {subMenuOpen && (
                    <>
                        {item.subMenuItems?.map((subItem: any, subIdx: any) => {
                            return (
                                <MenuItem key={subIdx}>
                                    <Link
                                        href={subItem.path}
                                        onClick={() => toggleOpen()}
                                        className={` ${subItem.path === pathname ? 'font-bold text-primary ' : ''
                                            }`}
                                    >
                                        {subItem.title}
                                    </Link>
                                </MenuItem>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};

const MenuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
            duration: 0.02,
        },
    },
};

const variants = {
    open: {
        transition: { staggerChildren: 0.02, delayChildren: 0.15 },
    },
    closed: {
        transition: { staggerChildren: 0.01, staggerDirection: -1 },
    },
};
const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth;
            dimensions.current.height = ref.current.offsetHeight;
        }
    }, [ref]);

    return dimensions.current;
}