'use client';

import { ChevronDown, ChevronRight, Headphones, Keyboard, Laptop, Monitor, Mouse, PcCase } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ onHover, onLeave }: any) => {
    const items = [
        { name: 'Laptop', component: <Laptop />, value: 'laptop' },
        { name: 'PC', component: <PcCase />, value: 'pc' },
        { name: 'Màn hình', component: <Monitor />, value: 'monitor' },
        { name: 'Bàn phím', component: <Keyboard />, value: 'keyboard' },
        { name: 'Chuột', component: <Mouse />, value: 'mouse' },
        { name: 'Tai nghe', component: <Headphones />, value: 'headphones' }
    ];
    const details = [
        { name: 'About Us', path: '/about' },
        { name: 'Team', path: '/about/team' },
        { name: 'Careers', path: '/about/careers' }
    ]

    const [expandedItem, setExpandedItem] = useState(null);

    const handleItemClick = (itemValue: any) => {
        if (expandedItem === itemValue) {
            setExpandedItem(null); // Collapse if already expanded
        } else {
            setExpandedItem(itemValue); // Expand if not expanded
        }
    };

    return (
        <div className="flex flex-col w-72 min-w-72 bg-white rounded-lg text-sm flex-shrink-0">
            {items.map((item) => (
                <div key={item.value}>
                    {/* Main item */}
                    <div
                        className="flex items-center gap-2 p-2 hover:bg-primary hover:text-white hover:rounded-lg relative cursor-pointer"
                        onMouseEnter={() => onHover(item.value)}
                        onMouseLeave={onLeave}
                        onClick={() => handleItemClick(item.value)}
                    >
                        {item.component}
                        {item.name}
                        <div className="ml-auto">
                            {expandedItem === item.value ? <ChevronDown /> : <ChevronRight />}
                        </div>
                    </div>
                    {/* Dropdown detail */}
                    <AnimatePresence>
                        {expandedItem === item.value && (
                            <motion.div
                                variants={MenuItemVariants}
                                initial="closed"
                                animate="open"
                                className="bg-gray-100 p-2 border-t border-gray-300"
                            >
                                {details.map((detail) => (
                                    <div key={detail.name}>
                                        <a
                                            href={detail.path}
                                            className="block p-2 hover:bg-primary hover:text-white hover:rounded-lg"
                                        >
                                            {detail.name}
                                        </a>
                                    </div>
                                ))}
                            </motion.div>

                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;

// const MenuItemVariants = {
//     open: {
//         y: 0,
//         opacity: 1,
//         transition: {
//             y: { stiffness: 1000, velocity: -100 },
//         },
//     },
//     closed: {
//         y: 50,
//         opacity: 0,
//         transition: {
//             y: { stiffness: 5000 },
//             duration: 0.02,
//         },
//     },
// };
const MenuItemVariants = {
    open: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05
        }
    },
    closed: {
        clipPath: "inset(10% 50% 90% 50% round 10px)",
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3
        }
    }
}
