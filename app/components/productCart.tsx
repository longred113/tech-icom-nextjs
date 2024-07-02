
import { IMAGE_NULL } from '@/other/axios';
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
    const removeAccents = (str: string): string => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    const convertToUrlFriendly = (name: string): string => {
        return removeAccents(name.trim())
            .replace(/ /g, '-') // Thay thế tất cả các khoảng trắng bằng dấu gạch ngang
            .replace(/[^a-zA-Z0-9-]/g, '') // Loại bỏ các ký tự đặc biệt
            .toLowerCase(); // Chuyển tất cả các ký tự thành chữ thường
    };

    const handleClick = () => {
        router.push(`/products/${convertToUrlFriendly(name)}`);
    };
    return (
        <div onClick={handleClick} className="max-w-sm rounded h-full overflow-hidden shadow-lg border bg-white">
            <Image className="w-full h-40 object-contain p-4"
                src={firstImageUrl ? firstImageUrl : IMAGE_NULL}
                alt={name}
                width={500}
                height={500}
                quality={90}
                priority
            />
            <div className="px-6 py-4">
                <h3 className="font-semibold text-xs mb-2">{name}</h3>
                <ul className="text-gray-700 text-sm">
                    {Object.entries(description).map(([key, value]) => {
                        let icon;
                        switch (key) {
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
                        }
                        return (
                            <li key={key} className='flex items-center text-xs font-medium'>
                                {icon && <span className="mr-1">{icon}</span>}
                                {`: ${value}`}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block py-1 text-sm font-semibold text-red-500">
                    {formattedPrice}
                </span>
            </div>
        </div>
    );
};

export default ProductCard;