
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsDeviceSsd, BsGpuCard } from 'react-icons/bs';
import { FaMemory } from 'react-icons/fa';
import { HiCpuChip, HiOutlineCpuChip } from 'react-icons/hi2';
import { MdScreenshotMonitor } from 'react-icons/md';

type ProductCardProps = {
    id: number
    name: string;
    description: any;
    price: number;
    imageUrl: string[] | undefined;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, imageUrl }) => {
    const firstImageUrl = imageUrl && imageUrl.length > 0 ? imageUrl[0] : "";
    const formattedPrice = price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const router = useRouter();
    const convertToUrlFriendly = (name: string): string => {
        return name.trim()
            .replace(/ /g, '-') // Thay thế tất cả các khoảng trắng bằng dấu gạch ngang
            .replace(/[^a-zA-Z0-9-]/g, '') // Loại bỏ các ký tự đặc biệt
            .toLowerCase(); // Chuyển tất cả các ký tự thành chữ thường
    };
    const handleClick = () => {
        router.push(`/products/${convertToUrlFriendly(name)}`);
    };
    return (
        <div onClick={handleClick} className="max-w-sm rounded overflow-hidden shadow-lg border bg-white">
            {firstImageUrl && <Image className="w-full pt-5 px-6" src={firstImageUrl} alt={name} width={200} height={200} />}
            <div className="px-6 pt-4">
                <div className="font-bold text-base mb-2">{name}</div>
                <ul className="text-gray-700 text-sm">
                    {Object.keys(description).map((item, index) => {
                        let icon;
                        switch (item) {
                            case 'CPU':
                                icon = <HiCpuChip />;
                                break;
                            case 'RAM':
                                icon = <FaMemory />;
                                break;
                            case 'Hard_drive':
                                icon = <BsDeviceSsd />;
                                break;
                            case 'VGA':
                                icon = <BsGpuCard />;
                                break;
                            case 'display':
                                icon = <MdScreenshotMonitor />;
                                break;
                            default:
                                icon = null;
                        }
                        return (
                            <div key={index} className='flex items-center'>
                                {icon} {": " + description[item]}
                            </div>
                        );
                    })}
                </ul>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {formattedPrice}
                </span>
            </div>
        </div>
    );
};

export default ProductCard;